import React, { useState, useEffect } from "react";
import './styles.css';
import axios from 'axios';
import ToggleSwitch from 'react-toggle-switch';
import { initializeApp} from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import styled from "styled-components";



const WebSocketExample = () => {
  const [isLightMode, setIsLightMode] = useState(false);

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

  const [BrisbanePlays, setBrisbanePlays] = useState({});
  const [MelbournePlays, setMelbournePlays] = useState({});
  const [SydneyPlays, setSydneyPlays] = useState({});

  const [BrisbaneArtistPlays, setBrisbaneArtistPlays] = useState({});
  const [MelbourneArtistPlays, setMelbourneArtistPlays] = useState({});
  const [SydneyArtistPlays, setSydneyArtistPlays] = useState({});

  const [BrisbaneArtistLeaderboard, setBrisbaneArtistLeaderboard] = useState({});
  const [MelbourneArtistLeaderboard, setMelbourneArtistLeaderboard] = useState({});
  const [SydneyArtistLeaderboard, setSydneyArtistLeaderboard] = useState({});

  const [BrisbaneSongLeaderboard, setBrisbaneSongLeaderboard] = useState({});
  const [MelbourneSongLeaderboard, setMelbourneSongLeaderboard] = useState({});
  const [SydneySongLeaderboard, setSydneySongLeaderboard] = useState({});
  

  
  

  const styles = {
    backgroundColor: isLightMode ? '#fff' : '#121212',
    color: isLightMode ? '#121212' : '#fff',
    border: isLightMode ? '3px solid #333' : '3px solid #fff',
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

  const styles_2 = {
    backgroundColor: isLightMode ? '#e6e6e6' : '#2f2727',
    

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
    const dbRef = ref(database);

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

    get(child(dbRef, `4mmm_fm`)).then((snapshot) => {
      if (snapshot.exists()) {
        let a = Object.values(snapshot.val());
        let artistCounts = {};
        let songCounts = {};

        a.forEach(item => {
          let song = item.genius_id;
          songCounts[song] = songCounts[song] ? songCounts[song] + 1 : 1;
        });

        let sortedSongs = Object.keys(songCounts)
    .map(song => ({ id: song, 
                    count: songCounts[song], 
                    title: a.find(item => item.genius_id == song).title,
                    artist: a.find(item => item.genius_id == song).artistName,
                    youtube: a.find(item => item.genius_id == song).youtube}))
    .sort((a, b) => b.count - a.count).slice(0, 10);

    setBrisbaneSongLeaderboard(sortedSongs);
    console.log("sortedSongs", sortedSongs);



        a.forEach(item => {
          let artist = item.artistName;
          artistCounts[artist] = artistCounts[artist] ? artistCounts[artist] + 1 : 1;
        });

        let sortedArtists = Object.keys(artistCounts)
        .map(artist => ({ name: artist, count: artistCounts[artist], imageUrl: a.find(item => item.artistName === artist).genius_image }))
        .sort((a, b) => b.count - a.count).slice(0, 10);

        setBrisbaneArtistLeaderboard(sortedArtists);
        
      } else {
        
      }
    }).catch((error) => {
      console.error(error);
    });

    get(child(dbRef, `3mmm_fm`)).then((snapshot) => {
      if (snapshot.exists()) {
        let a = Object.values(snapshot.val());
        let artistCounts = {};
        let songCounts = {};

        a.forEach(item => {
          let song = item.genius_id;
          songCounts[song] = songCounts[song] ? songCounts[song] + 1 : 1;
        });

        let sortedSongs = Object.keys(songCounts)
    .map(song => ({ id: song, 
                    count: songCounts[song], 
                    title: a.find(item => item.genius_id == song).title,
                    artist: a.find(item => item.genius_id == song).artistName,
                    youtube: a.find(item => item.genius_id == song).youtube}))
    .sort((a, b) => b.count - a.count).slice(0, 10);

    setMelbourneSongLeaderboard(sortedSongs);
    console.log("sortedSongs", sortedSongs);



        a.forEach(item => {
          let artist = item.artistName;
          artistCounts[artist] = artistCounts[artist] ? artistCounts[artist] + 1 : 1;
        });

        let sortedArtists = Object.keys(artistCounts)
        .map(artist => ({ name: artist, count: artistCounts[artist], imageUrl: a.find(item => item.artistName === artist).genius_image }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

        setMelbourneArtistLeaderboard(sortedArtists);
        
      } else {
        
      }
    }).catch((error) => {
      console.error(error);
    });

    get(child(dbRef, `2mmm_fm`)).then((snapshot) => {
      if (snapshot.exists()) {
        let a = Object.values(snapshot.val());
        let artistCounts = {};
        let songCounts = {};

        a.forEach(item => {
          let song = item.genius_id;
          songCounts[song] = songCounts[song] ? songCounts[song] + 1 : 1;
        });

        let sortedSongs = Object.keys(songCounts)
    .map(song => ({ id: song, 
                    count: songCounts[song], 
                    title: a.find(item => item.genius_id == song).title,
                    artist: a.find(item => item.genius_id == song).artistName,
                    youtube: a.find(item => item.genius_id == song).youtube}))
    .sort((a, b) => b.count - a.count).slice(0, 10);

    setSydneySongLeaderboard(sortedSongs);


        a.forEach(item => {
          let artist = item.artistName;
          artistCounts[artist] = artistCounts[artist] ? artistCounts[artist] + 1 : 1;
        });

        let sortedArtists = Object.keys(artistCounts)
        .map(artist => ({ name: artist, count: artistCounts[artist], imageUrl: a.find(item => item.artistName === artist).genius_image }))
        .sort((a, b) => b.count - a.count).slice(0, 10);

        setSydneyArtistLeaderboard(sortedArtists);
        
      } else {
        
      }
    }).catch((error) => {
      console.error(error);
    });


    };


    socket.onmessage = function(event) {
      const parsedData = JSON.parse(event.data);


      const search = async (query) => {
        try {
          const response = await axios.get(`/api/search?q=${query}`);
          console.log("response", response)
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
          console.log("currentTrack", currentTrack);
          
          var database_function_brisbane = function() {
          get(child(dbRef, `4mmm_fm`)).then((snapshot) => {
            if (snapshot.exists()) {
              const filteredDataArtist = Object.values(snapshot.val()).filter(d => d.artistName === currentTrack.artistName);
              console.log("Brisbane - Artist", filteredDataArtist);
              setBrisbaneArtistPlays(filteredDataArtist);


              const filteredData = Object.values(snapshot.val()).filter(d => d.id === currentTrack.id);
              console.log("Brisbane - The song was played at:", filteredData);
              console.log("Brisbane - # of times played", filteredData.length);
              setBrisbanePlays(filteredData);
            } else {
              console.log("Brisbane - No data available for the specified song");
              setBrisbanePlays();
            }
          }).catch((error) => {
            console.error(error);
          });

          get(child(dbRef, `4mmm_fm`)).then((snapshot) => {
            if (snapshot.exists()) {
              let a = Object.values(snapshot.val());
              let artistCounts = {};
              let songCounts = {};
      
              a.forEach(item => {
                let song = item.genius_id;
                songCounts[song] = songCounts[song] ? songCounts[song] + 1 : 1;
              });
      
              let sortedSongs = Object.keys(songCounts)
          .map(song => ({ id: song, 
                          count: songCounts[song], 
                          title: a.find(item => item.genius_id == song).title,
                          artist: a.find(item => item.genius_id == song).artistName,
                          youtube: a.find(item => item.genius_id == song).youtube}))
          .sort((a, b) => b.count - a.count).slice(0, 10);
      
          setBrisbaneSongLeaderboard(sortedSongs);
          console.log("sortedSongs", sortedSongs);
      
      
      
              a.forEach(item => {
                let artist = item.artistName;
                artistCounts[artist] = artistCounts[artist] ? artistCounts[artist] + 1 : 1;
              });
      
              let sortedArtists = Object.keys(artistCounts)
              .map(artist => ({ name: artist, count: artistCounts[artist], imageUrl: a.find(item => item.artistName === artist).genius_image }))
              .sort((a, b) => b.count - a.count).slice(0, 10);
      
              setBrisbaneArtistLeaderboard(sortedArtists);
              
            } else {
              
            }
          }).catch((error) => {
            console.error(error);
          });
          };
          

          axios.get('/api/lyrics', { params: {
            artist: parsedData.data.stations[i].currentTrack.artistName,
            song: parsedData.data.stations[i].currentTrack.title
          }})
          .then(response => {
            console.log("brisbane lyrics", response);
            setBrisbaneLyrics(response.data.lyrics.lyrics.replace(/\n/g, '<br>'));
            console.log("Brisbane lyrics:",response.data.lyrics);
            
          })
          .catch(error => {
            setBrisbaneLyrics();
            console.error("LYRICS", error);
          });

          const search_query_bne = parsedData.data.stations[i].currentTrack.title.concat(" ", parsedData.data.stations[i].currentTrack.artistName);
          
          axios.get(`/api/search?q=${search_query_bne}`)
          .then(response => {
            //console.log("search_query)bne",response.data.response.hits[0].result);

            axios.get(`/api/song?q=${response.data.response.hits[0].result.id}`)
            .then(response => {
              console.log("song infobne ",response.data.response.song);  setBrisbaneGenius(response.data.response.song);
              

              
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
                currentTrack.genius_image = response.data.response.song.header_image_url;
              currentTrack.genius_id = response.data.response.song.id;
              currentTrack.genius_meaning = bris_text;
              set(ref(database, '4mmm_fm/' + currentTrack.dateUtc), currentTrack);
              database_function_brisbane();
              
                
             
              

              
              for (let item of response.data.response.song.media) {
                if (item.provider === "youtube") {
                  youtubeUrl = item.url;
                  console.log(youtubeUrl);
                  let embedLink = youtubeUrl.replace("watch?v=", "embed/");
                  embedLink = embedLink.replace("http", "https");

                  currentTrack.genius_image = response.data.response.song.header_image_url;
              currentTrack.genius_id = response.data.response.song.id;
              currentTrack.genius_meaning = bris_text;
              currentTrack.youtube = embedLink;
              console.log("currentTrack After adding", currentTrack);
              set(ref(database, '4mmm_fm/' + currentTrack.dateUtc), currentTrack);
              database_function_brisbane();


                  
                  //console.log("Brisbane embedLink", embedLink);
                  setBrisbaneYoutube(embedLink);
                  break;
                };
                if (item.provider ===! "youtube") {
                  setBrisbaneYoutube();
                }
                


              }




            })
            .catch(error => {
              console.error("song meaning", error);
              setBrisbaneMeaning();
            });
            
          })
          .catch(error => {
            console.error("search_query)bne", error);
            setBrisbaneGenius({});
          });
          
          
        };

        if(parsedData.data.stations[i].station === "3mmm_fm" && parsedData.data.stations[i].currentTrack.id && currentSongMelbourne.id !== parsedData.data.stations[i].currentTrack.id ) {
          setCurrentSongMelbourne(parsedData.data.stations[i].currentTrack);
          const station = parsedData.data.stations[i].station;
          const currentTrack = parsedData.data.stations[i].currentTrack;
          
          var database_function_melbourne = function() {
          get(child(dbRef, `3mmm_fm`)).then((snapshot) => {
            if (snapshot.exists()) {
              const filteredDataArtist = Object.values(snapshot.val()).filter(d => d.artistName === currentTrack.artistName);
              console.log("Melbourne - Artist", filteredDataArtist);
              setMelbourneArtistPlays(filteredDataArtist);



              const filteredData = Object.values(snapshot.val()).filter(d => d.id === currentTrack.id);
              console.log("Melbourne - The song was played at:", filteredData);
              console.log("Melbourne - # of times played", filteredData.length);
              setMelbournePlays(filteredData);
            } else {
              console.log("Melbourne - No data available for the specified song");
              setMelbournePlays();
            }
          }).catch((error) => {
            console.error(error);
          });

          get(child(dbRef, `3mmm_fm`)).then((snapshot) => {
            if (snapshot.exists()) {
              let a = Object.values(snapshot.val());
              let artistCounts = {};
              let songCounts = {};
      
              a.forEach(item => {
                let song = item.genius_id;
                songCounts[song] = songCounts[song] ? songCounts[song] + 1 : 1;
              });
      
              let sortedSongs = Object.keys(songCounts)
          .map(song => ({ id: song, 
                          count: songCounts[song], 
                          title: a.find(item => item.genius_id == song).title,
                          artist: a.find(item => item.genius_id == song).artistName,
                          youtube: a.find(item => item.genius_id == song).youtube}))
          .sort((a, b) => b.count - a.count).slice(0, 10);
      
          setMelbourneSongLeaderboard(sortedSongs);
          console.log("sortedSongs", sortedSongs);
      
      
      
              a.forEach(item => {
                let artist = item.artistName;
                artistCounts[artist] = artistCounts[artist] ? artistCounts[artist] + 1 : 1;
              });
      
              let sortedArtists = Object.keys(artistCounts)
              .map(artist => ({ name: artist, count: artistCounts[artist], imageUrl: a.find(item => item.artistName === artist).genius_image }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 10);
      
              setMelbourneArtistLeaderboard(sortedArtists);
              
            } else {
              
            }
          }).catch((error) => {
            console.error(error);
          });
        };

          axios.get('/api/lyrics', { params: {
            artist: parsedData.data.stations[i].currentTrack.artistName,
            song: parsedData.data.stations[i].currentTrack.title
          }})
          .then(response => {
           setLyricsMelbourne(response.data.lyrics.lyrics.replace(/\n/g, '<br>'));
          })
          .catch(error => {
            setLyricsMelbourne();
            //console.error("LYRICS", error);
          });

          const search_query_mel = parsedData.data.stations[i].currentTrack.title.concat(" ", parsedData.data.stations[i].currentTrack.artistName);
          
          axios.get(`/api/search?q=${search_query_mel}`)
          .then(response => {
            //console.log("search_query)bne",response.data.response.hits[0].result);

            axios.get(`/api/song?q=${response.data.response.hits[0].result.id}`)
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

              currentTrack.genius_image = response.data.response.song.header_image_url;
              currentTrack.genius_id = response.data.response.song.id;
              currentTrack.genius_meaning = melb_text;
              
              console.log("currentTrack After adding", currentTrack);
              set(ref(database, '3mmm_fm/' + currentTrack.dateUtc), currentTrack);

              database_function_melbourne();
              

              

              for (let item of response.data.response.song.media) {
                if (item.provider === "youtube") {
                  youtubeUrl = item.url;
                  console.log(youtubeUrl);
                  let embedLink = youtubeUrl.replace("watch?v=", "embed/");
                  embedLink = embedLink.replace("http", "https");

                  currentTrack.genius_image = response.data.response.song.header_image_url;
              currentTrack.genius_id = response.data.response.song.id;
              currentTrack.genius_meaning = melb_text;
              currentTrack.youtube = embedLink;
              console.log("currentTrack After adding", currentTrack);
              set(ref(database, '3mmm_fm/' + currentTrack.dateUtc), currentTrack);


                  //console.log("Melb embedLink", embedLink);
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
          
          var database_function_sydney = function() {
          get(child(dbRef, `2mmm_fm`)).then((snapshot) => {
            if (snapshot.exists()) {
              const filteredDataArtist = Object.values(snapshot.val()).filter(d => d.artistName === currentTrack.artistName);
              console.log("Sydney - Artist", filteredDataArtist);
              setSydneyArtistPlays(filteredDataArtist);
          
          




              const filteredData = Object.values(snapshot.val()).filter(d => d.id === currentTrack.id);
              console.log("Sydney - The song was played at:", filteredData);
              console.log("Sydney - # of times played", filteredData.length);
              setSydneyPlays(filteredData);
            } else {
              console.log("Sydney - No data available for the specified song");
              setSydneyPlays();
            }
          }).catch((error) => {
            console.error(error);
          });

          get(child(dbRef, `2mmm_fm`)).then((snapshot) => {
            if (snapshot.exists()) {
              let a = Object.values(snapshot.val());
              let artistCounts = {};
              let songCounts = {};
      
              a.forEach(item => {
                let song = item.genius_id;
                songCounts[song] = songCounts[song] ? songCounts[song] + 1 : 1;
              });
      
              let sortedSongs = Object.keys(songCounts)
          .map(song => ({ id: song, 
                          count: songCounts[song], 
                          title: a.find(item => item.genius_id == song).title,
                          artist: a.find(item => item.genius_id == song).artistName,
                          youtube: a.find(item => item.genius_id == song).youtube}))
          .sort((a, b) => b.count - a.count).slice(0, 10);
      
          setSydneySongLeaderboard(sortedSongs);
      
      
              a.forEach(item => {
                let artist = item.artistName;
                artistCounts[artist] = artistCounts[artist] ? artistCounts[artist] + 1 : 1;
              });
      
              let sortedArtists = Object.keys(artistCounts)
              .map(artist => ({ name: artist, count: artistCounts[artist], imageUrl: a.find(item => item.artistName === artist).genius_image }))
              .sort((a, b) => b.count - a.count).slice(0, 10);
      
              setSydneyArtistLeaderboard(sortedArtists);
              
            } else {
              
            }
          }).catch((error) => {
            console.error(error);
          });
        };

          axios.get('/api/lyrics', { params: {
            artist: parsedData.data.stations[i].currentTrack.artistName,
            song: parsedData.data.stations[i].currentTrack.title
          }})
          .then(response => {
            console.log("lyrics Sydney", response.data.lyrics );
             setLyricsSydney(response.data.lyrics.lyrics.replace(/\n/g, '<br>'));
          })
          .catch(error => {
            console.error("LYRICS", error);
            setLyricsSydney();
          });

          const search_query_syd = parsedData.data.stations[i].currentTrack.title.concat(" ", parsedData.data.stations[i].currentTrack.artistName);
          
          axios.get(`/api/search?q=${search_query_syd}`)
          .then(response => {
            console.log("sydney search",response.data.response.hits[0].result);

            axios.get(`/api/song?q=${response.data.response.hits[0].result.id}`)
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

              currentTrack.genius_image = response.data.response.song.header_image_url;
              currentTrack.genius_id = response.data.response.song.id;
              currentTrack.genius_meaning = syd_text;
              
              console.log("currentTrack After adding", currentTrack);
              set(ref(database, '2mmm_fm/' + currentTrack.dateUtc), currentTrack);

              database_function_sydney();


              

              for (let item of response.data.response.song.media) {
                if (item.provider === "youtube") {
                  youtubeUrl = item.url;
                  console.log(youtubeUrl);
                  let embedLink = youtubeUrl.replace("watch?v=", "embed/");
                  embedLink = embedLink.replace("http", "https");
                  //console.log("syd embedLink", embedLink);

                  currentTrack.genius_image = response.data.response.song.header_image_url;
              currentTrack.genius_id = response.data.response.song.id;
              currentTrack.genius_meaning = syd_text;
              currentTrack.youtube = embedLink;
              console.log("currentTrack After adding", currentTrack);
              set(ref(database, '2mmm_fm/' + currentTrack.dateUtc), currentTrack);
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
    <div  style={styles_2}>
    <div>
    <button style={styles_1} onClick={toggleDarkMode}>
      {isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button></div>
    
    
    <div style={styles}  className="box">
      <h1>Thrasher!</h1>
      <h3>Thrasher is a website that is designed to be the one-stop spot to see what songs Triple M is currently Thrashing across the east coast! </h3>
      <h3>Below you'll see the songs which Triple M is currently thrashing.</h3>
      <h3>At the bottom of the page, you'll see the leaderboard as to the Artists which have been the most Thrashed since 12:23pm, 15 February, 2023!</h3>
    </div>
    
    <div  className="container">
    <div style={styles}  className="box">
    <div  className="header-box">
    <h1 className="h1">Triple M Brisbane 104.5</h1>
    <img src="https://img.listnr.com/api/assets/mercury/9c3ecdec-73d9-44ac-b7fb-2a188a670bbc?width=320&height=320" />
    </div>
    <div className="header-box">
    
    
    

    
    
    
    


    {currentSongBrisbane.title ? <div> <div>
      <iframe
        title="Video Player"
        src={BrisbaneYoutube}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
        <p className="text">Current Track: {currentSongBrisbane.title}</p>
    <p className="text">Artist: {currentSongBrisbane.artistName}</p>
    <p className="text">Album: {currentSongBrisbane.albumName}</p>
    <p className="text">Release Date: {BrisbaneGenius.release_date_for_display}</p> </div> : <div><h1>No song is currently playing.</h1></div>  }
        
    
    
    
    

      
    
    </div>
   
    
    </div>
  
    <div style={styles} className="box">
    <div className="header-box">
    <h1 className="h1">Triple M Sydney 104.9</h1>
    <img src="https://img.listnr.com/api/assets/mercury/7afc965e-6c98-4c7a-97f9-9e72d95b08b1?width=320&height=320" />
    </div>
    <div className="header-box">
    
    
    
    
    
    
    {currentSongSydney.title ? <div> <div>
      <iframe
        title="Video Player"
        src={SydneyYoutube}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
        <p className="text">Current Track: {currentSongSydney.title}</p>
    <p className="text">Artist: {currentSongSydney.artistName}</p>
    <p className="text">Album: {currentSongSydney.albumName}</p>
    <p className="text">Release Date: {SydneyGenius.release_date_for_display}</p> </div> : <div><h1>No song is currently playing.</h1></div>  }
    
    
    
    
    
    

    
    </div>
    
    </div>

    <div style={styles} className="box">
    <div className="header-box">
    <h1 className="h1">Triple M Melbourne 105.1</h1>
    <img src="https://img.listnr.com/api/assets/mercury/593d5757-8d50-41ad-98e9-9c9d8b7cc53d?width=320&height=320" />
    </div><div className="header-box">

    
    
    
    
    
    
    {currentSongMelbourne.title ? <div> <div>
      <iframe
        title="Video Player"
        src={MelbourneYoutube}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
        <p className="text">Current Track: {currentSongMelbourne.title}</p>
    <p className="text">Artist: {currentSongMelbourne.artistName}</p>
    <p className="text">Album: {currentSongMelbourne.albumName}</p>
    <p className="text">Release Date: {MelbourneGenius.release_date_for_display}</p> </div> : <div><h1>No song is currently playing.</h1></div>  }
    
    
    
    
    
    

    
    </div>
    
    
    </div>
    </div>
    <div  className="container">
    <div style={styles}  className="box">
    <div  className="header-box">
     </div>
    <div className="header-box">
    
    <h1>Song Description</h1>
    {currentSongBrisbane.title ?<div>
    <img src={currentSongBrisbane.imageUrl} className="album-cover" /> </div> : <div></div>}

    
    
    
    



        <div>
        <p className="text">{BrisbaneMeaning}</p>
    
    
    
    
    
        </div>
        

    </div>
    
    
    
    </div>
    

    <div style={styles} className="box">
    <div className="header-box">
    </div>
    <div className="header-box">
    
    
    <h1>Song Description</h1>
    {currentSongSydney.title ?<div>
    <img src={currentSongSydney.imageUrl} className="album-cover" /> </div> : <div></div>}
    
    
    
    
    <p className="text">{SydneyMeaning}</p>
    
    
    
    
    

    
    </div>
    
    </div>

    

    <div style={styles} className="box">
    <div className="header-box">
    
    </div><div className="header-box">
    
    
    <h1>Song Description</h1>
    {currentSongMelbourne.title ?<div>
    <img src={currentSongMelbourne.imageUrl} className="album-cover" /> </div> : <div></div>}
    
    
    
    
    
    <p className="text">{MelbourneMeaning}</p>
    
    
    
    
    

    
    </div>
    
    
    </div>
    </div>
    <div  className="container">

    <div style={styles}  className="box">
    
    <div className="header-box">
    <h1 className="h1">Song Stats</h1>
    
    {BrisbanePlays.length > 0 ? (
      
    <div>
      <p className="text"> This song has been played {BrisbanePlays.length} time/s since 12:23pm, 15 Feb, 2023. </p>
    
  </div> ) : (<div></div>) }

  {BrisbaneArtistPlays.length > 0 ? (
      
      <div>
        <p className="text"> This artist has been played {BrisbaneArtistPlays.length} time/s since 12:23pm, 15 Feb, 2023. </p>
      
    </div> ) : (<div></div>) }


   
  
  

    </div>
    </div>

    <div style={styles} className="box">
    <div className="header-box">
    <h1 className="h1">Song Stats</h1>
    
    {SydneyPlays.length > 0 ? (
      
      <div>
        <p className="text"> This song has been played {SydneyPlays.length} time/s since 12:23pm, 15 Feb, 2023. </p>
      
    </div> ) : (<div></div>) }
  
    {SydneyArtistPlays.length > 0 ? (
        
        <div>
          <p className="text"> This artist has been played {SydneyArtistPlays.length} time/s since 12:23pm, 15 Feb, 2023. </p>
        
      </div> ) : (<div></div>) }

    </div>
    </div>

    

    <div style={styles} className="box">
    <div className="header-box">
    <h1 className="h1">Song Stats</h1>
    
    {MelbournePlays.length > 0 ? (
      
      <div>
        <p className="text"> This song has been played {MelbournePlays.length} time/s since 12:23pm, 15 Feb, 2023. </p>
      
    </div> ) : (<div></div>) }
  
    {MelbourneArtistPlays.length > 0 ? (
        
        <div>
          <p className="text"> This artist has been played {MelbourneArtistPlays.length} time/s since 12:23pm, 15 Feb, 2023. </p>
        
      </div> ) : (<div></div>) }
    
    </div>
    
    
    </div>
    </div>
    <div  className="container">
    <div style={styles}  className="box">
    <div  className="header-box">
    <h1>Lyrics</h1>
    <p dangerouslySetInnerHTML={{ __html: LyricsBrisbane }} />
    </div>

    </div>
    

    <div style={styles} className="box">
    <div className="header-box">
    <h1>Lyrics</h1>
    <p dangerouslySetInnerHTML={{ __html: LyricsSydney }} />
    </div>

    
    </div>
  
    <div style={styles} className="box">
    <div className="header-box">
    <h1>Lyrics</h1>
    <p dangerouslySetInnerHTML={{ __html: LyricsMelbourne }} />   
    </div>
    </div>
    </div>




    <div  className="container">
    <div style={styles}  className="box">
    <div  className="header-box">
    <h1>Artist Leaderboard (Brisbane)</h1>
    {BrisbaneArtistLeaderboard.length > 0 ? (
        
        <div>
          <table>
      <thead>
        <tr>
          <th>Artist Name</th>
          <th>Plays</th>
        </tr>
      </thead>
      <tbody>
        {BrisbaneArtistLeaderboard.map(artist => (
          <tr key={artist.name}>
            <td>{artist.name}</td>
            <td>{artist.count}</td>
            <td><img src={artist.imageUrl} alt={`Album art for ${artist.name}`} /></td>
            
          </tr>
        ))}
      </tbody>
    </table>
        
      </div> ) : (<div></div>) }
      <h1>Song Leaderboard (Brisbane)</h1>
    {BrisbaneSongLeaderboard.length > 0 ? (
        
        <div>
          <table>
      <thead>
        <tr>
        
          <th>Song</th>
          <th>Artist</th>
          <th>Plays</th>
        

        </tr>
      </thead>
      <tbody>
        {BrisbaneSongLeaderboard.map(song => (
          <tr key={song.id}>
            <td>{song.title}</td>
            <td>{song.artist}</td>
            <td>{song.count}</td>

          </tr>
          
        ))}
      </tbody>
    </table>
        
      </div> ) : (<div></div>) }


      
    

    </div>

    </div>
    

    <div style={styles} className="box">
    <div className="header-box">
    <h1>Artist Leaderboard (Sydney)</h1>
    {SydneyArtistLeaderboard.length > 0 ? (
        
        <div>
          <table>
      <thead>
        <tr>
          <th>Artist Name</th>
          <th>Plays</th>
        </tr>
      </thead>
      <tbody>
        {SydneyArtistLeaderboard.map(artist => (
          <tr key={artist.name}>
            <td>{artist.name}</td>
            <td>{artist.count}</td>
            <td><img src={artist.imageUrl} alt={`Album art for ${artist.name}`} /></td>
          </tr>
        ))}
      </tbody>
    </table>
        
      </div> ) : (<div></div>) }
      <h1>Song Leaderboard (Sydney)</h1>
    {SydneySongLeaderboard.length > 0 ? (
        
        <div>
          <table>
      <thead>
        <tr>
        <th>Song</th>
          <th>Artist</th>
          <th>Plays</th>

        </tr>
      </thead>
      <tbody>
        {SydneySongLeaderboard.map(song => (
          <tr key={song.id}>
            <td>{song.title}</td>
            <td>{song.artist}</td>
            <td>{song.count}</td>

          </tr>
          
        ))}
      </tbody>
    </table>
        
      </div> ) : (<div></div>) }
    

    </div>

    
    </div>

    <div style={styles} className="box">
    <div className="header-box">
    <h1>Artist Leaderboard (Melbourne)</h1>
    {MelbourneArtistLeaderboard.length > 0 ? (
        
        <div>
          <table>
      <thead>
        <tr>
          <th>Artist Name</th>
          <th>Plays</th>
        </tr>
      </thead>
      <tbody>
        {MelbourneArtistLeaderboard.map(artist => (
          <tr key={artist.name}>
            <td>{artist.name}</td>
            <td>{artist.count}</td>
            <td><img src={artist.imageUrl} alt={`Album art for ${artist.name}`} /></td>
          </tr>
        ))}
      </tbody>
    </table>
        
      </div> ) : (<div></div>) }
      <h1>Song Leaderboard (Melbourne)</h1>
    {MelbourneSongLeaderboard.length > 0 ? (
        
        <div>
          <table>
      <thead>
        <tr>
        <th>Song</th>
          <th>Artist</th>
          <th>Plays</th>

        </tr>
      </thead>
      <tbody>
        {MelbourneSongLeaderboard.map(song => (
          <tr key={song.id}>
            <td>{song.title}</td>
            <td>{song.artist}</td>
            <td>{song.count}</td>

          </tr>
          
        ))}
      </tbody>
    </table>
        
      </div> ) : (<div></div>) }
    


    </div>
    </div>
    </div>
</div>
  );
};

export default WebSocketExample;
