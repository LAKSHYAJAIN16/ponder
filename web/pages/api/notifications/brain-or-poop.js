import { Collection, Ref, Create } from "faunadb";
import { client } from "../../../lib/fauna";
import genRandomID from "../../../lib/genRandomID";

export default async function handler(req, res) {
  const fauna = client;

  //Payload
  const id = genRandomID(18);
  const text = `${req.body.temp.username} ${req.body.type}ed your comment!`;
  const notif = {
    id: id,
    user: Ref(Collection("users"), req.body.target),
    type: "brain-or-poop",
    text: text,
    specificData: {
      topic: Ref(Collection("topics"), req.body.topic),
      post: Ref(Collection("topicPosts"), req.body.post),
    },
    temp: {
      username: req.body.temp.username,
      pfpic: req.body.temp.pfpic,
      topic: req.body.temp.topic,
    },
    toc: Date.now(),
  };

  //FQL
  try {
    const f = await fauna.query(
      Create(Ref(Collection("notifications"), id), {
        data: notif,
      })
    );
    res.json(f);
  } catch (err) {
    res.send(err);
  }
}
