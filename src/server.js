const express = require('express');
const axios = require('axios');
const request = require('request');
const cors = require('cors');
const app = express();
const { getLyrics } = require("lyrics-dumper");

const accessToken = 'cojH8jQqn4cF36PceSsnXySHxnoR9h1FDOmI-ACXHY4SBn5tWhEfiqIO_izcqQQr';

app.use(cors());

 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/search', (req, res) => {
  //console.log(req.query);
  let q = req.query;
  let apiUrl = 'https://api.genius.com/search?q=';
  apiUrl = apiUrl.concat(q.q);
  //console.log(apiUrl);

  request({
    url: apiUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

app.get('/song', (req, res) => {
  console.log("SONG", req.query);
  let q = req.query;
  //console.log(q);
  let apiUrl = 'https://api.genius.com/songs/';
  apiUrl = apiUrl.concat(q.q);
  //console.log(apiUrl);

  request({
    url: apiUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});



app.get("/lyrics", (req, res) => {
    const main = async(artist, song) => {
        try {
        //console.log("Artist", artist, "Song", song)
        const result = await getLyrics(`${artist}, ${song}`);
        //console.log(result);
        res.send(result);
        } catch(error) {
            console.error(error);
        }
    };

    
    main(req.query.artist, req.query.song);

});

app.listen(3000, () => {
  console.log("Proxy server listening on port 3000");


});

module.exports = app;