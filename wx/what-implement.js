const WX = require('./wx-client');
const wx = new WX();

const getText = async (text) => {
  const askText = `The following Description is the content of the notification sent by IBM Cloud outsourced to maintain the system.
Please respond according to the notification contents.
  
${text}
  
Input: Please tell me the implementation details indicated in this notice.
  
Answer:  `
  customizedAskText = askText.replace(/^ +/g,'').replace(/^\t+/g,'');
  console.log(customizedAskText);
  const wxResult = await wx.ask(customizedAskText);
  const generatedResult = wxResult.results[0];
  console.log(`Token: input(${generatedResult.input_token_count}) output(${generatedResult.generated_token_count}) total(${generatedResult.input_token_count + generatedResult.generated_token_count})`)
  const generateText = generatedResult.generated_text;
  return generateText.replace(/^\n$/g,'')
}

module.exports = {
  getText,
}