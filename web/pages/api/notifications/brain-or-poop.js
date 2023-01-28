import { Collection, Ref, Create } from "faunadb";
import { client } from "../../../lib/fauna";
import genRandomID from "../../../lib/genRandomID";

export default async function handler(req, res) {
  const fauna = client;

  //Payload
  const id = genRandomID(18);
  let text = "";
  if(req.body.type === "poop"){
    text = `${req.body.temp.username} pooped💩 your comment!`;
  }
  else{
    text = `${req.body.temp.username} brained🧠 your comment!`;
  }
  const notif = {
    id: id,
    targets: [req.body.target],
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
      buf : req.body.temp.buf,
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
