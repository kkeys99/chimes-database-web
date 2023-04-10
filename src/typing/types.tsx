/************************************
 * Types - to use site wide
 */

import dayjs from "dayjs";
import { Dayjs } from "dayjs";

//----------------------------------------
// DB Entity Classes
//----------------------------------------
export class Note {
  public: boolean = false;
  text: string = "";
}

export class Song {
  id: number;
  location: string = "";
  title: string = "";
  composer: string = "";
  arranger: string = "";
  genre: string = "";
  requests: number = 0;
  keySignature: string = "";
  timeSignature: string = "";
  tempo: string = "";
  dateAdded: string = "";
  constructor(
    id: number = 0,
    sheet: string = "",
    title: string = "",
    composer: string = "",
    arranger: string = "",
    genre: string = "",
    requests: number = 0,
    keySignature: string = "",
    timeSignature: string = "",
    tempo: string = "",
    dateAdded: string = "",
  ) {
    this.id = id;
    this.location = sheet;
    this.title = title;
    this.composer = composer;
    this.arranger = arranger;
    this.genre = genre;
    this.requests = requests;
    this.keySignature = keySignature;
    this.timeSignature = timeSignature;
    this.tempo = tempo;
    this.dateAdded = dateAdded;
  }
}


// Non backend
export class SongDisplay {
  _id: number;
  sheet: string[] = [""];
  title: string = "";
  composer: string[] = [""];
  arranger: string[] = [""];
  genre: string[] = [""];
  key: string[] = [""];
  time_sig: string[] = [""];
  tempo: string[] = [""];
  date_added: string = "";
  constructor(
    id: number = 0,
    sheet: string[] = [""],
    title: string = "",
    composer: string[] = [""],
    arranger: string[] = [""],
    genre: string[] = [""],
    key: string[] = [""],
    time_sig: string[] = [""],
    tempo: string[] = [""],
    date_added: string = "",
  ) {
    this._id = id;
    this.sheet = sheet;
    this.title = title;
    this.composer = composer;
    this.arranger = arranger;
    this.genre = genre;
    this.key = key;
    this.time_sig = time_sig;
    this.tempo = tempo;
    this.date_added = date_added;
  }
}

export class Performance {
  _id: number = 0;
  song: Song = new Song();
  isRequest: boolean = false;
  performers: String[] = [];
}

export class Concert {
  id: number = 0;
  type: string = "";
  date: Date = new Date();
  bellsAdjusted: boolean = false;
  notes: string = "";
  performances: Performance[] = [];
}

//----------------------------------------
// Results Table
//----------------------------------------
export interface resultTableRowData extends SongDisplay {
  available?: Dayjs; //  TODO MAKE THIS REQUIRED WHEN ITS ENABLED
  you?: number;
}

export interface searchByFieldRowData {
  tag: string;
  count: number;
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
  date: Dayjs;
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
