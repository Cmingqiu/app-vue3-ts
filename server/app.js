/**
 * @description: 简单搭建web服务器，提供接口
 * @author: chenmq
 * @Date: 2021-11-05 20:27:10
 */

const fs = require('fs');
const express = require('express');
const app = express();
// const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 跨域处理
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//post good
app.post('/addGood', (req, res) => {
  let mc = req.body.mc;
  if (mc) {
    readStream('./src/json/goodsList.json', data => {
      let addition = {
        id: new Date().getTime(),
        mc
      };
      data = JSON.parse(data);
      data.push(addition);
      data = JSON.stringify(data);
      wrieteStream('./src/json/goodsList.json', data, () => {
        res.json({ message: '新增成功' });
      });
    });
  } else {
    res.status(403).json({ result: [], message: '缺失入参' });
  }
});

//get slidersList
app.get('/getSlidersList', (req, res) => {
  // const { url, method, query, params } = req;
  readStream('./json/slidersList.json', data => {
    setTimeout(() => {
      res.status(200).send({
        code: 0,
        message: 'success',
        data: JSON.parse(data)
      });
    }, 3000);
  });
});

//输出流
function readStream(path, cb) {
  const rs = fs.createReadStream(path, 'utf-8');
  // rs.setEncoding('utf-8')
  let result = '';
  rs.on('data', chunk => {
    result += chunk;
  });
  rs.on('end', () => {
    cb && cb(result);
  });
}
//输入流
function wrieteStream(path, data, cb) {
  const ws = fs.createWriteStream(path);
  ws.write(data);
  ws.end();
  ws.on('finish', () => {
    cb && cb();
  });
}

app.listen(9000, () => {
  console.log('webServer is running on port 9000');
});
