import {
  Collection,
  Ref,
  Map,
  Paginate,
  Documents,
  Lambda,
  Get,
  Select,
  Create
} from "faunadb";
import { client } from "../../../lib/fauna";
import genRandomID from "../../../lib/genRandomID";

export default async function handler(req, res) {
  const fauna = client;

  //Payload
  const id = genRandomID(18);
  let notif = {
    id: id,
    targets: [],
    type: "global",
    text: req.body.text,
    temp: {
      pfpic: req.body.temp.pfpic,
      buf: req.body.temp.buf,
    },
    toc: Date.now(),
  };

  //FQL
  try {
    // Get all of the users
    const g = await fauna.query(
      Map(
        Paginate(Documents(Collection("users"))),
        Lambda((x) => Select("id", Select("data", Get(x))))
      )
    );
    notif["targets"] = g.data;
    
    // Final Query
    const f = await fauna.query(
        Create(Ref(Collection("notifications"), id), {
            data: notif,
          })
    )
    res.json(f);
  } catch (err) {
    res.send(err);
  }
}
