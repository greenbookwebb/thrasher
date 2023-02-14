export default function handler(req, res) {

    const { getLyrics } = require("lyrics-dumper");
    const accessToken = 'cojH8jQqn4cF36PceSsnXySHxnoR9h1FDOmI-ACXHY4SBn5tWhEfiqIO_izcqQQr';


    const main = async(artist, song) => {
        try {
        console.log("Artist", artist, "Song", song)
        const result = await getLyrics(`${artist}, ${song}`);
        console.log("result", result);
        console.log(result);
        res.send(result);
        } catch(error) {
            console.error(error);
        }


    };
    return res.send(main("Bruce Springsteen","Hungry Heart"));
  }


