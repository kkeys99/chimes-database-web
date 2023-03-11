import * as React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from 'dayjs';

import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from "dayjs";


interface DatePickerProps {
    light: boolean;
    date: Dayjs;
    setDate: Function;
}
  
const CustomDatePicker = ({date, light, setDate }:DatePickerProps) => {

    const theme = useTheme();
    const [open, setOpen] = useState(false);

    console.log(`Date is ${date}`);

    const dateChangeHandler: any = (newValue: Date) => {
        console.log(`Picker dateChange with ${newValue}`);
        console.log(`Picker dateChange date is: ${date}`);
        setDate(dayjs(newValue));
    };

    // TODO - open calendar on click
    const focusHandler: React.FocusEventHandler<HTMLInputElement> = () => {
        //https://stackoverflow.com/questions/61238028/how-do-i-spawn-my-date-picker-ui-upon-first-clicking-on-the-date-text-field
        setOpen(true);
    }


    return(
    <DatePicker 
        disableFuture
        open={open} // TODO - enable calendar popup. This seems difficult for now.
        value={date}
        onChange={dateChangeHandler} 
        slotProps={{
        textField: {
            sx:{
                backgroundColor: light? theme.palette.primary.contrastText: theme.palette.info.main,
                borderRadius:"4px",
                "& .MuiInputBase-input": { 
                    height:"20px",
                    width:"120px",
                    position: "relative",
                    padding: "4px 8px",
                    fontSize:theme.typography.body1,
                    borderRadius:"4px",
                },
                // Got this from stack overflow
                // https://stackoverflow.com/questions/66563420/how-to-remove-border-of-material-uis-datepicker
                // Not sure how it worked seeing how notched is false in InputProps
                "& .MuiOutlinedInput-notchedOutline": {
                    border: 'none'
                }
            }, // sx
            InputProps: { // props for OutlinedInput
                endAdornment:null,
                notched:false,
                //onFocus: focusHandler, // TODO: enable calendar popup
                sx:{
                    height:"28px", // For some reason this was more than the stack
                }
            } // InputProps
        }, // textField
        }} // slotProps
    />
    );
}

export default CustomDatePicker;