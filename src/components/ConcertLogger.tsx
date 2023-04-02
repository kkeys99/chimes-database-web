import * as React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";

import { useTheme } from "@mui/material/styles";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDatePicker from "./CustomDatePicker";

import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

import {
  concertLogFields,
  songEntry,
  Concert,
  Performance,
} from "../typing/types";

const drawerWidth = 256;

const concertTypes = ["Morning", "Afternoon", "Evening", "Specialty"];

interface ConcertLoggerProps {
  open: boolean;
  isEditMode: boolean;
  editID: number | null;
  setEditMode: Function;
  cancelEdit: Function;
}

interface LogIconProps {
  children: any;
  clickHandler?: React.MouseEventHandler | null;
}

interface SongLoggerProps {
  song: songEntry; // The song data itself
  index: number; // The vertical position in the list
  bottom: boolean; // Whether it's the bottom entry
  addSong: Function; // Handlers from the top-level Logger
  deleteSong: Function;
  editSong: Function;
}

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

// A simple component that's basically a styled icon button
// TODO - change this to styled API maybe?
const LogIcon = ({ children, clickHandler = null }: LogIconProps) => {
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

/*****************************************************************************
 * SongLogger
 *
 * Description:
 *   A single row of the "Add Song" section.
 *   Contains the inputs for Title and CM,
 *     and also icon buttons for reorder, add, request, and delete
 *   Each input has a change handler that calls a function from the
 *     ConcertLogger. This is necessary because the Logger functions
 *     need to know the index.
 *****************************************************************************/
const SongLogger = ({
  song,
  index,
  bottom,
  addSong,
  deleteSong,
  editSong,
}: SongLoggerProps) => {
  const theme = useTheme();
  const inputFontSize = theme.typography.body2;

  // TODO add click and drag functionality

  const addSongHandler: React.MouseEventHandler = () => {
    addSong(index);
  };

  const deleteSongHandler: React.MouseEventHandler = () => {
    deleteSong(index);
  };

  const titleChangeHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    song.title = e.target.value;
    editSong(index, song);
  };

  const cmChangeHandler = (e: any) => {
    // TODO - find out what kind of event this is so I dont use "any" as cop-out
    song.CM = e.target.value;
    editSong(index, song);
  };

  const requestChangeHandler: React.MouseEventHandler = () => {
    song.request = !song.request;
    editSong(index, song);
  };

  return (
    <FormGroup row sx={{ display: "flex", gap: "8px", py: 1 }}>
      {/* Icons on the left-hand side: drag and add song */}
      <Stack direction="column" spacing={1}>
        <LogIcon>
          <MenuIcon sx={{ fontSize: inputFontSize }} />
        </LogIcon>
        {
          //bottom && // Only be able to add at the bottom of list - disabled for now bc we can't reorder
          <LogIcon clickHandler={addSongHandler}>
            <AddCircleOutlineIcon sx={{ fontSize: inputFontSize }} />
          </LogIcon>
        }
      </Stack>

      {/* Song Title text field*/}
      <TextField
        onChange={titleChangeHandler}
        name="title"
        value={song.title}
        multiline
        minRows={1}
        sx={{ py: 1, width: "96px", flexShrink: 0 }}
        variant="filled"
        InputProps={{
          disableUnderline: true,
          sx: { borderRadius: "4px", py: 1, px: 2, fontSize: inputFontSize },
        }}
      />

      {/* CM Selector */}
      <Select
        name={"CM"}
        value={song.CM}
        onChange={cmChangeHandler}
        sx={{ width: "64px", flexShrink: 0, fontSize: inputFontSize }}
        input={<BootstrapInput />}
      >
        {concertTypes.map(type => {
          return (
            <MenuItem sx={{ fontSize: inputFontSize }} value={type}>
              {type}
            </MenuItem>
          );
        })}
      </Select>

      {/* Icons on the right-hand side: Request and Delete */}
      <LogIcon clickHandler={requestChangeHandler}>
        {song.request ? (
          <StarIcon sx={{ fontSize: inputFontSize }} />
        ) : (
          <StarBorderIcon sx={{ fontSize: inputFontSize }} />
        )}
      </LogIcon>
      <LogIcon clickHandler={deleteSongHandler}>
        <DeleteIcon sx={{ fontSize: inputFontSize }} />
      </LogIcon>
    </FormGroup>
  );
};

/*****************************************************************************
 * ConcertLogger
 *
 * Description:
 *   A drawer that you can slide out to log the concert
 *   https://mui.com/material-ui/react-drawer/
 *****************************************************************************/
const ConcertLogger = ({
  open,
  isEditMode,
  editID,
  cancelEdit,
}: ConcertLoggerProps) => {
  const theme = useTheme();
  const inputFontSize = theme.typography.body2;

  /***** Handling Edit Mode ****************************/
  const [editedConcert, setEditedConcert] = useState<Concert | null>(null);
  const [concertFetched, setConcertFetched] = useState(false);

  useEffect(() => {
    // Referenced this because I don't really know what I'm doing here lol
    //https://stackoverflow.com/questions/49725012/handling-response-status-using-fetch-in-react-js
    if (isEditMode && (!concertFetched || editID != editedConcert?.id)) {
      // Enter this condition if we are in edit mode and
      // We don't have a concert to edit OR
      // We are changing which concert to edit
      console.log("Fetching concert");
      fetch(`/concert/${editID}`)
        .then(res => {
          if (!res.ok) {
            console.log("Got an error code");
            throw new Error();
          } 
          else {
            return res.json();
          }
        })
        .then(data => {
          console.log(data);
          setEditedConcert(data.concert);
          setConcertFetched(true);
          setLog({
            date: dayjs(data.concert.date),
            concertType: data.concert.type,
            bellsAdjusted: data.concert.bellsAdjusted,
            songs: data.concert.performances.map((perf: Performance) => {
              return {
                title: perf.song.title,
                CM: perf.performers[0], // TODO fix this
                request: perf.isRequest,
              };
            }),
            privateNote: "",
            publicNote: "", // TODO fix this
          });
        })
        .catch(error => {
          console.log(error);
        });
    } // if (isEditMode && (!concertFetched || editID != editedConcert?.id))
    else if (!isEditMode && concertFetched) {
      // Reset Fetched and clear the form if
      // We are leaving edit mode (editMode is off and we have a concert fetched)
      setConcertFetched(false);
      setLog(defaultLog);
    }
  });

  // Props passed into the Paper component of the Drawer
  const paperProps = {
    sx: { width: "256px", borderRight: "none", overflow: "hidden" },
    elevation: 1,
  };

  /***** Form Related things ****************************/
  const emptySong = () => {
    const newSong: songEntry = {
      title: "",
      CM: "",
      request: false,
    };
    return newSong;
  };

  const defaultLog: concertLogFields = {
    date: dayjs(),
    concertType: "Morning",
    bellsAdjusted: false,
    songs: [emptySong()],
    privateNote: "",
    publicNote: "",
  };

  // State variable
  const [logForm, setLog] = useState(defaultLog);

  const dateChangeHandler = (newValue: Dayjs) => {
    setLog({
      ...logForm,
      date: newValue, // Date picker will take care of dayjs
    });
  };
  console.log(`Re-rendering Logger w date ${logForm.date}`);
  const cancelEditHandler: React.MouseEventHandler = () => {
    cancelEdit();
    setLog(defaultLog);
  };

  // Handlers for editing song entries //

  const addSongLogger = (index: number) => {
    // Go here when you press the plus icon
    // Doing it this way because splice edits in-place and returns deleted items
    const songList: songEntry[] = logForm.songs;
    songList.splice(index + 1, 0, emptySong());
    // Change the State
    setLog({
      ...logForm,
      songs: songList,
    });
  };

  const removeSongLogger = (index: number) => {
    // Go here when you press the trash icon
    // Guard clause for when there is only one entry
    if (logForm.songs.length == 1) {
      // TODO - Should pressing delete on a single entry clear it?
      // if so, include that logic here.
      return;
    }
    // Doing it this way because splice edits in-place and returns deleted items
    const songList: songEntry[] = logForm.songs;
    songList.splice(index, 1);
    // Change the state
    setLog({
      ...logForm,
      songs: songList,
    });
  };

  const editSongEntry = (index: number, song: songEntry) => {
    // Any change to the song entry will invoke this function
    // The input change callbacks themselves are located in the SongLogger component,
    // but they all call this function, which updates the whole object.
    // Is this the best way? Maybe not. But it works for now.
    let songList = logForm.songs;
    songList[index] = song;
    // Change the state
    setLog({
      ...logForm,
      songs: songList,
    });
  };

  const submitHandler = (e: React.FormEvent) => {
    // This is the handler for when the form is submitted
    console.log("Submitting Form");
    // This will prevent the page from refreshing
    e.preventDefault();
    if (!isEditMode) {
      // Send the actual HTTP POST request
      fetch("/log", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(logForm),
      });
    } else {
      // What to do when submit on edit mode
    }
    // Clear the form
    setLog(defaultLog);
    // Maybe logic that will trigger a pop-up will go here, reacting to a return code?
  };

  /***** Return Component ****************************/
  return (
    <Drawer
      sx={{ width: drawerWidth, ".& MuiDrawer-paper": { border: "none" } }}
      variant="persistent"
      anchor="left"
      open={open}
      PaperProps={paperProps}
    >
      {/*** Blank Div to push content down *********/}
      <Box sx={{ width: "100%", minHeight: "96px" }} />

      {/*** Concert Log Form ***********************/}
      <Box
        sx={{
          py: 5,
          px: 3,
          height: "100%",
          overflow: "scroll", // These keep the scroll area just to visible part
        }}
        margin="dense"
        component="form"
        onSubmit={submitHandler}
      >
        <FormControl>
          {/* Do this to maintain state for required fields */}
          <Typography color="primary.dark" variant="h2">
            {isEditMode ? "Edit Concert" : "Log Concert"}
          </Typography>
          {/*** DATE ********************************/}
          <FormGroup row sx={{ pt: 4, pb: 0.5, display: "flex", gap: 2 }}>
            <Typography color="primary.dark" variant="body1">
              Date:
            </Typography>
            <CustomDatePicker
              light={true}
              date={logForm.date}
              setDate={dateChangeHandler}
              disabled={isEditMode}
            />
          </FormGroup>
          {/*** CONCERT TYPE *********************************/}
          <FormGroup row sx={{ pt: 4, pb: 0.5, display: "flex", gap: 2 }}>
            <Typography color="primary.dark" variant="body1">
              Concert type:
            </Typography>
            <Select
              disabled={isEditMode}
              name="concertType"
              value={logForm.concertType}
              onChange={e => {
                console.log(e.target.value);
                setLog({
                  ...logForm,
                  concertType: e.target.value,
                });
              }}
              input={<BootstrapInput />}
            >
              {concertTypes.map(type => {
                return <MenuItem value={type}>{type}</MenuItem>;
              })}
            </Select>
          </FormGroup>
          {/*** ADJUSTED BELLS ****************************************/}
          <FormControlLabel
            sx={{ pt: 4, pb: 0.5 }}
            // For whatever reason, formControlLabel has a marginLeft of -11??
            control={
              <Checkbox
                disableRipple
                disabled={isEditMode}
                name="bellsAdjusted"
                value={logForm.bellsAdjusted}
                checked={logForm.bellsAdjusted}
                onChange={e => {
                  setLog({
                    ...logForm,
                    bellsAdjusted: e.target.checked,
                  });
                }}
                color="secondary"
                sx={{ py: 0, position: "relative" }}
              />
            }
            label="Adjusted bells"
          />
        </FormControl>{" "}
        {/* Need to end this here bc focus class turns notes red */}
        {/*** SONGS ****************************************************/}
        <Typography
          sx={{ pt: 4, pb: 0.5 }}
          color="primary.dark"
          variant="body1"
        >
          Add song:
        </Typography>
        {logForm.songs.map((song, index) => (
          <SongLogger
            song={song}
            index={index}
            addSong={addSongLogger}
            deleteSong={removeSongLogger}
            editSong={editSongEntry}
            bottom={index == logForm.songs.length - 1}
          />
        ))}
        {/*** NOTE PRIVATE ***********************************************/}
        <FormLabel sx={{ pt: 2, pb: 0.5, color: theme.palette.primary.dark }}>
          Note (private):
        </FormLabel>
        <TextField
          name="privateNote"
          value={logForm.privateNote}
          onChange={e => {
            console.log(e.target.value);
            setLog({
              ...logForm,
              privateNote: e.target.value,
            });
          }}
          fullWidth
          multiline
          minRows={2}
          sx={{ py: 1 }}
          variant="filled"
          InputProps={{
            disableUnderline: true,
            sx: { borderRadius: "4px", py: 1, fontSize: inputFontSize },
          }}
        />
        {/*** NOTE PUBLIC ***********************************************/}
        <FormLabel sx={{ pt: 2, pb: 0.5, color: theme.palette.primary.dark }}>
          Note (public):
        </FormLabel>
        <TextField
          name="publicNote"
          value={logForm.publicNote}
          onChange={e => {
            console.log(e.target.value);
            setLog({
              ...logForm,
              publicNote: e.target.value,
            });
          }}
          fullWidth
          multiline
          minRows={2}
          sx={{ py: 1 }}
          variant="filled"
          InputProps={{
            disableUnderline: true,
            sx: { borderRadius: "4px", py: 1, fontSize: inputFontSize },
          }}
        />
        {/*** SUBMIT BUTTON ***********************************************/}
        <Stack direction="row" display="flex" sx={{ pt: 5, width: "100%" }}>
          {isEditMode && ( // Only render this button if in edit mode
            <Button
              disableElevation
              onClick={cancelEditHandler}
              variant="contained"
              color="info"
              sx={{ px: 2, py: 1, textTransform: "none", flexShrink: 0 }}
            >
              {isEditMode ? "Cancel" : "Clear Form"}
            </Button>
          )}
          <Box
            // A box that pushes the Log Button to the end or sits between clear/cancel button
            sx={{
              height: "100%",
              width: "100%",
              flex: "flex-grow",
            }}
          />
          <Button
            variant="contained"
            type="submit"
            color="info"
            disableElevation
            sx={{ px: 2, py: 1, textTransform: "none", flexShrink: 0 }}
          >
            {isEditMode ? "Edit Concert" : "Log Concert"}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default ConcertLogger;
