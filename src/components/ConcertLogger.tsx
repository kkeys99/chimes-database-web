// React and hooks
import * as React from "react";
import { useState, useEffect } from "react";
// Dayjs
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
// Mui imports
import { useTheme, styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDatePicker from "./CustomDatePicker";
import { IconButton } from "@mui/material";
// Custom types
import {
  concertLogFields,
  songEntry,
  Concert,
  Performance,
} from "../typing/types";
import { BooleanLiteral } from "typescript";

/* Constants ****************************************/
const drawerWidth = 256;
const concertTypes = ["morning", "afternoon", "evening", "specialty"];

/* Prop Interfaces ***********************************/

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
  index: number; // The vertical position in the list "X"
  bottom: boolean; // Whether it's the bottom entry
  addSong: Function; // Handlers from the top-level Logger
  deleteSong: Function;
  moveSong: Function;
  setDraggingAny: Function;
  setTarget: Function;
  tgtAbove: boolean;
  tgtBelow: boolean;
  editSong: Function;
  checkErrors: boolean;
  sortableList: HTMLElement;
}

/* Components ***********************************/

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
  moveSong,
  setDraggingAny,
  setTarget,
  tgtAbove,
  tgtBelow,
  editSong,
  checkErrors,
  sortableList,
}: SongLoggerProps) => {
  const theme = useTheme();
  const inputFontSize = theme.typography.body2;

  console.log(
    `SONG LOGGER ROW index: ${index} tA: ${tgtAbove} tB: ${tgtBelow}`
  );

  const [draggable, setDraggable] = useState(false);

  // Error Flags
  const titleError = checkErrors && song.title === "";
  const cmError = checkErrors && song.CM === "";

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

  const menuButtonMouseDown: React.MouseEventHandler = () => {
    setDraggable(true);
  };

  const dragStart: React.DragEventHandler<HTMLDivElement> = () => {
    setDraggingAny(true);
    setTarget(index + 0.5); // Initially, set target to underline below.
  };

  const calcTarget: React.DragEventHandler = (
    e: React.DragEvent<HTMLElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    if (e.clientY < rect.top + rect.height * 0.4) {
      setTarget(index - 0.5);
    } else if (e.clientY > rect.top + rect.height * 0.6) {
      setTarget(index + 0.5);
    }
  };

  const endDragRow = (e: React.DragEvent<HTMLElement>) => {
    moveSong(index);
    setDraggingAny(false);
    setDraggable(false);
  };

  const boxSX = {
    display: "flex",
    gap: "7px",
    py: 1,
    borderColor: theme.palette.secondary.main,
    borderStyle: "solid none",
    borderTopWidth: tgtAbove ? (index === 0 ? "2px" : "1px") : "0px",
    borderBottomWidth: tgtBelow ? (bottom ? "2px" : "1px") : "0px",
  };

  return (
    <FormGroup
      row
      sx={boxSX}
      draggable={draggable}
      onDragStart={dragStart}
      onDragEnd={event => endDragRow(event)}
      onDragOver={event => {
        calcTarget(event);
      }}
    >
      {/* Icons on the left-hand side: drag and add song */}
      <Stack direction="column" spacing={0.5}>
        {/* // bottom Only be able to add at the bottom of list - disabled for now bc we can't reorder */}
        <LogIcon>
          <MenuIcon
            sx={{ fontSize: inputFontSize, marginY: 5.5 }}
            onMouseDown={menuButtonMouseDown}
          />
        </LogIcon>
      </Stack>

      {/* Song Title text field*/}
      <TextField
        error={titleError}
        onChange={titleChangeHandler}
        name="title"
        value={song.title}
        multiline
        minRows={1}
        sx={{ py: 4, width: "64px", flexShrink: 0 }}
        variant="filled"
        InputProps={{
          disableUnderline: !titleError,
          sx: { borderRadius: "4px", py: 1, px: 2, fontSize: inputFontSize },
        }}
      />

      {/* CM Selector */}
      <Select
        error={cmError}
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
      {
        //bottom && // Only be able to add at the bottom of list - disabled for now bc we can't reorder
        <LogIcon clickHandler={addSongHandler}>
          <AddCircleOutlineIcon sx={{ fontSize: inputFontSize }} />
        </LogIcon>
      }
      <LogIcon clickHandler={deleteSongHandler}>
        <DeleteIcon sx={{ fontSize: inputFontSize }} />
      </LogIcon>

      <LogIcon clickHandler={requestChangeHandler}>
        {song.request ? (
          <StarIcon sx={{ fontSize: inputFontSize }} />
        ) : (
          <StarBorderIcon sx={{ fontSize: inputFontSize }} />
        )}
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
  const sortableList = React.useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const inputFontSize = theme.typography.body2;

  const [checkErrors, setCheckErrors] = useState(false);
  const [draggingAny, setDraggingAny] = useState(false);
  const [moveTarget, setMoveTarget] = useState(0);

  // Will only happen on changes to editMode or editID
  useEffect(() => {
    console.log("ConcertLogger useEffect");
    // Referenced this because I don't really know what I'm doing here lol
    //https://stackoverflow.com/questions/49725012/handling-response-status-using-fetch-in-react-js
    if (isEditMode) {
      // Enter this condition if we are in edit mode and
      // We don't have a concert to edit OR
      // We are changing which concert to edit
      console.log("Fetching concert");
      fetch(`/concert/${editID}`)
        .then(res => {
          if (!res.ok) {
            console.log("Got an error code");
            throw new Error();
          } else {
            return res.json();
          }
        })
        .then(data => {
          console.log(data);
          setLog({
            date: dayjs(data.date),
            concertType: data.type,
            bellsAdjusted: data.bellsAdjusted === true, // set to false if it is any falsy value, including undefined
            songs: [emptySong()], // need to have an entry in order for form to populate
            // TODO - Add back in and test when ready
            //songs: (data.performances.length > 0) ? data.performances.map((perf: Performance) => {
            //  return {
            //    title: perf.song.title,
            //    CM: perf.performers[0], // TODO fix this
            //    request: perf.isRequest,
            //  };
            //}) :
            // [emptySong()],
            privateNote: data.notes,
            publicNote: "", // TODO add support for this when ready
          });
        })
        .catch(error => {
          console.log(error);
        });
    } // if isEditMode
    else {
      // Clear the form if
      // We are leaving edit mode (editMode is off and we have a concert fetched)
      setLog(defaultLog);
    }
  }, [isEditMode, editID]);

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
    concertType: concertTypes[0],
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

  const moveSongLogger = (baseIndex: number) => {
    console.log(`Moving base ${baseIndex} to ${moveTarget}`);

    // Target will be a x.5 to signify it's between two current indices
    // We need to account for the dragged item exiting its space and adjacent one shifting in
    // So, if we're moving UP, we ADD 0.5 to the target
    // and if we're moving DOWN, we SUBTRACT 0.5 from the target
    // This handles the edges too: 0 to -0.5 -> 0 to 0 , last to last+0.5 -> last
    const actualTarget =
      baseIndex > moveTarget ? moveTarget + 0.5 : moveTarget - 0.5;

    // Make new song list using Array.splice()
    // Remember splice returns deleted items and edits in place
    const songList: songEntry[] = logForm.songs;
    const movedSong: songEntry[] = songList.splice(baseIndex, 1);
    songList.splice(actualTarget, 0, movedSong[0]);
    // Update state
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

  // Process the form and return processed form
  function processForm(): concertLogFields {
    // Return an empty list if there is one blank entry
    let nonEmptySongs;
    if (logForm.songs.length === 1) {
      nonEmptySongs = logForm.songs.filter(song => {
        return song.title !== "" && song.CM !== "";
      });
    } else {
      nonEmptySongs = logForm.songs;
    }
    console.log(nonEmptySongs);
    const finalForm: concertLogFields = { ...logForm, songs: nonEmptySongs };
    return finalForm;
  }

  const errorCheck = (log: concertLogFields) => {
    let errorPresent = false;
    log.songs.forEach(song => {
      if (song.title === "" || song.CM === "") {
        errorPresent = true;
      }
    });
    return errorPresent;
  };

  const submitHandler = (e: React.FormEvent) => {
    // This is the handler for when the form is submitted
    console.log("Submitting Form");
    // This will prevent the page from refreshing
    e.preventDefault();
    // Process the form and check for errors
    // Make sure empty songs don't go through
    // This will be a separate variable as the state variable to ensure changes are actually caught on submit.
    const finalForm: concertLogFields = processForm();
    console.log(finalForm);

    // Check final form because processForm may remove errors caught by this check
    if (errorCheck(finalForm)) {
      setCheckErrors(true);
      return;
    }

    if (!isEditMode) {
      // Send the actual HTTP POST request
      fetch("/concert/new", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(finalForm),
      });
    } else {
      // What to do when submit on edit mode
      //
    }

    // Maybe logic that will trigger a pop-up will go here, reacting to a return code?
    //

    // Clear the form if submit was successful
    setLog(defaultLog);
    setCheckErrors(false);
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
            checked={logForm.bellsAdjusted}
            disabled={isEditMode}
            // For whatever reason, formControlLabel has a marginLeft of -11??
            control={
              <Checkbox
                disableRipple
                name="bellsAdjusted"
                color="secondary"
                onChange={e => {
                  setLog({
                    ...logForm,
                    bellsAdjusted: e.target.checked,
                  });
                }}
                sx={{ py: 0, position: "relative" }}
              />
            }
            label="Adjusted bells"
          />
        </FormControl>
        {/* Need to end this here bc focus class turns notes red */}
        {/*** SONGS ****************************************************/}
        <Typography
          sx={{ pt: 4, pb: 0.5 }}
          color="primary.dark"
          variant="body1"
        >
          Add song:
        </Typography>
        <div ref={sortableList}>
          {logForm.songs.map((song, index) => (
            <SongLogger
              song={song}
              index={index}
              addSong={addSongLogger}
              deleteSong={removeSongLogger}
              moveSong={moveSongLogger}
              setDraggingAny={setDraggingAny}
              setTarget={setMoveTarget}
              tgtAbove={draggingAny && moveTarget === index - 0.5}
              tgtBelow={draggingAny && moveTarget === index + 0.5}
              editSong={editSongEntry}
              bottom={index == logForm.songs.length - 1}
              checkErrors={checkErrors}
              sortableList={sortableList.current!}
            />
          ))}
        </div>
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
