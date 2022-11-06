import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { resultTableRowData, Song } from '../typing/types';
import {useState} from 'react'

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


// Example from https://mui.com/material-ui/react-table/

// An ascending comparison function
function ascendingCompare<T>(a: T, b: T, orderBy: keyof T){
    if (a[orderBy] < b[orderBy]) {
        console.log(-1)
        return -1;
    }
    else if (a[orderBy] > b[orderBy]) {
        console.log(1)
        return 1;
    }
    else {
        console.log(0)
        return 0;
    }
}

type Order = 'asc' | 'desc'

// This function gets the compare *function* to use, whether ascend or descend.
// It takes in the order - asc or desc - and the key by which to sort
// Its return type a function that takes in 2 array items and returns a number
function getCompareFunction( 
    order: Order, orderBy: any
) : (
    a: resultTableRowData,
    b: resultTableRowData
) => number {
    return order == 'asc' ?
        (a, b) => ascendingCompare(a, b, orderBy) :
        (a, b) => -ascendingCompare(a, b, orderBy)
    ;
}



/*****************************************************************************
 * ResultsTable
 * 
 * Description:
 *   Reusable component for wherever there is a table of song results.
 *   "Lite" mode shows a shortened list of fields.
*****************************************************************************/
const ResultsTable = (props: {data: resultTableRowData[], lite: boolean}) => {
   // Consider using mui styled() to style the table rows to alternate colors and hide borders
 
    const [orderBy, setOrderBy] = useState("sheet");

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
                    {props.data &&
                    props.data.sort(getCompareFunction('asc', orderBy))
                    .map((rowData, index) => 
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
                            <FormattedCell text = {rowData.title} />
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