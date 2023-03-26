/*
Some utility functions that can be reused
*/

import { Song, SongDisplay } from "../typing/types";

export function date2string(date: string) {
  const monthDict: any = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  const mdy_split = date.split("/");
  const month = mdy_split[0];
  const day = mdy_split[1];
  const year = mdy_split[2];

  return monthDict[month].concat(" ", day, ", ", year);
}

// Convert song tag attribute name to what is shown on screen
export function songFieldToDisplay(field: string) {
  if (!field) {
    return "";
  }
  let result_str = field.replace("_", " ");
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

// Function that separates delimited tags and returns them in a list
export function splitDelimitedTag(data: string) {
  return data.split("|");
}

// Filter out the unneeded fields in DB entity and convert delimited fields to list
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
    date_added: song.dateAdded,
  }
  return displaySong;
}
