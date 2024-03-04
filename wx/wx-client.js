require('dotenv').config();
/************************
 * constant
 ************************/
const watsonxProjectId = process.env.WATSONX_PROJECT_ID;
const watsonxApikey = process.env.WATSONX_APIKEY; 
const watsonxEndpointUrl = 'https://us-south.ml.cloud.ibm.com/ml/v1-beta/generation/text?version=2023-05-29';
const iamEndpointUrl = 'https://iam.cloud.ibm.com/identity/token';
const iamRequestUrl = `${iamEndpointUrl}?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${watsonxApikey}`
const iamOptions = {
  method: 'POST',
  headers: { 
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json",
  },
}
const watsonxBody = {
  model_id: "meta-llama/llama-2-70b-chat",
  parameters: {
    decoding_method: "greedy",
    max_new_tokens: 900,
    min_new_tokens: 0,
    stop_sequences: [],
    repetition_penalty: 1
  },
  project_id: watsonxProjectId
}

/************************
 * functions
 ************************/
const generateAccessToken = async () => {
  const iamResponse = await fetch(iamRequestUrl, iamOptions);
  const iamJson = await iamResponse.json();
  if(iamJson.access_token){
    return {ok:true,info:{json:iamJson}};
  }else{
    return {ok:false,info:{message:"generate_access_token_error"}};
  }
}
const accessTokenCache = new Map();
const getAccessToken = async () => {
  const execDate = new Date();
  const currentUnixtime = Math.floor(execDate.getTime() / 1000 );
  if (accessTokenCache.has('token')) {
    const currentTokenInfo = accessTokenCache.get('token');
    if((currentTokenInfo.unixtime + currentTokenInfo.expiresIn) > currentUnixtime){
      return {ok:true,info:{token:currentTokenInfo.accessToken}};
    }else{
      const generateAccessTokenResult = await generateAccessToken();
      if(generateAccessTokenResult.ok){
        accessTokenCache.set('token', {
          accessToken: generateAccessTokenResult.info.json.access_token,
          expiresIn: generateAccessTokenResult.info.json.expires_in,
          unixtime: currentUnixtime,
        });
        return {ok:true,info:{token:generateAccessTokenResult.info.json.access_token}};
      }else{
        return {ok:false,info:{message:generateAccessTokenResult.info.message}}
      }
    }
  }else{
    const generateAccessTokenResult = await generateAccessToken();
    if(generateAccessTokenResult.ok){
      accessTokenCache.set('token', {
        accessToken: generateAccessTokenResult.info.json.access_token,
        expiresIn: generateAccessTokenResult.info.json.expires_in,
        unixtime: currentUnixtime,
      });
      return {ok:true,info:{token:generateAccessTokenResult.info.json.access_token}};
    }else{
      return {ok:false,info:{message:generateAccessTokenResult.info.message}}
    }
  }
}

const getWatsonxOptions = (accessToken, inputText, maxToken) => {
  watsonxBody.input = inputText;
  watsonxBody.parameters.max_new_tokens = maxToken ? maxToken : 900;
  const watsonxOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(watsonxBody),
  }
  return watsonxOptions;
}

/************************
 * class
 ************************/
class WatsonxClient {

  async getToken() {
    const tokeninfo = await getAccessToken();
    this.token = tokeninfo.info.token;
  }

  async ask(text) {
    await this.getToken();
    const wxOptions = getWatsonxOptions(this.token, text);
    const watsonxResponse = await fetch(watsonxEndpointUrl, wxOptions);
    const watsonxJson = await watsonxResponse.json();
    return watsonxJson;
  }
}

module.exports = WatsonxClient;