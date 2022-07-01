import * as React from "react";
import theme from "../theme";
import { useTheme } from "@mui/material/styles";
import {useParams} from "react-router-dom";
import {useState, useEffect} from 'react'
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
// Custom Components
import ResultsTable from "../components/ResultsTable"
import { PlayingStatsResult } from "../typing/types";


// Header of the CM Page
function CMPageHeader (props: {name: string}) {
    const intraPageFields = [
        "Playing Stats",
        "Concerts",
        "Arrangements",
        "Unplayed Songs",
        "Requests",
    ];    
    return (
        <>
        <Typography 
            color="primary.dark" variant="h2" fontWeight="bold"
            sx={{pb:'12px'}}
        >
            {props.name}
        </Typography>
        <Stack 
            direction="row" 
            spacing={3}
            sx={{pb:'12px'}}    
        >
            {intraPageFields.map((field) => {
                return(
                    <Typography color="primary.dark" variant="h2" fontWeight="bold">
                        {field}
                    </Typography>
                )
            })}
        </Stack>
        </>
    );
}


// Container for the "Playing Stats" Tab
function CMPagePlayingStats (props: {name: string}) {
    
    const dummyData1: PlayingStatsResult = {
        available: "1/1/1",
        you: 1,
        sheet: "A1",
        song: "Song 1"
    }

    const dummyData2 = {
        available: "2/2/2",
        you: 2,
        sheet: "A2",
        song: "Song 2"
    }

    return (
        <>
        <Typography variant="h2" color="primary.dark"
            sx={{pt:'12px', pb:'12px'}}
        >
            This CM has played some concerts and some songs.
        </Typography>
        
        <Stack 
            direction="row" 
            divider={<Divider orientation="vertical"  flexItem/>}
            spacing={2}
        >
            <Box>
                <Typography variant="h2" color="primary.dark" fontWeight="bold"
                    sx={{pt:'12px', pb:'12px'}}
                >
                    ### Unique solos
                </Typography>
                <ResultsTable data={[dummyData1, dummyData2]}/>
            </Box>
            <Box>
                <Typography variant="h2" color="primary.dark" fontWeight="bold"
                    sx={{pt:'12px', pb:'12px'}}
                >
                    ### Unique duets
                </Typography>
                <ResultsTable data={[dummyData2, dummyData1]}/>
            </Box>
        </Stack>
        </>
    )
}


// Container for the Body of the CM Page
function CM () {
    const [data, setData] = useState({text: ""});

    // This hook lets us get params from HTTP req
    let {initials} = useParams();

    useEffect(() => {
        fetch(`/CMs/${initials}`)
        .then(res => res.json())
        .then(data => setData(data))
    }, []);

    const name: string = data.text;

    return (
        <Box sx={{pt:'12px', pl:'24px'}}>
            <CMPageHeader name={name} />
            <CMPagePlayingStats name={name}/>
        </Box >
    );
}


export default CM;