import React, { useState, useEffect } from "react";
import './styles.css';
import axios from 'axios';
import ToggleSwitch from 'react-toggle-switch';
import { initializeApp} from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";



const WebSocketExample = () => {
  const [isLightMode, setIsLightMode] = useState(true);

  const [currentSongBrisbane, setCurrentSongBrisbane] = useState({});
  const [currentSongMelbourne, setCurrentSongMelbourne] = useState({});
  const [currentSongSydney, setCurrentSongSydney] = useState({});
  
  const [LyricsBrisbane, setBrisbaneLyrics] = useState();
  const [LyricsMelbourne, setLyricsMelbourne] = useState();
  const [LyricsSydney, setLyricsSydney] = useState();

  const [BrisbaneGenius, setBrisbaneGenius] = useState({});
  const [MelbourneGenius, setMelbourneGenius] = useState({});
  const [SydneyGenius, setSydneyGenius] = useState({});

  const [BrisbaneMeaning, setBrisbaneMeaning] = useState();
  const [MelbourneMeaning, setMelbourneMeaning] = useState();
  const [SydneyMeaning, setSydneyMeaning] = useState();

  const [BrisbaneYoutube, setBrisbaneYoutube] = useState();
  const [MelbourneYoutube, setMelbourneYoutube] = useState();
  const [SydneyYoutube, setSydneyYoutube] = useState();

  const [BrisbaneSongRelationships, setBrisbaneSongRelationships] = useState();
  

  const styles = {
    backgroundColor: isLightMode ? '#fff' : '#121212',
    color: isLightMode ? '#121212' : '#fff',
    border: isLightMode ? '1px solid #333' : '1px solid #fff',
    top: 0,
    right: 0,
  };
  
  const styles_1 = {
    backgroundColor: isLightMode ? '#fff' : '#333',
    color: isLightMode ? '#333' : '#fff',
    boxShadow: `0 0 0  ${isLightMode ? '#333' : '#fff'}`,
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '5px',
    
  };
  

  const toggleDarkMode = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyB2kkTf8F7GvdA3SNhheRJH6xtDhGKk3Kg",
      authDomain: "triplem-373008.firebaseapp.com",
      databaseURL: "https://triplem-373008-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "triplem-373008",
      storageBucket: "triplem-373008.appspot.com",
      messagingSenderId: "424571860005",
      appId: "1:424571860005:web:2e20c2240e34ccf5fbbbcc",
      measurementId: "G-QDN074XLYX"
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    console.log("app",app);
    console.log("database",app);




    


    
    var _ = require('lodash');
    let youtubeUrl;

    const payload = {
      "action": "MultiSubscribeToCurrentEvent",
      "payload": {
        "stations": [
          "4mmm_fm",
          "2mmm_fm",
          "3mmm_fm"
        ],
        "initialise": true
      }
    };
    const socket = new WebSocket("wss://master-ws.nowplaying.prod.scadigital.com.au/station");
    
    socket.onopen = function(event) {
      console.log("WebSocket is open now.");
    socket.send(JSON.stringify( payload ));
    };

    socket.onmessage = function(event) {
      const parsedData = JSON.parse(event.data);

      const search = async (query) => {
        try {
          const response = await axios.get(`http://localhost:3000/search?q=${query}`);
          return response;
        } catch (error) {
          console.error(error);
        }
      };


      for (let i = 0; i < 3; i++) {

        
        if(parsedData.data.stations[i].station === "4mmm_fm" && parsedData.data.stations[i].currentTrack.id && currentSongBrisbane.id !== parsedData.data.stations[i].currentTrack.id) {
          setCurrentSongBrisbane(parsedData.data.stations[i].currentTrack);
          //console.log("parsedData.data.stations[i].currentTrack", parsedData.data.stations[i].currentTrack);
          const station = parsedData.data.stations[i].station;
          const currentTrack = parsedData.data.stations[i].currentTrack;
          set(ref(database, '4mmm_fm/' + currentTrack.dateUtc ), currentTrack);
          
          
          
          axios.get('http://localhost:3000/lyrics', { params: {
            artist: parsedData.data.stations[i].currentTrack.artistName,
            song: parsedData.data.stations[i].currentTrack.title
          }})
          .then(response => {
            setBrisbaneLyrics(response.data.lyrics.replace(/\n/g, '<br>'));
            console.log(response.data.lyrics);
            
          })
          .catch(error => {
            console.error("LYRICS", error);
          });

          const search_query_bne = parsedData.data.stations[i].currentTrack.title.concat(" ", parsedData.data.stations[i].currentTrack.artistName);
          
          axios.get(`http://localhost:3000/search?q=${search_query_bne}`)
          .then(response => {
            //console.log("search_query)bne",response.data.response.hits[0].result);

            axios.get(`http://localhost:3000/song?q=${response.data.response.hits[0].result.id}`)
            .then(response => {
              console.log("song info",response.data.response.song);  setBrisbaneGenius(response.data.response.song);
              console.log("song_relationships", response.data.response.song.song_relationships); setBrisbaneSongRelationships(response.data.response.song.song_relationships);
              var bris_text = '';
              
              var parseNode = function(node) {
                if (_.has(node, 'children')) {
                  _.each(node.children, function(child) {
                    parseNode(child);
                  });
                } else if (_.isString(node)) {
                  bris_text += node;
                }
              };


              _.each(response.data.response.song.description.dom.children, function(node) {
                parseNode(node);
              });
              
              setBrisbaneMeaning(bris_text);

              
              for (let item of response.data.response.song.media) {
                if (item.provider === "youtube") {
                  youtubeUrl = item.url;
                  console.log(youtubeUrl);
                  const embedLink = youtubeUrl.replace("watch?v=", "embed/");
                  setBrisbaneYoutube(embedLink);
                }


              }




            })
            .catch(error => {
              console.error("song meaning", error);
            });
            
          })
          .catch(error => {
            console.error("search_query)bne", error);
          });
          
        };

        if(parsedData.data.stations[i].station === "3mmm_fm" && parsedData.data.stations[i].currentTrack.id && currentSongMelbourne.id !== parsedData.data.stations[i].currentTrack.id ) {
          setCurrentSongMelbourne(parsedData.data.stations[i].currentTrack);
          const station = parsedData.data.stations[i].station;
          const currentTrack = parsedData.data.stations[i].currentTrack;
          set(ref(database, '3mmm_fm/' + currentTrack.dateUtc ), currentTrack);

          axios.get('http://localhost:3000/lyrics', { params: {
            artist: parsedData.data.stations[i].currentTrack.artistName,
            song: parsedData.data.stations[i].currentTrack.title
          }})
          .then(response => {
           setLyricsMelbourne(response.data.lyrics.replace(/\n/g, '<br>'));
          })
          .catch(error => {
            //console.error("LYRICS", error);
          });

          const search_query_mel = parsedData.data.stations[i].currentTrack.title.concat(" ", parsedData.data.stations[i].currentTrack.artistName);
          
          axios.get(`http://localhost:3000/search?q=${search_query_mel}`)
          .then(response => {
            //console.log("search_query)bne",response.data.response.hits[0].result);

            axios.get(`http://localhost:3000/song?q=${response.data.response.hits[0].result.id}`)
            .then(response => {
              console.log("song info",response.data.response.song);  setMelbourneGenius(response.data.response.song);

              var melb_text = '';

              var parseNode = function(node) {
                if (_.has(node, 'children')) {
                  _.each(node.children, function(child) {
                    parseNode(child);
                  });
                } else if (_.isString(node)) {
                  melb_text += node;
                }
              };

              _.each(response.data.response.song.description.dom.children, function(node) {
                parseNode(node);
              });
              
              setMelbourneMeaning(melb_text);

              for (let item of response.data.response.song.media) {
                if (item.provider === "youtube") {
                  youtubeUrl = item.url;
                  console.log(youtubeUrl);
                  const embedLink = youtubeUrl.replace("watch?v=", "embed/");
                  setMelbourneYoutube(embedLink);
                }

              }

            })
            .catch(error => {
              console.error("song meaning", error);
            });
            
          })
          .catch(error => {
            console.error("melbourne", error);
          });



        };

        if(parsedData.data.stations[i].station === "2mmm_fm" && parsedData.data.stations[i].currentTrack.id  && currentSongSydney.id !== parsedData.data.stations[i].currentTrack.id  ) {
          setCurrentSongSydney(parsedData.data.stations[i].currentTrack);
          const station = parsedData.data.stations[i].station;
          const currentTrack = parsedData.data.stations[i].currentTrack;
          set(ref(database, '2mmm_fm/' + currentTrack.dateUtc ), currentTrack);

          axios.get('http://localhost:3000/lyrics', { params: {
            artist: parsedData.data.stations[i].currentTrack.artistName,
            song: parsedData.data.stations[i].currentTrack.title
          }})
          .then(response => {
             setLyricsSydney(response.data.lyrics.replace(/\n/g, '<br>'));
          })
          .catch(error => {
            console.error("LYRICS", error);
          });

          const search_query_syd = parsedData.data.stations[i].currentTrack.title.concat(" ", parsedData.data.stations[i].currentTrack.artistName);
          
          axios.get(`http://localhost:3000/search?q=${search_query_syd}`)
          .then(response => {
            //console.log("search_query)bne",response.data.response.hits[0].result);

            axios.get(`http://localhost:3000/song?q=${response.data.response.hits[0].result.id}`)
            .then(response => {
              console.log("song info",response.data.response.song);  setSydneyGenius(response.data.response.song);
              var syd_text = '';

              var parseNode = function(node) {
                if (_.has(node, 'children')) {
                  _.each(node.children, function(child) {
                    parseNode(child);
                  });
                } else if (_.isString(node)) {
                  syd_text += node;
                }
              };


              _.each(response.data.response.song.description.dom.children, function(node) {
                parseNode(node);
              });
              
              setSydneyMeaning(syd_text);

              for (let item of response.data.response.song.media) {
                if (item.provider === "youtube") {
                  youtubeUrl = item.url;
                  console.log(youtubeUrl);
                  const embedLink = youtubeUrl.replace("watch?v=", "embed/");
                  setSydneyYoutube(embedLink);
                }}

            })
            .catch(error => {
              console.error("song meaning", error);
            });
            
          })
          .catch(error => {
            console.error("sydney", error);
          });

        };

      };
      

    };

    socket.onclose = function(event) {
      console.log("WebSocket is closed now.");
      const socket = new WebSocket("wss://master-ws.nowplaying.prod.scadigital.com.au/station");
      socket.onopen = function(event) {
        console.log("WebSocket is open now.");
      socket.send(JSON.stringify( payload ));
      };
      
    };

    return () => {
      
    };
  }, []);

  return (
    <>
    <button style={styles_1} onClick={toggleDarkMode}>
      {isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
    <div></div>
    <div  className="container">
    <div style={styles}  className="box">
    <div  className="header-box">
    <h1 className="h1">Triple M Brisbane 104.5</h1>
    <img src="https://img.listnr.com/api/assets/mercury/9c3ecdec-73d9-44ac-b7fb-2a188a670bbc?width=320&height=320" />
    </div>
    <div className="header-box">
    <p className="text">Current Track: {currentSongBrisbane.title}</p>
    <p className="text">Artist: {currentSongBrisbane.artistName}</p>
    <p className="text">Album: {currentSongBrisbane.albumName}</p>
    <img src={currentSongBrisbane.imageUrl} className="album-cover" />

    
    <div>
      <iframe
        title="Video Player"
        width="500"
        height="300"
        src={BrisbaneYoutube}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    
    



        <div>
        <p className="text">Description: {BrisbaneMeaning}</p>
    <p className="text">Release Date: {BrisbaneGenius.release_date_for_display}</p>
    
    
    
    
        </div>
        



    
    
    
    



    
    </div>
    <p dangerouslySetInnerHTML={{ __html: LyricsBrisbane }} />
    
    

    
    




    
    </div>
    

    



    <div style={styles} className="box">
    <div className="header-box">
    <h1 className="h1">Triple M Sydney 104.9</h1>
    <img src="https://img.listnr.com/api/assets/mercury/7afc965e-6c98-4c7a-97f9-9e72d95b08b1?width=320&height=320" />
    </div>
    <div className="header-box">
    <p className="text">Current Track: {currentSongSydney.title}</p>
    <p className="text">Artist: {currentSongSydney.artistName}</p>
    <p className="text">Album: {currentSongSydney.albumName}</p>
    <img src={currentSongSydney.imageUrl}  className="album-cover" />
    
    <div>
      <iframe
        title="Video Player"
        width="500"
        height="300"
        src={SydneyYoutube}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    
    <p className="text">Release Date: {SydneyGenius.release_date_for_display}</p>
    <p className="text">Description: {SydneyMeaning}</p>
    
    
    
    
    

    
    </div>
    <p dangerouslySetInnerHTML={{ __html: LyricsSydney }} />
    </div>

    <div style={styles} className="box">
    <div className="header-box">
    <h1 className="h1">Triple M Melbourne 105.1</h1>
    <img src="https://img.listnr.com/api/assets/mercury/593d5757-8d50-41ad-98e9-9c9d8b7cc53d?width=320&height=320" />
    </div><div className="header-box">
    <p className="text">Current Track: {currentSongMelbourne.title}</p>
    <p className="text">Artist: {currentSongMelbourne.artistName}</p>
    <p className="text">Album: {currentSongMelbourne.albumName}</p>
    <img src={currentSongMelbourne.imageUrl}  className="album-cover" />
    
    <div>
      <iframe
        title="Video Player"
        width="500"
        height="300"
        src={MelbourneYoutube}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    
    
    <p className="text">Release Date: {MelbourneGenius.release_date_for_display}</p>
    <p className="text">Description: {MelbourneMeaning}</p>
    
    
    
    
    

    
    </div>
    <p dangerouslySetInnerHTML={{ __html: LyricsMelbourne }} />
    
    </div>
    </div>


</>
  );
};

export default WebSocketExample;