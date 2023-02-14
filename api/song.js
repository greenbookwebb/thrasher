export default function handler(req, res) {
    const request = require('request');
    const accessToken = 'cojH8jQqn4cF36PceSsnXySHxnoR9h1FDOmI-ACXHY4SBn5tWhEfiqIO_izcqQQr';
    //console.log("SONG", req.query);
    let q = req.query;
    //console.log(q);
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
    }
