const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = 3000

const root = 'public'

app.use(cookieParser("secret"));
// app.use(express.static('public'))

app.use((req, res) => {
  const options = {
    maxAge: 2100,
    httpOnly: true,
    signed: true,
    secure: true,
  };

  res.cookie('SESSION', '120f8hasf0asmf8h018hfm', options)
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))