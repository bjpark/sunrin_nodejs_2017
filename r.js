const request = require('request');
const qs = require('querystring');
// request.post({ 
//     url: 'http://127.0.0.1:4321/api/user',
//     form: { userId: 'sunrin1', userPw: 'sunrint123' },
// }, (err, res, body) => {
//     console.log("err: " + err);
//     console.log("body: " + body);
// });
let url = 'https://kr.api.riotgames.com';
let apiKey = 'RGAPI-e07c6125-1c2e-407d-a853-7d8772e35335';
let apiAuth = {'X-Riot-Token': apiKey};
let summoner = qs.escape('이코내코아니야');
let accountId = 208910653;
let summonerURL = url + '
/lol/match/v3/matchlists
/by-account/' + accountId + '/recent?api_key='+ apiKey;
console.log(summonerURL);
request.get({
    url: summonerURL,
}, (err, res, body) => {
    console.log(res.statusCode);
    console.log(err, body);
})
