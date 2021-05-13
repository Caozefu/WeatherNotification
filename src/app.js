const getWeather = require('./utils/getWeather');
const pushMessage = require('./utils/pushMessage');
const commonPush = require('./utils/commonPush');

const apiKey = process.env.API_KEY || "42c28125f337b6222dd42a3b32fbb5fd";
const pushKey = process.env.PUSH_KEY;
const city = process.env.CITY_CODE || 110101;
// 天气类型 0 - 实时天气  1 - 天气预报
const weatherType = 0;

if (!pushKey) return console.log("「警告」未设置[PUSH_KEY]，请参考README.MD设置后重试。");

setInterval(() => {
  getWeather(apiKey, city, weatherType ? 'all' : '').then(res => {
    pushMessage(res, weatherType, pushKey);
  }).catch(e => {
    commonPush(pushKey, '天气信息获取失败', e);
  })
}, 60 * 60 * 1000)

