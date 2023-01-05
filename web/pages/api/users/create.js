import { Collection, Create, Ref } from "faunadb";
import { client } from "../../../lib/fauna";
import genRandomID from "../../../lib/genRandomID";

export default async function handler(req, res) {
  //Init Fauna
  const fauna = client;

  //Assemble payload
  const id = genRandomID(18);
  const payload = {
    id: id,
    username: req.body.username,
    phone: req.body.phone,
    verified: false,
    verificationDate : Date.now(),
    toc: Date.now(),
    pfpic: `https://avatars.dicebear.com/api/adventurer-neutral/${req.body.phone}.png`,
    desc: "just joined ponder!",
  };

  //Fauna
  try {
    const doc = await fauna.query(
      Create(Ref(Collection("users"), id), {
        data: payload,
      })
    );
    res.status(200).json(doc);
  } catch (err) {
    res.send(err);
  }
}
