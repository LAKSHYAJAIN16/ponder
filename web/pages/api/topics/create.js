import { Collection, Create, Ref } from "faunadb";
import { client } from "../../../lib/fauna";
import genRandomID from "../../../lib/genRandomID";

export default async function handler(req, res) {
  //Init Fauna
  const fauna = client;

  //Scrape Data
  const id = genRandomID(18);
  const dat = {
    id: id,
    description: req.body.description,
    topic : req.body.topic,
    toc: Date.now(),
    img : req.body.img,
  };

  //Fql
  try {
    const doc = await fauna.query(
      Create(Ref(Collection("topics"), id), {
        data: dat,
      })
    );
    res.status(200).json(doc);
  } catch (err) {
    res.send(err);
  }
}
