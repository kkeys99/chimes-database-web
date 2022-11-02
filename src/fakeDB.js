/* 
* A (hacky) Fake Database to populate the frontend with.
*/

// Song class
class Song {
    constructor(sheet, title, composer, arranger, genre, requests, keysig, timesig, tempo, added, available, played) {
        this.sheet = sheet;
        this.title = title;
        this.composer = composer;
        this.arranger = arranger;
        this.genre = genre;
        this.requests = requests;
        this.keysig = keysig;
        this.timesig = timesig;
        this.tempo = tempo;
        this.added = added;
        this.available = available;
        this.played = played;
    }
}

// Performance class - instance of CM playing a song
class Performance {
    constructor(song, isRequest, performers) {
        this.song = song;
        this.isRequest = isRequest;
        this.performers = performers;
    }   
}

// Concert class - a collection of Performances w date, bells adjusted
class Concert {
    constructor(date, type, bellsAdjusted, performances) {
        this.date = date;
        this.type = type;
        this.bellsAdjusted = bellsAdjusted;
        this.performances = performances;
    }   
}

// Create Songs
const myGirl = new Song(
    "T19", "My Girl", "The Temptations", "VT", "Popular", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const cantTake = new Song(
    "V9", "Can't Take My Eyes Off Of You", "Franki Valli", "EC", "Popular", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const cheapThrills = new Song(
    "DT315", "Cheap Thrills", "Sia", "RLO", "Popular", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const inTheMood = new Song(
    "M24", "In The Moods", "???", "???", "Popular", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const whenYouWish = new Song(
    "H3", "When You Wish Upon A Star (from 'Pinocchio')", "???", "???", "Popular", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const moonlight = new Song(
    "B206", "Moonlight Sonata -  Adagio, Op. 27, No. 2", "Beethoven", "???", "Popular", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const sentimental = new Song(
    "Unprop", "In A Sentimental Mood", "Duke Ellington", "???", "Popular", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const cityOfStars = new Song(
    "Unprop", "City of Starts", "Justin Hurwitz", "JHK", "Popular", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const misty = new Song(
    "Prop", "Misty Mountains", "Howard Shore", "JHK", "Popular", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const btmv = new Song(
    "H315", "Be Thou My Vision (Slane)", "Irish Trad.", "KKC", "Hymn", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const testdrive = new Song(
    "DT372", "Test Drive (from 'How to Train Your Dragon')", "John Powell", "AK", "Movie", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);
const rach = new Song(
    "DT384", "Piano Concerto No. 2 in c minor, Op. 18", "Sergei Rachmaninoff", "CLL", "Classical", 0, "Key", "Time", "Tempo", "Date Added", '1/1/2001', 0
);

// Create Performances
const perf1 = new Performance(myGirl, false, ["CLL"]);
const perf2 = new Performance(sentimental, false, ["CLL"]);
const perf3 = new Performance(cantTake, false, ["CLL"]);
const perf4 = new Performance(cheapThrills, false, ["CLL", "JKM"]);
const perf5 = new Performance(misty, false, ["CLL"]);
const perf6 = new Performance(cityOfStars, false, ["CLL"]);
const perf7 = new Performance(inTheMood, false, ["CLL"]);
const perf8 = new Performance(whenYouWish, false, ["CLL"]);
const perf9 = new Performance(moonlight, false, ["CLL"]);
const perf10 = new Performance(btmv, false, ["AK"]);
const perf11 = new Performance(testdrive, false, ["CLL", "AK"]);
const perf12 = new Performance(rach, false, ["CLL", "AK"]);


// List of Performances
const performances = [perf1, perf2, perf3, perf4, perf5, perf6, perf7, perf8, perf9];

// Concerts
const concert1 = new Concert("2/2/2022", "Morning", true, performances);
const concert2 = new Concert("2/3/2022", "Afternoon", true, [perf10, perf11, perf12])

// List of concerts aka the whole DB
exports.all_concerts = [concert1, concert2];
