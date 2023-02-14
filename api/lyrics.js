export default async function handler(req, res) {
    const axios = require('axios');
    const { getLyrics } = require("lyrics-dumper");
    const accessToken = 'cojH8jQqn4cF36PceSsnXySHxnoR9h1FDOmI-ACXHY4SBn5tWhEfiqIO_izcqQQr';
    const { artist, song } = req.query;

  
    try {
      const result = await getLyrics(`${artist}, ${song}`);
      res.status(200).json({ lyrics: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get lyrics' });
    }
  }