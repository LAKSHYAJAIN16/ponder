import { Collection, Documents, Get, Lambda, Map, Paginate } from "faunadb";
import { client } from "../../../lib/fauna";
export default async function handler(req, res) {
  //Init Fauna
  const fauna = client;

  //Query (we need no params)
  try{
    const docs= await fauna.query(
        Map(
            Paginate(Documents(Collection("topics"))),
            Lambda(x => Get(x))
        )
    )

    res.status(200).json(docs);
  }
  catch(err){
    res.send(err);
  }
}
