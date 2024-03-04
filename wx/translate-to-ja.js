const dictionary = require('./dictionary');
const WX = require('./wx-client');
const wx = new WX();

const getText = async (text) => {
  let prompt = ``;
  // add order text
  prompt += `Translate the following Original text into Japanese. Leave Japanese words in the document unchanged.\n\n`
  // add replaced text
  prompt += `Original text:\n${dictionary.replaceTextWord(text)}\n\nTranslated text:`
  console.log(prompt);
  try{
    const wxResult = await wx.ask(prompt);
    const generatedResult = wxResult.results[0];
    console.log(`Token: input(${generatedResult.input_token_count}) output(${generatedResult.generated_token_count}) total(${generatedResult.input_token_count + generatedResult.generated_token_count})`)
    const generateText = generatedResult.generated_text;
    const returnText = generateText
                        .trim()
                        .replace(/^\s+/g,'')
                        .replace(/^\n$/g,'')
                        .replace(/\n\n/g,'\n')
                        .replace(/Please let me know[\s\S]+/g,'')
                        ;
    const returnText2 = dictionary.replaceTextJpToJpWord(returnText);
    return returnText2
  }catch(err){
    console.log(err);
    return "翻訳に失敗しました"
  }  
}

module.exports = {
  getText,
}