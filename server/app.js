/**
 * @description: 简单搭建web服务器，提供接口
 * @author: chenmq
 * @Date: 2021-11-05 20:27:10
 */

const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
// const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 静态服务
app.use(
  express.static(path.resolve(__dirname, './static'), {
    setHeaders(res, path, stat) {
      res.set('Access-Control-Allow-Origin', '*');
    }
  })
);

// 跨域处理
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  //让options尝试请求快速结束
  if (req.method.toLowerCase() == 'options') res.sendStatus(200);
  else next();
});

//post getLessonList
app.post('/getLessonList', (req, res) => {
  const { category, limit, offset } = req.body;
  if (category !== undefined) {
    readStream('./json/lessonList.json', data => {
      let allLessons = JSON.parse(data);
      let hasMore = false,
        list = [];
      if (offset < allLessons.length) {
        list = allLessons.slice(offset, offset + limit);
      }
      if (offset + limit <= allLessons.length) {
        hasMore = true;
      }
      setTimeout(() => {
        res.json({
          code: 0,
          message: 'success',
          data: {
            hasMore,
            list
          }
        });
      }, 1000);
    });
  } else {
    res.status(403).json({ code: -1, data: {}, message: '缺失入参category' });
  }
});

//get getSlidersList
app.get('/getSlidersList', (req, res) => {
  // const { url, method, query, params } = req;
  readStream('./json/slidersList.json', data => {
    setTimeout(() => {
      res.status(200).json({
        code: 0,
        message: 'success',
        data: JSON.parse(data)
      });
    }, 1500);
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
