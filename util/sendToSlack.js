require('dotenv').config();
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const slackChannel = process.env.SLACK_CHANNEL;
const slackIcon = process.env.SLACK_ICON_EMOJI || ':loudspeaker:';
const slackUserName =  process.env.SLACK_USER_NAME || 'IBM Cloud Notification with watsonx' ;
const slackAddMessage = process.env.SLACK_ADD_MESSAGE ;

const createSlackMessage = (title, category, severity, state, startTimeUnix, startDate, endTimeUnix, endDate, updateTimeUnix, updateDate, witranlatedText, tranlatedText, accountId) => {
  let postMessage = `以下の通知がありました\n`;
  postMessage += `・件名：${title}\n`
  switch(category){
    case "Security Bulletin":
      postMessage += `・カテゴリ：セキュリティ速報\n`
      break;
    
    default:
      postMessage += `・カテゴリ：${category}\n`
      break;
  }
  if(severity) postMessage += `・重要度：${severity}\n`
  if(state) postMessage += `・状況：${state}\n`
  if(startTimeUnix) postMessage += `・開始日付：${startDate} (JST)\n`
  if(endTimeUnix) postMessage += `・終了日付：${endDate} (JST)\n`
  if(updateTimeUnix) postMessage += `・更新日付：${updateDate} (JST)\n`
  postMessage += `・通知の案内内容\n\`\`\`${witranlatedText}\`\`\`\n`
  postMessage += `・通知に対してのアクション\n\`\`\`${tranlatedText}\`\`\`\n`
  postMessage += `通知内容は<https://cloud.ibm.com/notifications?bss_account=${accountId}|リンク先のIBM Cloudコンソール>に掲載されています`
  return postMessage;
}

const postSlackMessage = async (postMessage) => {
  const message = {
    icon_emoji: slackIcon,
    text: slackAddMessage ? `${slackAddMessage} ${postMessage}` : postMessage,
    username: slackUserName,
  }
  if(slackChannel) message.channel = slackChannel;
  const option = {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(message)
  }
  const fetchResult = await fetch(slackWebhookUrl, option);
  console.log(`fetchResult: ${JSON.stringify(fetchResult)}`);
  return fetchResult;
}

module.exports = {
  createSlackMessage,
  postSlackMessage,
}