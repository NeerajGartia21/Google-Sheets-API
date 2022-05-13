const querystring=require('querystring');
const axios=require('axios');
const { urlencoded } = require('express');

function getGoogleTokens({
  code
}) {
  /*
  Returns:
  Promise<{
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
  }>
  */

  const url = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: 'http%3A%2F%2Flocalhost%3A3000%2Fv1%2Flogin',
    grant_type:'authorization_code'
  };

  let s = new URLSearchParams(Object.entries(values)).toString()
  console.log(s)
  return axios
    .post(url,s, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw  new Error("Invalid Auth code is provided");
    });
}

module.exports=getGoogleTokens;