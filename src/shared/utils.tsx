/*
Some utility functions that can be reused
*/
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { Song, SongDisplay, Concert } from "../typing/types";

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
export function songDisplayFieldToVar(field: string) {
  if (!field) {
    return "";
  }
  return field.toLowerCase().replaceAll(" ", "_");
}

// Function that separates delimited tags and returns them in a list
export function splitDelimitedTag(data: string) {
  return data.split("|");
}

function dateToDisplaySlash(date: string) {
  const asDate = dayjs(date);
  return asDate.format("M/D/YYYY");
}

// Filter out the unneeded fields in DB entity and convert delimited fields to list
// Changing attribute names so they can work in songFieldToDisplay
export function songToDisplayObj(song: Song) {
  const displaySong: SongDisplay = {
    _id: song.id,
    sheet: splitDelimitedTag(song.location),
    title: song.title,
    composer: splitDelimitedTag(song.composer),
    arranger: splitDelimitedTag(song.arranger),
    genre: splitDelimitedTag(song.genre),
    key: splitDelimitedTag(song.keySignature),
    time_sig: splitDelimitedTag(song.timeSignature),
    tempo: splitDelimitedTag(song.tempo),
    date_added: dateToDisplaySlash(song.dateAdded),
  };
  return displaySong;
}

export function songListToSongDisplayList(songList: Song[]) {
  let songDisplayList: SongDisplay[] = songList.map((song: Song) => {
    return songToDisplayObj(song);
  });
  return songDisplayList;
}

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
