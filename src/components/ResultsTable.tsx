import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {PlayingStatsResult} from '../typing/types';


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

// Consider using mui styled() to style the table rows to alternate colors and hide borders

const ResultsTable = (props: {data: PlayingStatsResult[]}) => {
    
    return(
        <TableContainer >
            <Table >
                <TableHead>
                    <TableRow>
                        {playingStatsFields.map((field) =>
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
                            <FormattedCell text = {rowData.you} />
                            <FormattedCell text = {rowData.sheet} />
                            <FormattedCell text = {rowData.song} />
                        </TableRow>
                    )}
                    
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ResultsTable;