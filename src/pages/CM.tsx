import * as React from "react";
import theme from "../theme";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";
// Custom Components
import { ResultsTable } from "../components/ResultsTable";
import ConcertGrid from "../components/ConcertGrid";
import { Person, Song, SongDisplay, resultTableRowData } from "../typing/types";
import { sortConcertsByDate, songListToSongDisplayList } from "../shared/utils";
import logger from "../shared/logger";

const intraPageFields = [
  "Playing stats",
  "Concerts",
  "Arrangements",
  "Unplayed songs",
  "Requests",
];

// Header of the CM Page
function CMPageHeader(props: {
  displayName: string;
  currentPage: number;
  setSubPage: any;
}) {
  return (
    <>
      <Typography
        color="primary.dark"
        variant="h2"
        fontWeight="bold"
        sx={{ pb: "12px" }}
      >
        {props.displayName}
      </Typography>
      <Stack
        direction="row"
        spacing={8} // This is the same as 64px because theme default spacing factor is 8
        sx={{ pb: "12px" }}
      >
        {intraPageFields.map((pageName, index) => {
          return (
            <Typography
              component={ButtonBase}
              color={
                props.currentPage == index ? "primary.main" : "primary.dark"
              }
              variant="h2"
              fontWeight="bold"
              onClick={() => props.setSubPage(index)}
            >
              {pageName}
            </Typography>
          );
        })}
      </Stack>
    </>
  );
}

// Instantiable component for where there are two ResultsTables side by side
// Used in Playing Stats, Unplayed Songs, and Requests views of the CM Page
function TwoTableBody(props: {
  headerLft: string;
  headerRt: string;
  tableDataLft: resultTableRowData[];
  tableDataRt: resultTableRowData[];
}) {
  return (
    <Box sx={{ width: 1 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ width: 1 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h2"
            color="primary.dark"
            fontWeight="bold"
            sx={{ pt: "12px", pb: "12px" }}
          >
            {props.headerLft}
          </Typography>
          <ResultsTable data={props.tableDataLft} lite={true} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h2"
            color="primary.dark"
            fontWeight="bold"
            sx={{ pt: "12px", pb: "12px" }}
          >
            {props.headerRt}
          </Typography>
          <ResultsTable data={props.tableDataRt} lite={true} />
        </Box>
      </Stack>
    </Box>
  );
}

// Container for the "Playing Stats" Tab
function CMPagePlayingStats(props: { initials: string | undefined }) {
  const [data, setData] = useState({ solos: [], duets: [] });

  useEffect(() => {
    fetch(`/CMs/${props.initials}/stats`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [props.initials]);

  return (
    <>
      <Typography
        variant="h2"
        color="primary.dark"
        sx={{ pt: "12px", pb: "12px" }}
      >
        This CM has played some concerts and some songs.
      </Typography>
      <TwoTableBody
        headerLft={`${data.solos.length} Unique solos`}
        headerRt={`${data.duets.length} Unique duets`}
        tableDataLft={data.solos}
        tableDataRt={data.duets}
      />
    </>
  );
}

// Container for the "Concerts" Tab
function CMPageConcerts(props: {
  initials: string | undefined;
  logEdit: Function;
}) {
  const [data, setData] = useState({ concerts: [] });

  useEffect(() => {
    fetch(`/CMs/${props.initials}/concerts`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [props.initials]);

  const concertsByDate = sortConcertsByDate(data.concerts);

  return (
    <Box sx={{ pt: "12px", pb: "12px", pl: "24px", pr: "24px" }}>
      <ConcertGrid concertsByDate={concertsByDate} logEdit={props.logEdit} />
    </Box>
  );
}

// Container for the "Arrangements" Tab
function CMPageArrangements(props: { initials: string | undefined }) {
  const [data, setData] = useState<resultTableRowData[]>([]);

  useEffect(() => {
    console.log("Fetch arrangements");
    fetch(`/song/search?arranger=${props.initials}`)
      .then(res => res.json())
      .then(data => {
        // Convert to songDisplay
        const resAsSongDisplay = songListToSongDisplayList(data);
        // Calculate "you"
        // "you" not implemented yet
        setData(resAsSongDisplay);
      });
  }, [props.initials]);

  return (
    <Box sx={{ pt: "12px", pb: "12px", pl: "24px", pr: "24px" }}>
      <ResultsTable data={data} lite={false} />
    </Box>
  );
}

// Container for the "Unplayed Songs" Tab
function CMPageUnplayedSongs(props: { initials: string | undefined }) {
  // SOMEHOW MAKE DB RETURN YOU FIELD AS 0 SO NO NEED FOR A NEW INTERFACE

  return (
    <>
      THIS DOES NOT WORK YET
      <TwoTableBody
        headerLft={"0 Unplayed solos"}
        headerRt={"0 Unplayed duets"}
        tableDataLft={[]}
        tableDataRt={[]}
      />
    </>
  );
}

// Container for the "Requests" Tab
function CMPageRequests(props: { initials: string | undefined }) {
  const [data, setData] = useState({ solos: [], duets: [] });

  useEffect(() => {
    fetch(`/CMs/${props.initials}/requests`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [props.initials]);

  return (
    <>
      <TwoTableBody
        headerLft={`${data.solos.length} Requested Unique solos`}
        headerRt={`${data.duets.length} Requested Unique duets`}
        tableDataLft={data.solos}
        tableDataRt={data.duets}
      />
    </>
  );
}

/********************************************************
 * Component: CM
 *
 * - Top level component of the CM Page
 ********************************************************/
interface CMPageProps {
  // c/b func that puts the concert log in edit mode
  logEdit: Function;
}

function CM({ logEdit }: CMPageProps) {
  const name = "CM Page";
  logger.log(name, `Render`, logger.logLevel.INFO);

  // State variables
  const [thisCM, setThisCM] = useState<Person>({} as Person);
  const [subPage, setSubPage] = useState(0);
  const { initials } = useParams(); // This hook lets us get params from HTTP req
  logger.log(name, `Initials: ${initials}`, logger.logLevel.INFO);

  useEffect(() => {
    // Get the Person
    const fetchStr = `/person/initials/${initials}`;
    logger.log(name, `fetching Person from DB`, logger.logLevel.DEBUG);
    logger.printObj(fetchStr, logger.logLevel.DEBUG);
    fetch(fetchStr)
      .then(res => res.json())
      .then(data => setThisCM(new Person(data[0])));
    // Get the Played Songs
  }, [initials]);

  // Switch body components based on state
  let bodyComponent;
  switch (subPage) {
    // Playing stats
    case 0: {
      bodyComponent = <CMPagePlayingStats initials={initials} />;
      break;
    }
    // Concerts
    case 1: {
      bodyComponent = <CMPageConcerts initials={initials} logEdit={logEdit} />;
      break;
    }
    // Arrangements
    case 2: {
      bodyComponent = <CMPageArrangements initials={initials} />;
      break;
    }
    // Unplayed songs
    case 3: {
      bodyComponent = <CMPageUnplayedSongs initials={initials} />;
      break;
    }
    // Requests
    case 4: {
      bodyComponent = <CMPageRequests initials={initials} />;
      break;
    }
    // Default -- should not enter this
    default: {
      logger.log(
        name,
        `ENTERED DEFAULT ON SUBPAGE. THIS IS UNEXPECTED`,
        logger.logLevel.ERROR
      );
      bodyComponent = <CMPagePlayingStats initials={initials} />;
      break;
    }
  }
  logger.log(
    name,
    `Sub page is ${intraPageFields[subPage]}`,
    logger.logLevel.DEBUG
  );

  return (
    <Box sx={{ pt: "12px", pb: "12px", pl: "24px", pr: "24px" }}>
      <CMPageHeader
        displayName={thisCM.nameInitialsAndYear}
        currentPage={subPage}
        setSubPage={setSubPage}
      />
      {bodyComponent}
    </Box>
  );
}

export default CM;
