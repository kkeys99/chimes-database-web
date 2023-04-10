import * as React from "react";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// Custom Components
import {ResultsTable, SearchByFieldResults} from "../components/ResultsTable";
// Custom Types
import { Song, SongDisplay, resultTableRowData } from "../typing/types";
import { songToDisplayObj } from "../shared/utils";

interface SearchResultsProps {
    searchBy: string;
    searchData: string;
    newSearch: boolean;
    searchDone: Function;
}

const SearchResults = memo( function SearchResults({searchBy, searchData, newSearch, searchDone} : SearchResultsProps) {

    const [returnedSongs, setReturnedSongs] = useState<SongDisplay []>([]);
    const numResults = returnedSongs.length;
    
    console.log(`Re-rendering Search Results with props ${searchBy} ${searchData} ${newSearch} ${searchDone}`);
    
    useEffect(() => {
        newSearch &&
        fetch(`song/search?title=${searchData}`)
        .then(res => res.json())
        .then(data => {
            // Convert to songDisplay
            let resAsSongDisplay: SongDisplay[] = data.map((song: Song) => {
                return songToDisplayObj(song);
            });
            // Calculate "you"
            // "you" not implemented yet
            setReturnedSongs(resAsSongDisplay);
        });
        searchDone();
    }, [newSearch, searchDone]);

    return(
        <Box sx={{px: 6}}>
            <Typography sx={{py: 3}}>
                {`${numResults} result${(numResults > 1) ? "s" : ""} found`}
            </Typography>
            <ResultsTable data={returnedSongs as resultTableRowData[]} lite={false} />
        </Box>
    )

});

export default SearchResults;