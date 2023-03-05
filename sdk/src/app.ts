import express = require('express');
import url = require('url');
// Create a new express application instance
const app: express.Application = express();

const RSSHub = require('rsshub');


RSSHub.init({
    // config
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/rss', (req, res) => {
  var parse=url.parse(req.url,true);
  const path=parse.query.path;
  console.log(path);
  RSSHub.request(path)
    .then((data) => {
        res.send( data);
    })
    .catch((e) => {
        console.log(e);
    });
  });

app.listen(3000, ()=> {
  console.log('Example app listening on port 3000!');
});

