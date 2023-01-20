import { Collection, Create, Ref } from "faunadb";
import {client} from "../../../lib/fauna";
import genRandomID from "../../../lib/genRandomID";

export default async function handler(req, res){
    //Fauna
    const fauna = client;

    //Assemble Payload
    const id = genRandomID(18);
    const payload = {
        id : id,
        user : Ref(Collection("users"), req.body.user),
        topic : Ref(Collection("topics"), req.body.topic),
        post : Ref(Collection("topicPosts"), req.body.post),
        type : req.body.type,
    }

    try{
        // Q
        const doc = await fauna.query(
            Create(Ref(Collection("reactionsToPost"), id), {
                data:payload,
              })
        )
        res.json(doc)
    }
    catch(err){
        res.send(err);
    }
}