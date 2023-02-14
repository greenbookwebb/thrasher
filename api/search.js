export default function handler(req, res) {
    const request = require('request');
    const accessToken = 'cojH8jQqn4cF36PceSsnXySHxnoR9h1FDOmI-ACXHY4SBn5tWhEfiqIO_izcqQQr';
    const q = req.query.q;
    const apiUrl = `https://api.genius.com/search?q=${q}`;
  
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