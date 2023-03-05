import {
  Collection,
  ContainsValue,
  Filter,
  Lambda,
  Paginate,
  And,
  Var,
  Get,
  Map,
  Documents,
  Select,
  Equals,
  Min,
} from "faunadb";
import { client } from "../../../lib/fauna";

export default async function handler(req, res) {
  // Fauna
  const fauna = client;

  // Get the last logged in time
  const lastLoggedIn = parseInt(req.query.last);

  // Get User ID
  const userID = req.query.user;

  // Query
  try {
    // FQL AAAAAAAAAAAAH
    const docs = await fauna.query(
      Filter(
        Map(
          Paginate(Documents(Collection("notifications"))),
          Lambda("X", Get(Var("X")))
        ),
        Lambda(
          "L",
          And(
            ContainsValue(userID, Select("targets", Select("data", Var("L")))),
            // Equals(
            //   Min(Select("toc", Select("data", Var("L"))), lastLoggedIn),
            //   lastLoggedIn
            // ),
            true
          )
        )
      )
    );
    res.send(docs);
  } catch (err) {
    res.send(err);
  }
}
