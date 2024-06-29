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

export interface DBSong {
  id: number;
  location: string;
  title: string;
  composer: string;
  arranger: string;
  genre: string;
  requests: number;
  keySignature: string;
  timeSignature: string;
  tempo: string;
  dateAdded: string;
}

// Non backend
export class Song {
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
    date_added: string = ""
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

export interface DBPerfMap {
  _id: number;
  performanceId: number;
  performerId: number;
  performer: Person;
}

export interface DBPerformance {
  _id: number;
  song: DBSong;
  performers: DBPerfMap[];
  isRequest?: boolean;
}

export interface PerformanceFields {
  _id: number;
  song: Song;
  performers: Person[];
  isRequest?: boolean;
}

export class Performance {
  _id: number = 0;
  song: Song = new Song();
  performers: Person[] = [];
  isRequest?: boolean = false;

  constructor(opts: PerformanceFields) {
    Object.assign(this, opts);
  }

  get initialsList() {
    return this.performers.map((person) => {
      return person.initials;
    })
  }
}

export interface DBConcert {
  id: number;
  type: string;
  date: Date;
  bellsAdjusted: boolean;
  notes: string;
  performances: DBPerformance[];
}

export class Concert {
  id: number = 0;
  type: string = "";
  date: Date = new Date();
  bellsAdjusted: boolean = false;
  notes: string = "";
  performances: Performance[] = [];
}

interface PersonFields {
  id: number;
  initials: string;
  firstName: string;
  fullName: string;
  class: string;
  type: string;
  netid: string;
  location: string;
  activeYears: string;
  isCurrent: boolean;
}

export class Person {
  id: number = 0;
  initials: string = "";
  firstName: string = "";
  fullName: string = "";
  class: string = "";
  type: string = "";
  netid: string = "";
  location: string = "";
  activeYears: string = "";
  isCurrent: boolean = false;

  constructor(opts: PersonFields) {
    Object.assign(this, opts);
  }

  get nameInitialsAndYear() {
    return `${this.fullName} (${this.initials} '${this.class})`;
  }
}

//----------------------------------------
// Results Table
//----------------------------------------
export interface resultTableRowData extends Song {
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
  date: string;
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
  song: DBSong;
  stats: songStats;
  playsPerCM: playsPerCM;
  history: songHistory;
}
