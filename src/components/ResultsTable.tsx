import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {SongSearchResult, SongSearchResultLite} from '../typing/types';


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


// Consider using mui styled() to style the table rows to alternate colors and hide borders
const ResultsTable = (props: {data: SongSearchResult[], lite: boolean}) => {
    
    const headerFields : string[] = (props.lite) ? playingStatsFields : playingStatsFieldsFull;

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
                    {props.data.map((rowData, index) => 
                        <TableRow 
                            sx={{
                                bgcolor:!(index%2) ? "primary.contrastText":"#FFFFFF",
                                border:"hidden"
                            }}
                        >
                            <FormattedCell text = {rowData.available} />
                            {!props.lite && <FormattedCell text = {rowData.played}/>}
                            <FormattedCell text = {rowData.you} />
                            <FormattedCell text = {rowData.sheet} />
                            <FormattedCell text = {rowData.song} />
                            {!props.lite && <FormattedCell text = {rowData.composer}/>}
                            {!props.lite && <FormattedCell text = {rowData.arranger}/>}
                            {!props.lite && <FormattedCell text = {rowData.genre}/>}
                            {!props.lite && <FormattedCell text = {rowData.requests}/>}
                            {!props.lite && <FormattedCell text = {rowData.keysig}/>}
                            {!props.lite && <FormattedCell text = {rowData.timesig}/>}
                            {!props.lite && <FormattedCell text = {rowData.tempo}/>}
                            {!props.lite && <FormattedCell text = {rowData.added}/>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ResultsTable;