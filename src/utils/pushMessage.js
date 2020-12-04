const commonPush = require('./commonPush');
const moment = require('moment');

function pushMessage(data, weatherType, pushKey) {
  let text = '';
  if (!weatherType) {
    if (!data.lives || !data.lives.length) return commonPush(pushKey, '未查询到当前城市天气');
    text = formatLiveData(data.lives[0])
    commonPush(pushKey, encodeURI(text));
  } else {
    if (!data.forecasts || !data.forecasts.length) return commonPush(pushKey, '未查询到当前城市天气');
    text = formatAllData(data.forecasts[0].casts[0])
    commonPush(pushKey, encodeURI(text));
  }
}

function formatLiveData(data) {
  return `今天天气${data.weather}，实时气温${formatNumber(data.temperature)}。`;
}

function formatAllData(data) {
  return `今天天气${data.dayweather}，最高气温${formatNumber(data.daytemp)}， 最低气温${formatNumber(data.nighttemp)}。`;
}

function formatNumber(temp) {
  return temp[0] === '-' ? `零下${temp}度` : `${temp}度`;
}

module.exports = pushMessage;