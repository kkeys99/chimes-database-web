/************************************
 * Types - to use site wide
 */

//----------------------------------------
// DB Entity Classes
//----------------------------------------
export class Note {
  public: boolean = false;
  text: string = "";
}

export class Song {
  _id: number;
  sheet: string[] = [""];
  title: string = "";
  composer: string[] = [""];
  arranger: string[] = [""];
  genre: string[] = [""];
  requests: number = 0;
  keysig: string[] = [""];
  timesig: string[] = [""];
  tempo: string[] = [""];
  added: string[] = [""];
  available: string[] = [""];
  played: number = 0;
  constructor(
    id: number = 0,
    sheet: string[] = [""],
    title: string = "",
    composer: string[] = [""],
    arranger: string[] = [""],
    genre: string[] = [""],
    requests: number = 0,
    keysig: string[] = [""],
    timesig: string[] = [""],
    tempo: string[] = [""],
    added: string[] = [""],
    available: string[] = [""],
    played: number = 0
  ) {
    this._id = id;
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

export class Performance {
  song: Song = new Song();
  isRequest: boolean = false;
  performers: String[] = [];
}

export class Concert {
  type: string = "";
  date: Date = new Date();
  bellsAdjusted: boolean = false;
  notes: Note[] = [new Note()];
  performances: Performance[] = [new Performance()];
}

//----------------------------------------
// CM Page
//----------------------------------------
export interface resultTableRowData extends Song {
  you: number;
}

//---------------------------------------
// Concert Log Fields
//---------------------------------------

export interface songEntry {
  title: string;
  CM: string;
  request: boolean;
}

export interface concertLogFields {
  concertType: string;
  bellsAdjusted: boolean;
  songs: songEntry[];
  privateNote: string;
  publicNote: string;
}

//----------------------------------------
// Song Page
//----------------------------------------

export interface songStats {
  performances: number;
  requests: number;
  players: number;
}

export interface playsPerCM {
  [cm: string]: number;
}

export interface songHistory {
  [date: string]: string[];
}

export interface songPageData {
  song: Song;
  stats: songStats;
  playsPerCM: playsPerCM;
  history: songHistory;
}
