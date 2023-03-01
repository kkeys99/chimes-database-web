const express = require("express");
const bodyParser = require("body-parser");
const fakeDB = require("./fakeDB");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// List of the CM Names
const CMNames = {
  CLL: "Chenchen Lilia Lu '23",
  CMC: "Cameron M. Carr '23",
  EMW: "Elisabeth M. Wang '23",
  VZ: "Vivian Zhao '23",
  CEL: "Carey E. Lau '22",
  JKM: "Jenna K. Mertz '23",
  SJG: "Sebastian J. Guo '23",
  AK: "Alex Koenigsberger '21",
  LYL: "Linda Y. Li '22",
  KMDS: "Kayla M. D. Shames '22",
  GLR: "Gretchen L. Ryan '??",
  JLCLM: "Jennifer L. C. Lory-Moran '9?",
  KGJ: "Keith G. Jenkins '9?",
};

// fakeDB query helper functions

function getCMSongs(initials) {
  let thisCMPerformances = [];
  fakeDB.all_concerts.map(concert => {
    concert.performances.map(performance => {
      if (performance.performers.includes(initials)) {
        thisCMPerformances.push(performance.song);
      }
    });
  });
  // Add you
  thisCMPerformances.forEach(item => {
    item.you = 1;
  });
  console.log("HELLO");
  console.log(thisCMPerformances);
  return thisCMPerformances;
}

function getCMConcerts(initials) {
  let thisCMConcerts = [];
  fakeDB.all_concerts.map(concert => {
    console.log(`Looping through concert for ${initials}`);
    for (const performance of concert.performances) {
      if (performance.performers.includes(initials)) {
        thisCMConcerts.push(concert);
        return;
      }
    }
  });
  return thisCMConcerts;
}

function getCMArrangements(initials) {
  let thisCMPerformances = [];
  fakeDB.all_concerts.map(concert => {
    concert.performances.map(performance => {
      console.log(performance);
      if (performance.song.arranger.includes(initials)) {
        console.log("Found arranger");
        thisCMPerformances.push(performance.song);
      }
    });
  });
  // Add you
  thisCMPerformances.forEach(item => {
    item.you = 1;
  });
  return thisCMPerformances;
}

function getCMRequests(initials) {
  let thisCMRequests = [];
  fakeDB.all_concerts.map(concert => {
    concert.performances.map(performance => {
      if (
        performance.isRequest &&
        performance.song.arranger.includes(initials)
      ) {
        thisCMRequests.push(performance.song);
      }
    });
  });
  // Add you
  thisCMRequests.forEach(item => {
    item.you = 1;
  });
  return thisCMRequests;
}

function getSong(id) {
  return fakeDB.all_songs.find(song => song._id == id);
}

function getSongPageData(id) {
  const song = fakeDB.all_songs.find(song => song._id == id);
  let songPageData = {
    song: song,
    stats: {
      plays: 0,
      requests: 0,
      players: 0,
    },
    playsPerCM: {},
    history: {},
  };

  fakeDB.all_concerts.map(concert => {
    // Count Total Players
    for (const performance of concert.performances) {
      if (performance.song._id == song._id) {
        // Update plays / requests data
        songPageData.stats.plays += 1;
        performance.isRequest && (songPageData.stats.requests += 1);
        // Performers (TODO think of how to handle same song plays mult times on same day)
        songPageData.history[concert.date] = performance.performers;
        // Plays per CM data
        for (const performer of performance.performers) {
          console.log(performer);
          if (performer in songPageData.playsPerCM) {
            songPageData.playsPerCM[performer] += 1;
          } else {
            songPageData.playsPerCM[performer] = 1;
          }
        }
      }
    }
  });
  return songPageData;
}

// GET for the Home page
app.get("/home", (req, res) => {
  console.log("GET home");
  data = {
    concerts: fakeDB.all_concerts,
  };
  res.status(200).send(JSON.stringify(data));
});

// GET for the CM page
app.get("/CMs/:initials/:subpage", (req, res) => {
  console.log("CM GET");
  let data;
  switch (req.params.subpage) {
    case "stats": {
      console.log("Playing Stats");
      const songs = getCMSongs(req.params.initials);

      // Separate solos and duets
      const solos = songs.filter((song, idx) => {
        return song.sheet.slice(0, 2) != "DT";
      });
      const duets = songs.filter((song, idx) => {
        return song.sheet.slice(0, 2) == "DT";
      });

      data = {
        solos: solos,
        duets: duets,
      };
      break;
    }
    case "concerts": {
      console.log("Concerts");
      data = {
        text: CMNames[req.params.initials],
        concerts: getCMConcerts(req.params.initials),
      };
      break;
    }
    case "arrangements": {
      console.log("arrangements");
      data = {
        arrangements: getCMArrangements(req.params.initials),
      };
      break;
    }
    case "requests": {
      console.log("requests");
      const songs = getCMRequests(req.params.initials);

      // Separate solos and duets
      const solos = songs.filter((song, idx) => {
        return song.sheet.slice(0, 2) != "DT";
      });
      const duets = songs.filter((song, idx) => {
        return song.sheet.slice(0, 2) == "DT";
      });

      data = {
        solos: solos,
        duets: duets,
      };
      break;
    }
    default: {
      console.log(req.params.subpage);
      data = {
        text: CMNames[req.params.initials],
      };
      break;
    }
  }
  res.status(200).send(JSON.stringify(data));
});

app.post("/log", (req, res) => {
  console.log("POST concert log");
  console.log(req.body);
});

// GET for the Song page
app.get("/song/:_id", (req, res) => {
  console.log("GET song");
  data = getSongPageData(req.params._id);
  console.log(data);
  res.status(200).send(JSON.stringify(data));
});

app.listen(3030, () => console.log("Server active"));
