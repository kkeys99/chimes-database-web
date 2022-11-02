import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { SongSearchResult, Song } from '../typing/types';

/*****************************************************************************
 * FormattedCell
 * 
 * Description:
 *   Table cell with formatting so we don't have to repeat this formatting
 *   everywhere in the ResultsTable
*****************************************************************************/
const FormattedCell = (props: {text: any}) => {
    return (
        <TableCell align='center'>
            {/* This is cumbersome!!! Try styled */}
            <Typography color="primary.dark" variant="h2">
                {props.text}
            </Typography>               
        </TableCell>
    )
}

const playingStatsFields = ["Available", "You", "Sheet", "Song"];
const playingStatsFieldsFull = ["Available", "Played", "You", "Sheet", "Song", "Composer", 
                        "Arranger", "Genre", "Requests", "Key Sig", "Time Sig", "Tempo", "Added"];


/*****************************************************************************
 * ResultsTable
 * 
 * Description:
 *   Reusable component for wherever there is a table of song results.
 *   "Lite" mode shows a shortened list of fields.
*****************************************************************************/
const ResultsTable = (props: {data: SongSearchResult[], lite: boolean}) => {
   // Consider using mui styled() to style the table rows to alternate colors and hide borders
 

    const headerFields : string[] = (props.lite) ? playingStatsFields : playingStatsFieldsFull;

    console.log(props.data)

    return(
        <TableContainer >
            <Table >
                <TableHead>
                    <TableRow>
                        {headerFields.map((field) =>
                            <TableCell align='center'>
                                <Typography color="primary.dark" variant="h2" fontWeight="bold">
                                    {field}
                                </Typography>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data &&
                    props.data.map((rowData, index) => 
                        <TableRow 
                            sx={{
                                bgcolor:!(index%2) ? "primary.contrastText":"#FFFFFF",
                                border:"hidden"
                            }}
                        >
                            <FormattedCell text = {rowData.song.available} />
                            {!props.lite && <FormattedCell text = {rowData.song.played}/>}
                            <FormattedCell text = {rowData.you} />
                            <FormattedCell text = {rowData.song.sheet} />
                            <FormattedCell text = {rowData.song.title} />
                            {!props.lite && <FormattedCell text = {rowData.song.composer}/>}
                            {!props.lite && <FormattedCell text = {rowData.song.arranger}/>}
                            {!props.lite && <FormattedCell text = {rowData.song.genre}/>}
                            {!props.lite && <FormattedCell text = {rowData.song.requests}/>}
                            {!props.lite && <FormattedCell text = {rowData.song.keysig}/>}
                            {!props.lite && <FormattedCell text = {rowData.song.timesig}/>}
                            {!props.lite && <FormattedCell text = {rowData.song.tempo}/>}
                            {!props.lite && <FormattedCell text = {rowData.song.added}/>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ResultsTable;