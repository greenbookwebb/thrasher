const express = require('express');
const axios = require('axios');
const request = require('request');
const cors = require('cors');
const { getLyrics } = require("lyrics-dumper");

const app = express();
app.use(cors());

const accessToken = 'cojH8jQqn4cF36PceSsnXySHxnoR9h1FDOmI-ACXHY4SBn5tWhEfiqIO_izcqQQr';

app.get('/search', (req, res) => {
  let q = req.query;
  let apiUrl = 'https://api.genius.com/search?q=';
  apiUrl = apiUrl.concat(q.q);

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
  let q = req.query;
  let apiUrl = 'https://api.genius.com/songs/';
  apiUrl = apiUrl.concat(q.q);

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
      const result = await getLyrics(`${artist}, ${song}`);
      res.send(result);
    } catch(error) {
      console.error(error);
    }
  };

  main(req.query.artist, req.query.song);
});

module.exports = app;
