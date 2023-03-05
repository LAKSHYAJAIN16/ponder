import { client } from "../../../lib/fauna";
import { Paginate, Match, Index, Ref, Collection } from "faunadb";
export default async function handler(req, res) {
  const fauna = client;

  const id = req.query.id;
  // FQL
  try {
    const docs = await fauna.query(
      Paginate(Match(Index("reactionByTopic"), Ref(Collection("topics"), id)))
    );

    // // Format Data 'cuz les go!
    const returnObj= {};
    for (let i = 0; i < docs.data.length; i++) {
      const dat = docs.data[i];
      const postID = JSON.parse(JSON.stringify(dat[1]))["@ref"]["id"];
      if(returnObj[postID] === undefined){
        returnObj[postID] = {
          poop : 0,
          smart : 0          
        }
      }

      if(dat[0] === "poop"){
        returnObj[postID]["poop"] += 1;
      }else{
        returnObj[postID]["smart"] += 1;
      }
    }
    res.json(returnObj);
  } catch (err) {
    res.send(err);
  }
}
