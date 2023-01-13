import { Collection, Ref, Create } from "faunadb";
import { client } from "../../../lib/fauna";
import genRandomID from "../../../lib/genRandomID";

export default async function handler(req, res) {
  //Fauna
  const fauna = client;

  //ID
  const id = genRandomID(18);

  //Assemble Payload
  const vote = {
    id: id,
    voteType: req.body.intent,
    user: Ref(Collection("users"), req.body.userID),
    topic: Ref(Collection("topics"), req.body.topicID),
    temp: {
      userPfpic: req.body.temp.userPfpic,
      username: req.body.temp.username,
      topicName: req.body.temp.topicname,
    },
  };

  try {
    const doc = await fauna.query(
      Create(Ref(Collection("votes"), id), {
        data: vote,
      })
    );
    res.status(200).json(doc);
  } catch (err) {
    res.send(err);
  }
}
