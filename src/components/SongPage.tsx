import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Bookmark from "../assets/bookmark.svg";
import { cms, cmStats } from "../constants";
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@mui/material";

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

interface SongTagProp {
  tagName: string;
  tagData: string[];
}

interface SingleStat {
  statName: string;
  stat: number;
}

interface PlayingStatsProp {
  playingStats: {
    numPerformances: SingleStat;
    numRequests: SingleStat;
    numPlayers: SingleStat;
  };
}

const SongTitle = () => {
  return (
    <Box display="flex" flexDirection="row" sx={{ ml: 12, mt: 12, mb: 8 }}>
      <Typography variant="h2" fontWeight="bold">
        DT312 - La La Land
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

const SongInfo = () => {
  const tagInfo = {
    Sheet: ["DT312", "DT313", "DT314", "DT315"],
    Composer: ["Jason Hurwitz"],
    Arranger: ["Julia King"],
    Genre: ["Movie", "Show Music"],
    Key: ["C Major", "F Major", "D Major", "G Major"],
    "Time Signature": ["3/4", "4/4"],
    Tempo: ["Fast"],
  };

  return (
    <Stack direction="column">
      <Stack direction="row" spacing={4} ml={8}>
        {Object.entries(tagInfo).map(([key, value]) => {
          return <SongTag tagName={key} tagData={value} />;
        })}
      </Stack>
      <Stack direction="row" spacing={4}>
        yo
      </Stack>
    </Stack>
  );
};

const DayRange = () => {
  const [date, setDate] = React.useState<DateRange<Date>>([null, null]);
  const classes = useStyles();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: "", end: "" }}
    >
      <DateRangePicker
        inputFormat="MM/dd/yy"
        value={date}
        onChange={newValue => {
          setDate(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <Box sx={{ mx: 4 }}> from </Box>
            <TextField
              {...startProps}
              InputProps={{
                classes: { input: classes.dateRange },
                disableUnderline: true,
              }}
              variant="standard"
            />
            <Box sx={{ mx: 4 }}> to </Box>
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
    </LocalizationProvider>
  );
};

const Statistics = ({ playingStats }: PlayingStatsProp) => {
  const { numPerformances, numRequests, numPlayers } = playingStats;

  return (
    <Stack direction="column" mb={4}>
      <Typography sx={{ fontSize: 18 }}>Statistics</Typography>
      <Typography sx={{ fontSize: 12, mt: 2 }}>
        {numPerformances.stat +
          " " +
          numPerformances.statName +
          (numPerformances.stat > 1 ? "s" : "")}
      </Typography>
      <Typography sx={{ fontSize: 12 }}>
        {numRequests.stat +
          " " +
          numRequests.statName +
          (numRequests.stat > 1 ? "s" : "") +
          " (" +
          Math.round((numRequests.stat / numPerformances.stat) * 100) +
          "%)"}
      </Typography>
      <Typography sx={{ fontSize: 12 }}>
        {numPlayers.stat +
          " " +
          numPlayers.statName +
          (numPlayers.stat > 1 ? "s" : "")}
      </Typography>
      <List dense={true}>
        {cmStats.chimesmasters.map(element => {
          const findSong = element.songs.filter(e => e.song === "La La Land");
          const cmStr =
            findSong.length > 0 ? (
              <ListItem dense={true} sx={{ mb: -4, mt: -2 }}>
                <CircleIcon sx={{ width: 8, color: "#006699", mr: 2 }} />
                <ListItemText
                  sx={{ color: "#006699" }}
                  primary={
                    element.name + " (" + findSong[0].stats.performed + ")"
                  }
                />
              </ListItem>
            ) : null;
          return cmStr;
        })}
      </List>
    </Stack>
  );
};

const History = () => {
  const getDates = () => {
    let dates: string[] = [];
    cmStats.chimesmasters.map(cm => {
      const specificSong = cm.songs.filter(e => e.song === "La La Land");
      if (specificSong.length > 0) {
        specificSong[0].stats.date.map(day => {
          dates.push(day + ": " + cm.name);
        });
      }
    });
    return dates;
  };

  return (
    <Stack direction="column" mb={4} ml={12}>
      <Typography sx={{ fontSize: 18 }}>History</Typography>
      <List dense={true}>
        {getDates().map(element => {
          return (
            <ListItem dense={true} sx={{ mb: -4, mt: -2 }}>
              <CircleIcon sx={{ width: 8, color: "#006699", mr: 2 }} />
              <ListItemText sx={{ color: "#006699" }} primary={element} />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
};

const PlayStats = () => {
  const statistics = {
    numPerformances: {
      statName: "Perforamance",
      stat: 2,
    },
    numRequests: {
      statName: "Request",
      stat: 1,
    },
    numPlayers: {
      statName: "Player",
      stat: 2,
    },
  };

  return (
    <Box position="fixed" right={30}>
      <DayRange />
      <Stack direction="row" sx={{ mr: 16, mt: 6 }}>
        <Statistics playingStats={statistics} />
        <History />
      </Stack>
    </Box>
  );
};

const MediaAndDates = () => {
  return <Box></Box>;
};

const SongPage = () => {
  return (
    <Box>
      <SongTitle />
      <Stack direction="row">
        <SongInfo />
        <PlayStats />
        {/* <MediaAndDates/> */}
      </Stack>
    </Box>
  );
};

export default SongPage;
