import * as React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from 'dayjs';

import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Bookmark from "../assets/bookmark.svg";
import { cms, cmStats } from "../constants";
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@mui/material";

import CustomDatePicker from "./CustomDatePicker";

import {
  Song,
  songStats,
  songPageData,
  songHistory,
  playsPerCM,
} from "../typing/types";
import { Dayjs } from "dayjs";
import { SettingsPowerRounded } from "@mui/icons-material";

const useStyles = makeStyles(() => ({
  dateRange: {
    height: 28,
    width: 88,
    backgroundColor: "#E2E2E2",
    borderRadius: 4,
    fontSize: 16,
    textAlign: "center",
  },
}));

// This was necessary for having more control over the shape of the selector
// In the default way, the words were not sitting inside the box.
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: 4,
    padding: "4px 8px",
  },
}));

interface SongTitleProps {
  sheet: string;
  title: string;
}

interface SongInfoProps {
  song: Song;
}

interface SongTagProp {
  tagName: string;
  tagData: string[];
}

interface songStatsProp {
  stats: songStats;
  playsPerCM: playsPerCM;
}

interface historyProp {
  history: songHistory;
}

interface PlayStatsProp {
  stats: songStats;
  playsPerCM: playsPerCM;
  history: songHistory;
}

const SongTitle = ({ sheet, title }: SongTitleProps) => {
  return (
    <Box display="flex" flexDirection="row" sx={{ ml: 12, mt: 12, mb: 8 }}>
      <Typography variant="h2" fontWeight="bold">
        {`${sheet} - ${title}`}
      </Typography>
      {/* <IconButton>
                <Bookmark/>
            </IconButton> */}
      <Box component="img" src={Bookmark} ml={4} />
    </Box>
  );
};

const SongTag = ({ tagName, tagData }: SongTagProp) => {
  return (
    <List
      sx={{ mb: 16 }}
      dense={true}
      subheader={
        <ListSubheader sx={{ fontWeight: "bold", fontSize: 18 }}>
          {tagName}
        </ListSubheader>
      }
    >
      {tagData.map(element => {
        return (
          <ListItem dense={true}>
            <ListItemText primary={element} />
          </ListItem>
        );
      })}
    </List>
  );
};

// The Song info - top left of page
const SongInfo = ({ song }: SongInfoProps) => {
  const tagInfo = {
    Sheet: song.sheet,
    Composer: song.composer,
    Arranger: song.arranger,
    Genre: song.genre,
    Key: song.keysig,
    "Time Signature": song.timesig,
    Tempo: song.tempo,
  };

  return (
    <Stack direction="column">
      <Stack direction="row" spacing={4} ml={8}>
        {Object.entries(tagInfo).map(([key, value]) => {
          return <SongTag tagName={key} tagData={value} />;
        })}
      </Stack>
      <Stack direction="row" spacing={4}>
        Media, Dates, and Sheet PDFs Coming Soon...
      </Stack>
    </Stack>
  );
};



const DayRange = () => {
  const theme = useTheme();
  const firstDay = dayjs('2006-01-01');

  //const [date, setDate] = React.useState<DateRange<Date>>([null, null]);
  const [dateFrom, setFrom] = useState<Dayjs>(firstDay);
  const [dateTo, setTo] = useState<Dayjs>(dayjs());

  const classes = useStyles();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: "", end: "" }}
    >

      <Stack direction="row" sx={{ display: "flex", height: "28px" }}>
        <Box sx={{ mx: 4 }}> from </Box>
        <CustomDatePicker light={false} date={dateFrom} setDate={setFrom} />
        <Box sx={{ mx: 4 }}> to </Box>
        <CustomDatePicker light={false} date={dateTo} setDate={setTo} />
      </Stack>

      {/*
      <DateRangePicker
        inputFormat="MM/dd/yy"
        value={date}
        onChange={newValue => {
          setDate(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField
              {...startProps}
              InputProps={{
                classes: { input: classes.dateRange },
                disableUnderline: true,
              }}
              variant="standard"
            />
            <TextField
              {...endProps}
              InputProps={{
                classes: { input: classes.dateRange },
                disableUnderline: true,
              }}
              variant="standard"
            />
          </React.Fragment>
        )}
      />
      */}
    </LocalizationProvider>
  );
};

// Song stats and plays per CM
const Statistics = ({ stats, playsPerCM }: songStatsProp) => {
  const { performances, requests, players } = stats;

  return (
    <Stack direction="column" mb={4}>
      <Typography sx={{ fontSize: 18 }}>Statistics</Typography>
      <Typography sx={{ fontSize: 12, mt: 2 }}>
        {performances + " " + "Performance" + (performances != 1 ? "s" : "")}
      </Typography>
      <Typography sx={{ fontSize: 12 }}>
        {requests +
          " " +
          "Request" +
          (requests != 1 ? "s" : "") +
          " (" +
          Math.round((requests / performances) * 100) +
          "%)"}
      </Typography>
      <Typography sx={{ fontSize: 12 }}>
        {players + " " + "Player" + (players != 1 ? "s" : "")}
      </Typography>
      {/* List of CMs who have played this song */}
      <List dense={true}>
        {Object.entries(playsPerCM).map(([cm, plays]) => {
          const cmStr =
            plays > 0 ? (
              <ListItem dense={true} sx={{ mb: -4, mt: -2 }}>
                <CircleIcon sx={{ width: 8, color: "#006699", mr: 2 }} />
                <ListItemText
                  sx={{ color: "#006699" }}
                  primary={cm + " (" + plays + ")"}
                />
              </ListItem>
            ) : null;
          return cmStr;
        })}
      </List>
    </Stack>
  );
};

// History of dates played and which CMs
const History = ({ history }: historyProp) => {
  return (
    <Stack direction="column" mb={4} ml={12}>
      <Typography sx={{ fontSize: 18 }}>History</Typography>
      <List dense={true}>
        {Object.entries(history).map(([date, performers]) => {
          // Inspiration from
          // https://stackoverflow.com/questions/61831915/add-new-string-between-every-current-string-in-array
          // Adapted according to reduce spec
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
          const performersStr = performers.reduce(
            (accum, curr, idx) => {
              return idx < performers.length - 1
                ? accum.concat(curr, ", ")
                : accum.concat(curr); // omit the "+"" after the last performer
            },
            "" // Initialize to empty string
          );
          const displayItem = date + ": " + performersStr;
          return (
            <ListItem dense={true} sx={{ mb: -4, mt: -2 }}>
              <CircleIcon sx={{ width: 8, color: "#006699", mr: 2 }} />
              <ListItemText sx={{ color: "#006699" }} primary={displayItem} />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

// The box to the right that contains Stats and History
const PlayStats = ({ stats, playsPerCM, history }: PlayStatsProp) => {
  return (
    <Box>
      <DayRange />
      <Stack direction="row" sx={{ mr: 16, mt: 6 }}>
        <Statistics stats={stats} playsPerCM={playsPerCM} />
        <History history={history} />
      </Stack>
    </Box>
  );
};

const MediaAndDates = () => {
  return <Box></Box>;
};

// The Main Song Page component
const SongPage = () => {
  const { id } = useParams();

  const [data, setData] = useState({} as songPageData);

  // This will prevent it from trying to access attributes that aren't there
  // before the fetching of data is done.
  const [ready, setReady] = useState(false);

  const { song, stats, playsPerCM, history } = data;
  console.log(data);

  useEffect(() => {
    fetch(`/song/${id}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .then(() => setReady(true)); // set this at end so app doesn't try to render before
  }, []);

  if (ready) {
    return (
      <Box>
        <SongTitle sheet={song.sheet[0]} title={song.title} />
        <Stack direction="row" spacing={16}>
          <SongInfo song={song} />
          <PlayStats stats={stats} playsPerCM={playsPerCM} history={history} />
        </Stack>
      </Box>
    );
  } else {
    return (
      <>
        {/* 
        If I put "Loading..." here it looks weird cause it's so fast 
        so I'll leave it blank for now 
        */}
      </>
    );
  }
};

export default SongPage;
