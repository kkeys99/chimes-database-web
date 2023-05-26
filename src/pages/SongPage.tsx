import * as React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";

import Bookmark from "../assets/bookmark.svg";
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { songFieldToDisplay, songToDisplayObj } from "../shared/utils";
import CustomDatePicker from "../components/CustomDatePicker";

import {
  Song,
  SongDisplay,
  songStats,
  songPageData,
  songHistory,
  playsPerCM,
} from "../typing/types";
import { Dayjs } from "dayjs";

//https://stackoverflow.com/questions/51419176/how-to-get-a-subset-of-keyof-t-whose-value-tk-are-callable-functions-in-typ
// Making a type of list fields so checking for length doesn't error out when you remove items
type KeyOfType<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
type ListTags = KeyOfType<SongDisplay, string[]>;

interface SongTitleProps {
  sheet: string;
  title: string;
}

interface SongInfoProps {
  song: SongDisplay;
  isEditMode: boolean;
  removeFieldListItem: Function;
  addFieldListItem: Function;
  editFieldListItem: Function;
}

interface SingleSongTagProp {
  tagName: keyof SongDisplay | string; // temp hack for now
  tagData: string;
}

interface SongTagProp {
  tagName: keyof SongDisplay;
  tagData: string[];
}

interface EditSongTagProp extends SongTagProp {
  removeFieldListItem: Function;
  addFieldListItem: Function;
  editFieldListItem: Function;
}

interface EditSongTagItemProp extends EditSongTagProp {
  index: number;
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
    <Box display="flex" flexDirection="row">
      <Typography variant="h2" fontWeight="bold">
        {`${sheet} - ${title}`}
      </Typography>
      {/* TODO LATER - Make this bookmark functional */}
      <Box component="img" src={Bookmark} ml={4} />
    </Box>
  );
};

const ListSongTag = ({ tagName, tagData }: SongTagProp) => {
  return (
    <Box flexShrink={0}>
      <Typography variant="h2">{songFieldToDisplay(tagName)}</Typography>
      <List dense={true}>
        {tagData &&
          tagData.map(element => {
            return (
              <ListItem dense disableGutters>
                <ListItemText primary={element} />
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

const SingleSongTag = ({ tagName, tagData }: SingleSongTagProp) => {
  return (
    <Box flexShrink={0}>
      <Typography variant="h2">{songFieldToDisplay(tagName)}</Typography>
      {/* Hacks! This is a list of one item just so the spacing can be the same as list fields */}
      <List dense={true}>
        <ListItem dense disableGutters>
          <ListItemText primary={tagData} />
        </ListItem>
      </List>
    </Box>
  );
};

interface LogIconProps {
  children: any;
  clickHandler?: React.MouseEventHandler | null;
}

// A simple component that's basically a styled icon button
// TODO - change this to styled API maybe?
const EditFieldIconButton = ({
  children,
  clickHandler = null,
}: LogIconProps) => {
  return (
    <IconButton
      disableRipple
      sx={{ p: 0 }}
      onClick={e => {
        if (clickHandler) {
          clickHandler(e);
        }
      }}
    >
      {children}
    </IconButton>
  );
};

const EditSongTagField = ({
  tagName,
  tagData,
  index,
  addFieldListItem,
  removeFieldListItem,
  editFieldListItem,
}: EditSongTagItemProp) => {
  const fieldChangeHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    editFieldListItem(tagName, index, e.target.value);
  };

  const addItemHandler: React.MouseEventHandler = e => {
    addFieldListItem(tagName, index);
  };

  const removeItemHandler: React.MouseEventHandler = e => {
    removeFieldListItem(tagName, index);
  };

  return (
    <Stack direction="row" spacing={1} width={"100%"}>
      <TextField
        onChange={fieldChangeHandler}
        name={tagName}
        value={tagData[index]}
        multiline
        minRows={1}
        sx={{ py: 1 }}
        variant="filled"
        InputProps={{
          disableUnderline: true,
          sx: { borderRadius: "4px", py: 1, px: 2, fontSize: "12px" },
        }}
      />
      <EditFieldIconButton clickHandler={addItemHandler}>
        <AddCircleOutlineIcon sx={{ fontSize: "12px" }} />
      </EditFieldIconButton>
      <EditFieldIconButton clickHandler={removeItemHandler}>
        <DeleteIcon sx={{ fontSize: "12px" }} />
      </EditFieldIconButton>
    </Stack>
  );
};

const EditSongTag = ({
  tagName,
  tagData,
  removeFieldListItem,
  addFieldListItem,
  editFieldListItem,
}: EditSongTagProp) => {
  return (
    <Box width={"100%"}>
      <Typography variant="h2">{songFieldToDisplay(tagName)}</Typography>
      <List dense={true}>
        {tagData &&
          tagData.map((element, i) => {
            // TODO figure out key prop for this
            return (
              <EditSongTagField
                tagName={tagName}
                tagData={tagData}
                index={i}
                removeFieldListItem={removeFieldListItem}
                addFieldListItem={addFieldListItem}
                editFieldListItem={editFieldListItem}
              />
            );
          })}
      </List>
    </Box>
  );
};

// The Song info - top left of page
const SongInfo = ({
  song,
  isEditMode,
  removeFieldListItem,
  addFieldListItem,
  editFieldListItem,
}: SongInfoProps) => {
  console.log(`Rendering SongInfo in Edit Mode ${isEditMode}`);
  const tagInfoRow1: (keyof SongDisplay)[] = [
    "sheet",
    "composer",
    "arranger",
    "genre",
    "key",
    "time_sig",
    "tempo",
    "date_added",
  ];

  // For now, this is temporary until these fields are actually implemented
  const tagInfoRow2 = {
    "Reference (Youtube Link)": "Coming Soon...",
    "Chimes Recording": "Coming Soon...",
    Available: "IMPLEMENT THIS LOGIC",
    Notes: "",
  };

  return (
    <Box sx={{ width: "65%" }}>
      {/*** Row 1 of Items *********/}
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
        {tagInfoRow1.map((key, i) => {
          return (
            // Don't make Date Added editable
            key === "date_added" ? (
              <SingleSongTag key={i} tagName={key} tagData={song[key]} />
            ) : // Other than Date Added - Choose between edit or display components
            isEditMode ? (
              <EditSongTag
                key={i}
                tagName={key}
                tagData={song[key as ListTags]}
                removeFieldListItem={removeFieldListItem}
                addFieldListItem={addFieldListItem}
                editFieldListItem={editFieldListItem}
              />
            ) : (
              <ListSongTag
                key={i}
                tagName={key}
                tagData={song[key as ListTags]}
              />
            )
          );
        })}
      </Stack>
      {/*** Spacer *******************/}
      <Box sx={{ height: "32px", width: "100%" }} />
      {/*** Row 2 of Items ***********/}
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        {Object.entries(tagInfoRow2).map(([key, value], i) => {
          return <SingleSongTag key={i} tagName={key} tagData={value} />;
        })}
      </Stack>
    </Box>
  );
};

const DayRange = () => {
  const firstDay = dayjs("2006-01-01");

  const [dateFrom, setFrom] = useState<Dayjs>(firstDay);
  const [dateTo, setTo] = useState<Dayjs>(dayjs());

  return (
    <Stack direction="row" sx={{ display: "flex", height: "28px" }}>
      <Box sx={{ mx: 4 }}> from </Box>
      <CustomDatePicker light={false} date={dateFrom} setDate={setFrom} />
      <Box sx={{ mx: 4 }}> to </Box>
      <CustomDatePicker light={false} date={dateTo} setDate={setTo} />
    </Stack>
  );
};

// Song stats and plays per CM
const Statistics = ({ stats, playsPerCM }: songStatsProp) => {
  const { performances, requests, players } = stats;

  return (
    <Stack direction="column" mb={4}>
      <Typography sx={{ fontSize: 18 }}>Statistics</Typography>
      <Typography sx={{ fontSize: 12, mt: 2 }}>
        {performances + " " + "Performance" + (performances !== 1 ? "s" : "")}
      </Typography>
      <Typography sx={{ fontSize: 12 }}>
        {requests +
          " " +
          "Request" +
          (requests !== 1 ? "s" : "") +
          " (" +
          Math.round((requests / performances) * 100) +
          "%)"}
      </Typography>
      <Typography sx={{ fontSize: 12 }}>
        {players + " " + "Player" + (players !== 1 ? "s" : "")}
      </Typography>
      {/* List of CMs who have played this song */}
      <List dense={true}>
        {Object.entries(playsPerCM).map(([cm, plays], i) => {
          const cmStr =
            plays > 0 ? (
              <ListItem key={i} dense={true} sx={{ mb: -4, mt: -2 }}>
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
        {Object.entries(history).map(([date, performers], i) => {
          // Inspiration from
          // https://stackoverflow.com/questions/61831915/add-new-string-between-every-current-string-in-array
          // Adapted according to reduce spec
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
          const performersStr = performers.reduce(
            (accum, curr, idx) => {
              return idx < performers.length - 1
                ? accum.concat(curr, ", ")
                : accum.concat(curr); // omit the "+" after the last performer
            },
            "" // Initialize to empty string
          );
          const displayItem = date + ": " + performersStr;
          return (
            <ListItem key={i} dense={true} sx={{ mb: -4, mt: -2 }}>
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

// The Main Song Page component
const SongPage = () => {
  const { id } = useParams(); // Get ID of song from URL

  /*** State Variables ********************************************/
  const [data, setData] = useState<SongDisplay>({} as SongDisplay); //<songPageData>({} as songPageData);
  const [isEditMode, setEditMode] = useState(false);
  const [ready, setReady] = useState(false); // This prevents trying to access empty data before fetching is done.
  const [songForm, setSongForm] = useState<SongDisplay>(new SongDisplay());

  //const { song, stats, playsPerCM, history } = data;
  const song = data;

  /*** Form Modification Handlers ********************************************/
  const editSongForm = (formField: string, value: string[]) => {
    // Changes the state variable. Below functions call this.
    console.log(`Set song form - ${formField} - ${value}`);
    setSongForm({
      ...songForm,
      [formField]: value,
    });
  };

  const addFieldListItem = (name: ListTags, index: number) => {
    // Doing it this way because splice edits in-place and returns deleted items
    const listField: string[] = songForm[name];
    listField.splice(index + 1, 0, "");
    // Change the state
    editSongForm(name, listField);
  };

  const removeFieldListItem = (name: ListTags, index: number) => {
    console.log(`Remove Field List Item - ${name} - ${index}`);
    // Doing it this way because splice edits in-place and returns deleted items
    const listField: string[] = songForm[name];
    if (songForm[name].length > 1) {
      listField.splice(index, 1);
    }
    // Change the state
    editSongForm(name, listField);
  };

  const editFieldListItem = (name: ListTags, index: number, value: string) => {
    console.log(`Edit Field List Item - ${name} - ${index}`);
    const listField: string[] = songForm[name];
    listField[index] = value;
    // Change the state
    editSongForm(name, listField);
  };

  /*** Button Click Handlers ********************************************/
  const cancelEditMode: React.MouseEventHandler = () => {
    setSongForm(JSON.parse(JSON.stringify(song)));
    setEditMode(false);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit Form");
    setSongForm(JSON.parse(JSON.stringify(song)));
    setEditMode(false);
  };

  /*** useEffect to fetch Song *****************************************/
  useEffect(() => {
    console.log("Fetching Song");
    fetch(`/song/${id}`)
      .then(res => res.json())
      .then(dataIn => {
        const temp = songToDisplayObj(dataIn);
        setData(temp);
        setSongForm(JSON.parse(JSON.stringify(temp))); // Needs a "Deep Copy"
      })
      .then(() => setReady(true)); // set this at end so it doesn't try to render prematurely
  }, []);

  /*** Component Returned ********************************************/
  if (ready) {
    return (
      <Box
        sx={{ mx: 6, my: 3 }}
        component={isEditMode ? "form" : "div"}
        onSubmit={submitHandler} // Not sure if this is the best way but div shouldn't have a way to submit
      >
        <SongTitle sheet={song.sheet[0]} title={song.title} />
        <Box sx={{ width: "100%", height: "32px" }} />
        <Stack direction="row" display="flex" spacing={16}>
          <SongInfo
            song={isEditMode ? songForm : song}
            isEditMode={isEditMode}
            removeFieldListItem={removeFieldListItem}
            addFieldListItem={addFieldListItem}
            editFieldListItem={editFieldListItem}
          />
          <Box sx={{ flexGrow: 1 }} />
          {/*<PlayStats stats={stats} playsPerCM={playsPerCM} history={history} />*/}
        </Stack>
        <Box sx={{ width: "100%", height: "32px" }} />
        <Box>
          {isEditMode ? (
            <Stack spacing={4} direction="row">
              <Button
                variant="contained"
                onClick={cancelEditMode}
                color="info"
                disableElevation
                sx={{ px: 2, py: 1, textTransform: "none", flexShrink: 0 }}
              >
                {"Cancel"}
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="info"
                disableElevation
                sx={{ px: 2, py: 1, textTransform: "none", flexShrink: 0 }}
              >
                {"Submit Edit"}
              </Button>
              <Box sx={{ flexGrow: 1 }} />
            </Stack>
          ) : (
            // if isEditMode
            <Button
              variant="contained"
              onClick={() => setEditMode(true)}
              color="info"
              disableElevation
              sx={{ px: 2, py: 1, textTransform: "none", flexShrink: 0 }}
            >
              {"Edit Song"}
            </Button>
          )}
        </Box>{" "}
        {/*  Buttons */}
      </Box> // Container
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
