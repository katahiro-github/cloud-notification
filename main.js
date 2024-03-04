require('dotenv').config();
const reqCheck = require('./util/requestCheck');
const sendToSlack = require('./util/sendToSlack');
const commonMethod = require('./util/commonMethod');
const wsd = require('./wx/what-should-do');
const wi = require('./wx/what-implement');
const translate = require('./wx/translate-to-ja');

const bearerValue = process.env.BEARER_VALUE; 

const main = async (args) => {
  console.log(JSON.stringify(args));
  // request check
  if(bearerValue){
    const requestCheckResult = reqCheck.bearerCheck(args);
    if(!requestCheckResult.ok) return requestCheckResult.returnInfo;
  }

  // get input parameter
  const category = args.category;
  const title = args.title[0].text;
  const startTimeUnix = args.startTime;
  const startDate = `${commonMethod.dateToString('YYYY/MM/DD H:mm:SS(DDD)', new Date((startTimeUnix + 3600*9)*1000))}`;
  const endTimeUnix = args.endTime;
  const endDate = `${commonMethod.dateToString('YYYY/MM/DD H:mm:SS(DDD)', new Date((endTimeUnix + 3600*9)*1000))}`;
  const updateTimeUnix = args.updateTime;
  const updateDate = `${commonMethod.dateToString('YYYY/MM/DD H:mm:SS(DDD)', new Date((updateTimeUnix + 3600*9)*1000))}`;
  const severity = args.severity;
  const state = args.state;
  const accountId = args.account_id;
  const text = commonMethod.formatNotificationBody(args.body[0].text);
  
  try{
    // what implement
    const wiText = await wi.getText(text);
    console.log(wiText);
    console.log("------------------");
    const witranlatedText = await translate.getText(wiText);
    console.log(witranlatedText);
    console.log("------------------");

    // what should do
    const wsdText = await wsd.getText(text);
    console.log(wsdText);
    console.log("------------------");
    const tranlatedText = await translate.getText(wsdText);
    console.log(tranlatedText);
    console.log("------------------");

    // inform to slack
    const postMessage = sendToSlack.createSlackMessage(title, category, severity, state, startTimeUnix, startDate, endTimeUnix, endDate, updateTimeUnix, updateDate, witranlatedText, tranlatedText, accountId);
    console.log(postMessage);
    await sendToSlack.postSlackMessage(postMessage);

    const body = {
      text: "ok",
    }
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json', 
      },
      body,
    };
  }catch(err){
    console.log(err);
    const postMessage = `error info\n${err}`;
    await sendToSlack.postSlackMessage(postMessage);

    const body = {
      text: "ng",
    }
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json', 
      },
      body,
    };
  }
}

module.exports.main = main;