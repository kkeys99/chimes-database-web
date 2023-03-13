/*
 * A (hacky) Fake Database to populate the frontend with.
 */

// Song class
class Song {
  constructor(
    id,
    sheet,
    title,
    composer,
    arranger,
    genre,
    requests,
    keysig,
    timesig,
    tempo,
    added,
    available,
    played
  ) {
    this._id = id;
    this.sheet = [...sheet];
    this.title = title;
    this.composer = composer;
    this.arranger = arranger;
    this.genre = [...genre];
    this.requests = requests;
    this.keysig = [...keysig];
    this.timesig = [...timesig];
    this.tempo = [...tempo];
    this.added = [...added];
    this.available = [...available];
    this.played = played;
  }
}

// Performance class - instance of CM playing a song
class Performance {
  constructor(id, song, isRequest, performers) {
    this._id = id;
    this.song = song;
    this.isRequest = isRequest;
    this.performers = performers;
  }
}

// Concert class - a collection of Performances w date, bells adjusted
class Concert {
  constructor(id, date, type, bellsAdjusted, performances) {
    this._id = id;
    this.date = date;
    this.type = type;
    this.bellsAdjusted = bellsAdjusted;
    this.performances = performances;
  }
}

let all_songs = [];

// Create Songs
const myGirl = new Song(
  0,
  ["T19"],
  "My Girl",
  ["The Temptations"],
  ["VT"],
  ["Popular"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(myGirl);

const cantTake = new Song(
  1,
  ["V9"],
  "Can't Take My Eyes Off Of You",
  ["Franki Valli"],
  ["EC"],
  ["Popular"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(cantTake);

const cheapThrills = new Song(
  2,
  ["DT315"],
  "Cheap Thrills",
  ["Sia"],
  ["RLO"],
  ["Popular"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(cheapThrills);

const inTheMood = new Song(
  3,
  ["M24"],
  "In The Mood",
  ["???"],
  ["???"],
  ["Popular"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(inTheMood);

const whenYouWish = new Song(
  4,
  ["H3"],
  "When You Wish Upon A Star (from 'Pinocchio')",
  ["???"],
  ["???"],
  ["Popular"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(whenYouWish);

const moonlight = new Song(
  5,
  ["B206"],
  "Moonlight Sonata -  Adagio, Op. 27, No. 2",
  ["Beethoven"],
  ["???"],
  ["Popular"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(moonlight);

const sentimental = new Song(
  6,
  ["Unprop"],
  "In A Sentimental Mood",
  ["Duke Ellington"],
  ["???"],
  ["Popular"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(sentimental);

const cityOfStars = new Song(
  7,
  ["Unprop"],
  "City of Stars",
  ["Justin Hurwitz"],
  ["JHK"],
  ["Popular"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(cityOfStars);

const misty = new Song(
  8,
  ["Prop"],
  "Misty Mountains",
  ["Howard Shore"],
  ["JHK"],
  ["Popular"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(misty);

const btmv = new Song(
  9,
  ["H315"],
  "Be Thou My Vision (Slane)",
  ["Irish Trad."],
  ["KKC"],
  ["Hymn"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(btmv);

const testdrive = new Song(
  10,
  ["DT372"],
  "Test Drive (from 'How to Train Your Dragon')",
  ["John Powell"],
  ["AK"],
  ["Movie"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(testdrive);

const rach = new Song(
  11,
  ["DT384"],
  "Piano Concerto No. 2 in c minor, Op. 18",
  ["Sergei Rachmaninoff"],
  ["CLL"],
  ["Classical"],
  0,
  ["Key"],
  ["Time"],
  ["Tempo"],
  ["Date Added"],
  ["1/1/2001"],
  0
);
all_songs.push(rach);

// Create Performances
let all_performances = []

const perf1 = new Performance(1, myGirl, false, ["CLL"]);
const perf2 = new Performance(2, sentimental, false, ["CLL"]);
const perf3 = new Performance(3, cantTake, false, ["CLL"]);
const perf4 = new Performance(4, cheapThrills, false, ["CLL", "JKM"]);
const perf5 = new Performance(5, misty, false, ["CLL"]);
const perf6 = new Performance(6, cityOfStars, false, ["CLL"]);
const perf7 = new Performance(7, inTheMood, false, ["CLL"]);
const perf8 = new Performance(8, whenYouWish, false, ["CLL"]);
const perf9 = new Performance(9, moonlight, false, ["CLL"]);
const perf10 = new Performance(10, btmv, false, ["AK"]);
const perf11 = new Performance(11, testdrive, false, ["CLL", "AK"]);
const perf12 = new Performance(12, rach, false, ["CLL", "AK"]);

all_performances.push(perf1);
all_performances.push(perf2);
all_performances.push(perf3);
all_performances.push(perf4);
all_performances.push(perf5);
all_performances.push(perf6);
all_performances.push(perf7);
all_performances.push(perf8);
all_performances.push(perf9);
all_performances.push(perf10);
all_performances.push(perf11);
all_performances.push(perf12);



// List of Performances
const performances = [
  perf1,
  perf2,
  perf3,
  perf4,
  perf5,
  perf6,
  perf7,
  perf8,
  perf9,
];

// Concerts
const concert1 = new Concert(1, "2/2/2022", "Morning", true, performances);
const concert2 = new Concert(2, "2/3/2022", "Afternoon", true, [
  perf10,
  perf11,
  perf12,
]);

// List of concerts aka the whole DB
exports.all_concerts = [concert1, concert2];
exports.all_songs = all_songs;
exports.all_performances = all_performances;
