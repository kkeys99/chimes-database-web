import * as React from "react";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import {
  useSearchParams,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import { useState, useEffect, memo } from "react";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// Custom Components
import { ResultsTable, SearchByFieldResults } from "../components/ResultsTable";
// Custom Types
import { Song, SongDisplay, resultTableRowData } from "../typing/types";
import { songListToSongDisplayList } from "../shared/utils";
import logger from "../shared/logger";


interface SearchResultsProps {
  newSearch: boolean;
  searchDone: Function;
}

const SearchResults = memo(function SearchResults({
  newSearch,
  searchDone,
}: SearchResultsProps) {
  const name = "Search Results";
  logger.log(name, `Render`, logger.logLevel.INFO);

  const location = useLocation();
  const searchParams = createSearchParams(location.search);
  //const [searchParams, setSearchParams] = useSearchParams();
  /* NOTE: For some reason, using the useSearchParams hook would make this re-render
   * every time the search bar was edited. I don't yet know why this is.
   * Using useLocation's search attribute seems to do the trick.
   */

  const [returnedSongs, setReturnedSongs] = useState<SongDisplay[]>([]);
  const numResults = returnedSongs.length;

  useEffect(() => {
    newSearch &&
      fetch(
        `song/search?${searchParams.get("searchBy")}=${searchParams.get("q")}`
      )
        //fetch(`song/search?${searchParams["searchBy"]}=${searchParams["q"]}`)
        .then(res => res.json())
        .then(data => {
          // Convert to songDisplay
          const resAsSongDisplay = songListToSongDisplayList(data);
          // Calculate "you"
          // "you" not implemented yet
          setReturnedSongs(resAsSongDisplay);
        });
    searchDone();
  }, [newSearch]);

  return (
    <Box sx={{ px: 6 }}>
      <Typography sx={{ py: 3 }}>
        {`${numResults} result${numResults > 1 ? "s" : ""} found`}
      </Typography>
      <ResultsTable data={returnedSongs as resultTableRowData[]} lite={false} />
    </Box>
  );
});

export default SearchResults;
