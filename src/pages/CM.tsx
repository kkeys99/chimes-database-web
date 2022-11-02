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
import ConcertGrid from "../components/ConcertGrid";
import { Song, SongSearchResult } from "../typing/types";


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


// SOME TEMPORARY PLACEHOLDER DATA FOR "UNPLAYED" SUBPAGE
const song1 = new Song(     
    "A1",
    "Song 1",
    "Bach",
    "AK",
    "Classical",
    1,
    "C Major",
    "4/4",
    "medium",
    "1/1/1",
    "1/1/1",
     10,
)
const dummyData1: SongSearchResult = {
    song: song1,
    you: 1,
}

const song2 = new Song(
    "B2",
    "Song 2",
    "Chopin",
    "KJC",
    "Classical",
    2,
    "C Major",
    "4/4",
    "Medium",
    "2/2/2",
    "2/2/2",
    20,
)
const dummyData2: SongSearchResult = {
    song: song2,
    you: 2,
}


// Container for the "Playing Stats" Tab
function CMPagePlayingStats (props: {initials: string | undefined}) {

    const [data, setData] = useState({solos: [], duets: []});

    useEffect(() => {
        fetch(`/CMs/${props.initials}/stats`)
        .then(res => res.json())
        .then(data => setData(data))
    }, []);

    let solos_data: SongSearchResult[] = [];
    let duets_data: SongSearchResult[] = [];

    // Adds the "you" field, hard codes it to 1. This will probably change
    data.solos.map((perf) => {
        solos_data.push({song: perf, you: 1});
    });
    data.duets.map((perf) => {
        duets_data.push({song: perf, you: 1});
    });

    console.log(solos_data);

    return (
        <>
        <Typography variant="h2" color="primary.dark"
            sx={{pt:'12px', pb:'12px'}}
        >
            This CM has played some concerts and some songs.
        </Typography>  
        <TwoTableBody
            headerLft={`${solos_data.length} Unique solos`}
            headerRt={`${duets_data.length} Unique duets`}
            tableDataLft={solos_data}
            tableDataRt={duets_data}
        />
        </>
    )
}


// Container for the "Concerts" Tab
function CMPageConcerts (props: {initials: string | undefined}) {
    const [data, setData] = useState({concerts: []});

    useEffect(() => {
        fetch(`/CMs/${props.initials}/concerts`)
        .then(res => res.json())
        .then(data => setData(data))
    }, []);

    console.log(data);

    let bodyComponent;
    if (data.concerts.length > 0) {
        bodyComponent = <ConcertGrid concerts={data.concerts}/>
    }
    else {
        bodyComponent = <>No Concerts Found</>
    }

    return (
        <Box sx={{pt:'12px', pb:'12px', pl:'24px', pr:'24px'}}>
            { bodyComponent }
        </Box >
    );
}


// Container for the "Arrangements" Tab
function CMPageArrangements (props: {initials: string | undefined}) {
    const [data, setData] = useState({arrangements: []});

    useEffect(() => {
        fetch(`/CMs/${props.initials}/arrangements`)
        .then(res => res.json())
        .then(data => setData(data))
    }, []);

    let arr_data: SongSearchResult[] = [];

    // Add "you" field. Hard codes to 1 for now
    data.arrangements.map((perf) => {
        arr_data.push({song: perf, you: 1})
    })

    return (
        <Box sx={{pt:'12px', pb:'12px', pl:'24px', pr:'24px'}}>
            <ResultsTable data={arr_data} lite={false}/>
        </Box >
    );
}


// Container for the "Unplayed Songs" Tab
function CMPageUnplayedSongs (props: {initials: string | undefined}) {

    return (
        <>
        WAITING ON BACKEND - DISREGARD FOR DEMO
        <TwoTableBody
            headerLft={"2 Unplayed solos"}
            headerRt={"2 Unplayed duets"}
            tableDataLft={[dummyData1, dummyData2]}
            tableDataRt={[dummyData2, dummyData1]}
        />
        </>
    );
}


// Container for the "Requests" Tab
function CMPageRequests (props: {initials: string | undefined}) {

    const [data, setData] = useState({solos: [], duets: []});

    useEffect(() => {
        fetch(`/CMs/${props.initials}/requests`)
        .then(res => res.json())
        .then(data => setData(data))
    }, []);

    let solos_data: SongSearchResult[] = [];
    let duets_data: SongSearchResult[] = [];

    // Add "you" field. Hard codes to 1 for now
    if (data.solos) {
        data.solos.map((perf) => {
            solos_data.push({song: perf, you: 1});
        });
    }
    if (data.duets) {
        data.duets.map((perf) => {
            duets_data.push({song: perf, you: 1});
        });
    }

    return (
        <>
        <TwoTableBody
            headerLft={`${solos_data.length} Requested Unique solos`}
            headerRt={`${duets_data.length} Requested Unique duets`}
            tableDataLft={solos_data}
            tableDataRt={duets_data}
        />
        </>
    )
}


// Container for the Body of the CM Page
function CM () {
    const [data, setData] = useState({text: ""});

    // Setter gets passed to header component
    // and used for on-click listener.
    // Might be a misnomer because we also are
    // re-rendering the header to do the color change.
    const [subPage, setSubPage] = useState("Playing stats"); // TODO: Hard-coding this is not robust
                                                            // Prone to typos.
                                                            // Consider using indices on global var?

    // This hook lets us get params from HTTP req
    const {initials} = useParams();

    useEffect(() => {
        fetch(`/CMs/${initials}/initials`)
        .then(res => res.json())
        .then(data => setData(data))
    }, []);

    const name: string = data.text;

    // Switch body components based on state
    let bodyComponent;
    switch (subPage) {
        case "Playing stats": {
            bodyComponent = <CMPagePlayingStats initials={initials}/>;
            break;
        }
        case "Concerts": {
            bodyComponent = <CMPageConcerts initials={initials}/>;
            break;
        }
        case "Arrangements": {
            bodyComponent = <CMPageArrangements initials={initials}/>;
            break; 
        }
        case "Unplayed songs": {
            bodyComponent = <CMPageUnplayedSongs initials={initials}/>;
            break;
        }
        case "Requests": {
            bodyComponent = <CMPageRequests initials={initials}/>;
            break;
        }
        default: {
            bodyComponent = <CMPagePlayingStats initials={initials}/>;
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