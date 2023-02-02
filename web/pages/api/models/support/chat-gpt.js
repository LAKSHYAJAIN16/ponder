import { ChatGPTAPIBrowser } from "chatgpt";
import browser from "../../../../lib/chatgptbrowser";

export default async function handler(req, res) {
  const is_authed = await browser.getIsAuthenticated();
  if(is_authed){
    // WOHO!!!
    // browser.refreshSession();
  }
  else{
    await browser.initSession();
  }

  let str = "factcheck this statement'";
  str += req.query.txt;
  str += "'";
  const startTime = performance.now();
  const result = await browser.sendMessage(str);
  const endTime = performance.now();
  const time = endTime - startTime;
  console.log(result.response);
  console.log("RESPONSE TOOK " + time / 3600 + " seconds TO COMPILE");
//   await browser.closeSession();
  res.json({
    response: result.response,
    time: time,
  });
}
