import { Collection, Create, Ref } from "faunadb";
import { client } from "../../../lib/fauna";
import genRandomID from "../../../lib/genRandomID";

export default async function handler(req, res) {
  //Fauna
  const fauna = client;

  //Compile Payload
  const id = genRandomID(18);
  const payload = {
    toc: Date.now(),
    id: id,
    user: Ref(Collection("users"), req.body.user),
    topic: Ref(Collection("topics"), req.body.topic),
  };

  //Create
  try {
    const doc = await fauna.query(
      Create(Ref(Collection("views"), id), {
        data: payload,
      })
    );
    res.status(200).json(doc);
  } catch (err) {
    res.send(err);
  }
}
