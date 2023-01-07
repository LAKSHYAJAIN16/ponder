import axios from "axios";
import api from "../lib/api";
import ls from "./ls";

export default async function queryGet(
  localCallback,
  finalCallback,
  id,
  endpoint
) {
  //Check if we have any data saved for this route ID
  const lastCache = await ls.get(id, true);
  if (lastCache) {
    // Local Callback
    localCallback(lastCache);
  }

  //Simple Axios Request for the final request
  const res = await axios.get(`${api.route}${endpoint}`);
  finalCallback(res.data);

  //Save to LocalStorage
  await ls.edit(id, res.data);
}

export async function queryGetLocalOnly(localCallback, id) {
  //Check if we have any data saved for this route ID
  const lastCache = await ls.get(id, true);
  if (lastCache) {
    // Local Callback
    localCallback(lastCache);
  }
}
