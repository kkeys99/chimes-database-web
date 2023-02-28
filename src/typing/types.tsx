//---------------------------------------
// Table Results
//---------------------------------------

import { getTextOfJSDocComment } from "typescript";

// Concert - Related Classes
export class Note {
  public: boolean = false;
  text: string = "";
}

export class Song {
  sheet: string = "";
  title: string = "";
  composer: string = "";
  arranger: string = "";
  genre: string = "";
  requests: number = 0;
  keysig: string = "";
  timesig: string = "";
  tempo: string = "";
  added: string = "";
  available: string = "";
  played: number = 0;
  constructor(
    sheet: string = "",
    title: string = "",
    composer: string = "",
    arranger: string = "",
    genre: string = "",
    requests: number = 0,
    keysig: string = "",
    timesig: string = "",
    tempo: string = "",
    added: string = "",
    available: string = "",
    played: number = 0
  ) {
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

// CM Page results
// CM Page Playing Results
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
