import { client } from "../../../lib/fauna";
import {
  Map,
  Paginate,
  Lambda,
  Delete,
  Var,
  Documents,
  Collection,
} from "faunadb";
export default async function handler(req, res) {
  //Fauna
  const fauna = client;

  //Query
  try {
    const fql = await fauna.query(
      Map(
        Paginate(Documents(Collection("topics"))),
        Lambda("X", Delete(Var("X")))
      )
    );
    res.send(fql);
  } catch (err) {
    res.send(err);
  }
}
