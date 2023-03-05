import {
  Collection,
  Documents,
  Get,
  Lambda,
  Map,
  Paginate,
  Match,
  Index,
  Ref,
  Select,
  Var,
} from "faunadb";
import { client } from "../../../lib/fauna";

export default async function handler(req, res) {
  //Init Fauna
  const fauna = client;

  //Query (we need no params)
  try {
    //Get Docs
    const docs = await fauna.query(
      Map(
        Paginate(Documents(Collection("topics"))),
        Lambda((x) => Get(x))
      )
    );

    //Get Voting Data
    const docs2 = await fauna.query(
      Map(
        Paginate(Documents(Collection("topics"))),
        Lambda((x) =>
          Paginate(
            Match(
              Index("voteByTopic"),
              Ref(Collection("topics"), Select("id", Select("data", Get(x))))
            )
          )
        )
      )
    );

    //Now Sort the Data (oh jeez)
    let ret = [];
    for (let i = 0; i < docs.data.length; i++) {
      //Get the doc
      const doc = docs.data[i];

      //Get the votes
      const votes = docs2.data[i].data;

      //Now, condense this data and separate the data
      let forThings = 0,
        against = 0,
        neutral = 0;
      for (let j = 0; j < votes.length; j++) {
        const element = votes[j];
        console.log(element);
        switch (element[0]) {
          case "for":
            forThings++;
            break;
          case "neutral":
            neutral++;
            break;
          case "against":
            against++;
            break;
        }
      }
      ret.push({
        doc,
        votes: {
          for: forThings,
          neutral: neutral,
          against: against,
        },
      });
    }
    res.status(200).json(ret);
  } catch (err) {
    res.send(err);
  }
}
