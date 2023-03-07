import { client } from "../../../../lib/fauna";
export default async function handler(req, res) {
  //Get Fauna
  const fauna = client;

  //Get Params
  const last_time = req.body.last_time;
}
