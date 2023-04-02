import * as React from "react";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import ConcertGrid from "../components/ConcertGrid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Concert } from "../typing/types";
import CustomDatePicker from "../components/CustomDatePicker";

import {sortConcertsByDate, } from "../shared/utils";


interface HomePageProps {
  logEdit: Function;
}

function Home({ logEdit }: HomePageProps) {
  
  const tempSearchDate = "2013-05-05";
  
  const [data, setData] = useState([]);
  const [dateFrom, setFrom] = useState<Dayjs>(dayjs('2006-01-01'));
  const [dateTo, setTo] = useState<Dayjs>(dayjs(tempSearchDate, "YYYY-MM-DD", true));

  const fromYear = dateFrom.year();
  const fromMonth = dateFrom.month();
  const fromDaY = dateFrom.day();
  const toYear = dateTo.year();
  const toMonth = dateTo.month();
  const toDay = dateTo.date();

  const concertsByDate = sortConcertsByDate(data);

  useEffect(() => {
    console.log("Fetching concert:")
    console.log(`/concert/year/${toYear}/month/${toMonth}/day/${toDay}?previous=month`)
    fetch(`/concert/year/${toYear}/month/${toMonth}/day/${toDay}?previous=month`)
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  console.log(data);

  return (
    <Box sx={{ ml: "280px", mr: "24px", pl: "24px", pt: "12px", pb: "12px" }}>
      {/* Date Range pushed out to the right */}
      <Stack direction="row" sx={{pb:3}}>
        <Box flexGrow={1} />
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
        </LocalizationProvider>
      </Stack>
      <Stack direction="row">
        <Box flexGrow={1} />
        {/* See All Concerts */}
        <Typography variant="h2">
          See all concerts
        </Typography>
      </Stack>
      <ConcertGrid concertsByDate={concertsByDate} logEdit={logEdit} />
    </Box>
  );
}

export default Home;
