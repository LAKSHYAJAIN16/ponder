import { client } from "../../../../../lib/fauna";
import { Ref, Collection, Paginate, Match, Index, Map, Lambda, Get } from "faunadb";

export default async function handler(req, res) {
  //Fauna
  const fauna = client;

  //Get ID
  const id = req.query.id;

  //FQL
  try {
    const docs = await fauna.query(
      Map(
        Paginate(
          Match(Index("topicPostByTopic"), Ref(Collection("topics"), id))
        ),
        Lambda(x => Get(x))
      )
    );
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
}
