const https = require('https');

function commonPush(pushKey, text, desp) {
  const url = `https://sc.ftqq.com/${pushKey}.send?text=${text}&desp=${
    desp || ''
  }`;
  https
    .get(url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        const res = JSON.parse(data);
        if (!res.errno) return console.log('推送成功');
        console.log('推送失败', res);
      });
    })
    .on('error', (err) => {
      console.log('Error: ' + err);
    });
}

module.exports = commonPush;
