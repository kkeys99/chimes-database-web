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
import ButtonBase from "@mui/material/ButtonBase";
// Custom Components
import ResultsTable from "../components/ResultsTable"
import { SongSearchResult } from "../typing/types";


// Header of the CM Page
function CMPageHeader (props: {name: string, currentPage: string, renderSubPage: any}) {
    const intraPageFields = [
        "Playing stats",
        "Concerts",
        "Arrangements",
        "Unplayed songs",
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
            spacing={8} // This is the same as 64px because theme default spacing factor is 8
            sx={{pb:'12px'}}    
        >
            {intraPageFields.map((field) => {
                return(
                    <Typography component={ButtonBase} 
                        color={(props.currentPage==field) ? "primary.main" : "primary.dark"}
                        variant="h2" fontWeight="bold"
                        onClick={() => props.renderSubPage(field)}
                    >
                        {field}
                    </Typography>
                )
            })}
        </Stack>
        </>
    );
}

// Instantiable component for where there are two ResultsTables side by side
// Used in Playing Stats, Unplayed Songs, and Requests views of the CM Page
function TwoTableBody (props: {headerLft: string, headerRt: string, 
        tableDataLft: SongSearchResult[], tableDataRt: SongSearchResult[]}) 
{
    return (    
        <Box sx={{width:1}}>  
            <Stack 
                direction="row" 
                divider={<Divider orientation="vertical"  flexItem/>}
                spacing={2}
                sx={{width:1}}
            >
                <Box sx={{flexGrow: 1}}>
                    <Typography variant="h2" color="primary.dark" fontWeight="bold"
                        sx={{pt:'12px', pb:'12px'}}
                    >
                        {props.headerLft}
                    </Typography>
                    <ResultsTable data={props.tableDataLft} lite={true}/>
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <Typography variant="h2" color="primary.dark" fontWeight="bold"
                        sx={{pt:'12px', pb:'12px'}}
                    >
                        {props.headerRt}
                    </Typography>
                    <ResultsTable data={props.tableDataRt} lite={true}/>
                </Box>
            </Stack>
        </Box>
    )
}

// SOME TEMPORARY PLACEHOLDER DATA
const dummyData1: SongSearchResult = {
    available: "1/1/1",
    played: 10,
    you: 1,
    sheet: "A1",
    song: "Song 1",
    composer: "Bach",
    arranger: "AK",
    genre: "Classical",
    requests: 1,
    keysig: "C Major",
    timesig: "4/4",
    tempo: "medium",
    added: "1/1/1"
}

const dummyData2: SongSearchResult = {
    available: "2/2/2",
    played: 20,
    you: 2,
    sheet: "B2",
    song: "Song 2",
    composer: "Chopin",
    arranger: "KJC",
    genre: "Classical",
    requests: 2,
    keysig: "C Major",
    timesig: "4/4",
    tempo: "Medium",
    added: "2/2/2"
}

// Container for the "Playing Stats" Tab
function CMPagePlayingStats (props: {name: string}) {

    console.log("PLAYING STATS")
    return (
        <>
        <Typography variant="h2" color="primary.dark"
            sx={{pt:'12px', pb:'12px'}}
        >
            This CM has played some concerts and some songs.
        </Typography>       
        <TwoTableBody
            headerLft={"### Unique solos"}
            headerRt={"### Unique duets"}
            tableDataLft={[dummyData1, dummyData2]}
            tableDataRt={[dummyData2, dummyData1]}
        />
        </>
    )
}


// Container for the "Playing Stats" Tab
function CMPageConcerts (props: {name: string}) {
    return (
        <>
        Concerts
        </>
    );
}


// Container for the "Playing Stats" Tab
function CMPageArrangements (props: {name: string}) {
    return (
        <>
        <ResultsTable data={[dummyData1, dummyData2]} lite={false}/>
        </>
    );
}


// Container for the "Playing Stats" Tab
function CMPageUnplayedSongs (props: {name: string}) {

    return (
        <>
        <TwoTableBody
            headerLft={"### Unplayed solos"}
            headerRt={"### Unplayed duets"}
            tableDataLft={[dummyData1, dummyData2]}
            tableDataRt={[dummyData2, dummyData1]}
        />
        </>
    );
}


// Container for the "Playing Stats" Tab
function CMPageRequests (props: {name: string}) {

    return (
        <>
        <TwoTableBody
            headerLft={"### Requested unique solos"}
            headerRt={"### Requested unique duets"}
            tableDataLft={[dummyData1, dummyData2]}
            tableDataRt={[dummyData2, dummyData1]}
        />
        </>
    );
}


// Container for the Body of the CM Page
function CM () {
    const [data, setData] = useState({text: ""});
    const [subPage, setSubPage] = useState("Playing stats"); // TODO: Hard-coding this is not robust
                                                            // Consider using indices on global var

    // This hook lets us get params from HTTP req
    let {initials} = useParams();

    useEffect(() => {
        fetch(`/CMs/${initials}`)
        .then(res => res.json())
        .then(data => setData(data))
    }, []);

    const name: string = data.text;

    // Switch body components based on state
    let bodyComponent;
    switch (subPage) {
        case "Playing stats": {
            bodyComponent = <CMPagePlayingStats name={name}/>;
            break;
        }
        case "Concerts": {
            bodyComponent = <CMPageConcerts name={name}/>;
            break;
        }
        case "Arrangements": {
            bodyComponent = <CMPageArrangements name={name}/>;
            break; 
        }
        case "Unplayed songs": {
            console.log("UNPLAYED");
            bodyComponent = <CMPageUnplayedSongs name={name}/>;
            break;
        }
        case "Requests": {
            bodyComponent = <CMPageRequests name={name}/>;
            break;
        }
        default: {
            bodyComponent = <CMPagePlayingStats name={name}/>;
            break;
        }
    }

    return (
        <Box sx={{pt:'12px', pb:'12px', pl:'24px', pr:'24px'}}>
            <CMPageHeader name={name} currentPage={subPage} renderSubPage={setSubPage}/>
            {bodyComponent}
        </Box >
    );
}


export default CM;