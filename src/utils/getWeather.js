const axios = require('axios');

function getWeather (apiKey, city, type) {
  const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${apiKey}&city=${city}&extensions=${type}`;
  return new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
      if (res.data.status !== '1') return reject('error')
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  })
}

module.exports = getWeather;