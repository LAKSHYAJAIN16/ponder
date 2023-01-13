import { Collection, Create, Ref } from "faunadb";
import { client } from "../../../../lib/fauna";
import genRandomID from "../../../../lib/genRandomID";

export default async function handler(req, res) {
  //Fauna
  const fauna = client;

  //Payload
  const id = genRandomID(18);
  const payload = {
    id: id,
    user: Ref(Collection("users"), req.body.userID),
    topic: Ref(Collection("topics"), req.body.topicID),
    msg: {
      body: req.body.body,
      voteType: req.body.intent,
    },
    temp: {
      userPfpic: req.body.temp.userPfpic,
      topicName: req.body.temp.topicName,
      username: req.body.temp.username,
    },
  };

  //Fql
  try {
    const x = await fauna.query(
      Create(Ref(Collection("topicPosts"), id), {
        data: payload,
      })
    );
    res.json(x);
  } catch (err) {
    res.send(err);
  }
}
