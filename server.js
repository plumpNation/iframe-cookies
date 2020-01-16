const express = require('express')
var https = require('https')
const fs = require('fs')
// const cookieParser = require('cookie-parser')
const app = express()
// const port = 3000

const key = fs.readFileSync(__dirname + '/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/selfsigned.crt');

const options = {
  key,
  cert,
};

const root = 'public'

// app.use(cookieParser("secret"));

app.use((_, res, next) => {
  const options = {
    // maxAge: 2100,
    // expires: new Date('2040-07-07'), // session cookies don't have expires or maxAge

    httpOnly: true,
    // signed: true,
    secure: true,
  };

  res.cookie('SESSION', '120f8hasf0asmf8h018hfm', options)

  next()
})

app.get('/', (req, res) => {
  console.log('index', req.cookies)

  res.sendFile('index.html', {root}, (err) => {
    res.end();

    if (err) throw(err);
  });
});

app.get('/contents.html', (req, res) => {
  console.log('contents', req.cookies)

  res.sendFile('contents.html', {root}, (err) => {
    res.end();

    if (err) throw(err);
  });
});

https.createServer(options, app).listen(443)