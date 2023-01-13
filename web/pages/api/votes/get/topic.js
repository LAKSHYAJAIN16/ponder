import { client } from "../../../../lib/fauna";
import { Ref, Collection, Paginate, Match, Index } from "faunadb";

export default async function handler(req, res) {
  //Fauna
  const fauna = client;

  //Get ID
  const id = req.query.id;

  //FQL
  try {
    const docs = await fauna.query(
      Paginate(Match(Index("voteByTopic"), Ref(Collection("topics"), id)))
    );

    //Now, condense this data and separate the data
    let forIds = [], againstIds= [], neutralIds = [];
    let forThings = 0, against = 0, neutral = 0;
    for (let i = 0; i < docs.data.length; i++) {
        const element = docs.data[i];
        switch(element[0]){
            case "for":
                forIds.push(element[1]);
                forThings++;
                break;
            case "neutral":
                neutralIds.push(element[1]);
                neutral++;
                break;
            case "against":
                againstIds.push(element[1]);
                against++;
                break;
        }
    }
    res.json({
        for : {
            num : forThings,
            ids : forIds,
        },
        against : {
            num : against,
            ids : againstIds,
        },
        neutral : {
            num : neutral,
            ids : neutralIds,
        },
    });
  } catch (err) {
    res.send(err);
  }
}