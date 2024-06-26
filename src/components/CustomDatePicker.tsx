import * as React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { PopperProps } from "@mui/material";

/***************************************************************
 * Component: CustomDatePicker
 * - Utilizes the MUI-X DatePicker component plus some extra styling
 * - The date adapter is DayJS
 *
 * Props:
 *   light: determines the color
 *   date: DayJS object (should this be ISO String and convert internally)
 *   setDate: function to pass date up to state manager
 *   disabled: If set, component is disabled
 * ***************************************************************/
interface DatePickerProps {
  light: boolean;
  date: Dayjs;
  setDate: Function;
  disabled?: boolean;
}

const CustomDatePicker = ({
  date,
  light,
  setDate,
  disabled = false,
}: DatePickerProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [closing, setClosing] = useState(false);

  // console.log(`Rerendering popper - open is ${open}`);
  console.log(`Rerendering date picker - date is ${date}`);

  // The handler for date changes.
  // The Input is a JS Date, and we call the parent SetState function with an ISO string.
  const dateChangeHandler: any = (newValue: Date) => {
    const updVal = dayjs(newValue).toISOString();
    setDate(updVal);
  };

  const focusHandler: React.FocusEventHandler<HTMLInputElement> = event => {
    // When the Popper sends a close request to the Date Picker,
    // The focus returns to the input, so it doesn't do to set open to true here
    // or even toggle, in addition to setting open to false on onClose.
    // So, I have a third state variable, closing, that is set on onClose
    // to tell this focus handler it's in the "returned" focus mode and not reopen the Popper

    console.log("in focusHandler");

    if (closing) {
      setClosing(false);
    } else {
      // set open state
      //https://stackoverflow.com/questions/61238028/how-do-i-spawn-my-date-picker-ui-upon-first-clicking-on-the-date-text-field
      setOpen(true);

      // set anchorEl prop of calendar - got from first answer here
      //https://stackoverflow.com/questions/72691395/material-ui-datepicker-opening-in-top-left-corner
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: "", end: "" }}
    >
      <DatePicker
        disableFuture
        disabled={disabled}
        open={open}
        onClose={() => {
          setOpen(false);
          //setAnchorEl(null);
          setClosing(true);
        }}
        value={date}
        onChange={dateChangeHandler}
        slotProps={{
          textField: {
            sx: {
              backgroundColor: light
                ? theme.palette.primary.contrastText
                : theme.palette.info.main,
              borderRadius: "4px",
              "& .MuiInputBase-input": {
                height: "20px",
                width: "120px",
                position: "relative",
                padding: "4px 8px",
                fontSize: theme.typography.body1,
                borderRadius: "4px",
              },
              // Got this from stack overflow
              // https://stackoverflow.com/questions/66563420/how-to-remove-border-of-material-uis-datepicker
              // Not sure how it worked seeing how notched is false in InputProps
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }, // sx
            InputProps: {
              // props for OutlinedInput
              //endAdornment:null, // it still works without this???
              notched: false,
              onFocus: focusHandler, // enable calendar popup
              sx: {
                height: "28px", // For some reason this was more than the stack
              },
            }, // InputProps
          }, // textField
          popper: {
            anchorEl: anchorEl,
          },
        }} // slotProps
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
