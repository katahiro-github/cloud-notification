require('dotenv').config();
const bearerValue = process.env.BEARER_VALUE; 

const bearerCheck = (args) => {
  if(args.__ce_method !== "POST" || 
    !args.__ce_headers.Authorization){
    return {
      ok:false,
      returnInfo :{
        statusCode: 400,
        headers: { 
          'Content-Type': 'application/json', 
          'WWW-Authenticate': 'Bearer error="invalid_request""'
        },
        body: {
          text:"Bad Request"
        },
      }
    };
  }
  const reqAuthorization = args.__ce_headers.Authorization;
  if(!reqAuthorization.match(/^[bB]earer /)){
    return {
      ok:false,
      returnInfo :{
        statusCode: 401,
        headers: { 
          'Content-Type': 'application/json', 
          'WWW-Authenticate': 'Bearer realm="token_required"'
        },
        body: {
          text:"Unauthorized"
        },
      }
    };
  }
  const reqBearerToken = reqAuthorization.replace(/^[bB]earer /,'');
  if(reqBearerToken !== bearerValue){
    return {
      ok:false,
      returnInfo :{
        statusCode: 401,
        headers: { 
          'Content-Type': 'application/json', 
          'WWW-Authenticate': 'Bearer error="invalid_token"'
        },
        body: {
          text:"Unauthorized"
        },
      }
    };
  }
  return {ok:true}
}

module.exports = {
  bearerCheck,
}