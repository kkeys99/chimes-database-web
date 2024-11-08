/*
Some utility functions that can be reused
*/
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { DBSong, Song, DBConcert, Concert, DBPerformance, Performance, PerformanceFields } from "../typing/types";

/********************************
 * Date Processing
 ********************************/

// Use this to convert hash key to date display - SUPER JANKY MAKE IT BETTER
export function dateHashToDisplayStr(dateHash: number): string {
  const dateStr = dateHash.toString();
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6); // month is already adjusted to 1-indexed value
  const day = dateStr.substring(6);
  const dateObj = dayjs(`${year}-${month}-${day}`, "YYYY-MM-DD", true);
  return dateObj.format("MMMM D, YYYY");
}

// Use this for sorting/indexing concert data by dates
export function dateToHash(date: Date): number {
  return (
    date.getFullYear() * 10000 +
    (date.getMonth() + 1) * 100 + // plus 1 because months index from 0
    date.getDate()
  );
}

/********************************
 * Song Processing
 ********************************/

// Function that separates delimited tags and returns them in a list
function splitDelimitedTag(data: string) {
  return data.split("|");
}

// Helper function that converts date string to a display-friendly string
function dateToDisplaySlash(date: string) {
  const asDate = dayjs(date);
  return asDate.format("M/D/YYYY");
}

// Filter out the unneeded fields in DB entity and convert delimited fields to list
// Changing attribute names so they can work in songFieldToDisplay
export function DBSong2FESong(dbSong: DBSong) {
  const feSong: Song = {
    _id: dbSong.id,
    sheet: splitDelimitedTag(dbSong.location),
    title: dbSong.title,
    composer: splitDelimitedTag(dbSong.composer),
    arranger: splitDelimitedTag(dbSong.arranger),
    genre: splitDelimitedTag(dbSong.genre),
    key: splitDelimitedTag(dbSong.keySignature),
    time_sig: splitDelimitedTag(dbSong.timeSignature),
    tempo: splitDelimitedTag(dbSong.tempo),
    date_added: dateToDisplaySlash(dbSong.dateAdded),
  };
  return feSong;
}

export function DBSongList2FESongList(dbSongList: DBSong[]) {
  let feSongList: Song[] = dbSongList.map((song: DBSong) => {
    return DBSong2FESong(song);
  });
  return feSongList;
}

// Convert song tag attribute name to what is shown on screen
export function songFieldToDisplay(field: string) {
  if (!field) {
    return "";
  }
  let result_str = field.replaceAll("_", " ");
  result_str = result_str[0].toUpperCase() + result_str.substring(1);
  for (let i = 1; i < result_str.length; i++) {
    if (result_str[i - 1] === " ") {
      try {
        // In case the character is not a letter - YouTube Link
        result_str =
          result_str.substring(0, i) +
          result_str[i].toUpperCase() +
          result_str.substring(i + 1);
      } catch {
        // Do nothing
      }
    }
  }
  return result_str;
}

// Convert on-screen tag attribute name to variable name
export function songFieldToVar(field: string) {
  if (!field) {
    return "";
  }
  return field.toLowerCase().replaceAll(" ", "_");
}

/********************************
 * Performance Processing
 ********************************/

export function DBPerf2FEPerf(dbPerf: DBPerformance) {
  const fePerfParams: PerformanceFields = {
    ...dbPerf,
    performers: dbPerf.performers.map((p) => { return p.performer}),
    song: DBSong2FESong(dbPerf.song)
  }
  const fePerf: Performance = new Performance(fePerfParams);
  return fePerf;
}

export function DBPerfList2FEPerfList(dbPerfList: DBPerformance[]) {
  const fePerfList: Performance[] = dbPerfList.map((dbPerf: DBPerformance) => {
    return DBPerf2FEPerf(dbPerf);
  })
  return fePerfList;
}

/********************************
 * Concert Processing
 ********************************/

export function DBConcert2FEConcert(dbConcert: DBConcert) {
  const feConcert: Concert = {
    ...dbConcert,
    performances: DBPerfList2FEPerfList(dbConcert.performances)
  }
  return feConcert;
}

export function DBConcertList2FEConcertList(dbConcertList: DBConcert[]) {
  const feConcertList: Concert[] = dbConcertList.map((dbConcert: DBConcert) => {
    return DBConcert2FEConcert(dbConcert);
  });

  return feConcertList;
}

export function sortConcertsByDate(concerts: Concert[]) {
  let concertsByDate: { [key: number]: Concert[] } = {};
  concerts.map(concert => {
    const dateHash = dateToHash(new Date(concert.date));
    if (dateHash in concertsByDate) {
      concertsByDate[dateHash].push(concert);
    } else {
      concertsByDate[dateHash] = [concert];
    }
  });
  return concertsByDate;
}


