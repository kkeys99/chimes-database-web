import * as React from "react";
import theme from "../theme";
import { useParams } from "react-router-dom";
import { useState, useEffect, memo } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";

import ConcertGrid from "../components/ConcertGrid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Concert } from "../typing/types";
import CustomDatePicker from "../components/CustomDatePicker";

import { sortConcertsByDate } from "../shared/utils";

interface HomePageProps {
  logEdit: Function; // Func that puts logger in edit mode w proper editID
}

/*************************************************************
 * Component: Home
 *
 * - This is the component for the Home page, which has
 *  the concert history.
 * - It makes a fetch request to the API for the concert history
 * and passes it into the ConcertGrid component.
 * - It also has two Date Pickers which decide the search range.
 *************************************************************/
const Home = memo(function Home({ logEdit }: HomePageProps) {
  const tempSearchDate = "2013-05-05";
  const searchStart = "2006-01-01";

  // The concert history itself
  const [data, setData] = useState([]);

  // The dates for the search range
  // These should be ISO strings
  const [dateFrom, setFrom] = useState<string>(
    dayjs(searchStart, "YYYY-MM-DD", true).toISOString()
  );
  const [dateTo, setTo] = useState<string>(
    dayjs(tempSearchDate, "YYYY-MM-DD", true).toISOString()
  );

  // Search range dates as dayjs
  const tempDateFrom = dayjs(dateFrom);
  const tempDateTo = dayjs(dateTo);

  // Parse year, month, day out of search range dates for API call
  const fromYear = tempDateFrom.year();
  const fromMonth = tempDateFrom.month();
  const fromDay = tempDateFrom.date();
  const toYear = tempDateTo.year();
  const toMonth = tempDateTo.month();
  const toDay = tempDateTo.date();

  // Sorted concerts, will get passed to concert grid
  const concertsByDate = sortConcertsByDate(data);

  // Fetch the concert history between the search dates any time they change
  useEffect(() => {
    console.log("Fetching concert:");
    console.log(
      `/concert/year/${toYear}/month/${toMonth + 1}/day/${toDay}?previous=month`
    );
    fetch(
      `/concert/year/${toYear}/month/${toMonth + 1}/day/${toDay}?previous=month`
    )
      // month+1 because dayjs indexes months from 0
      .then(res => res.json())
      .then(data => setData(data));
  }, [dateTo, dateFrom]);

  return (
    // TODO: Make a reusable body container
    <Box sx={{ ml: "280px", mr: "24px", mt: "12px", mb: "12px" }}>
      {/* Date Search Selector */}
      <Stack
        direction="row"
        spacing={3}
        display="flex"
        justifyContent="right"
        sx={{ height: "28px" }}
      >
        <Box> from </Box>
        <CustomDatePicker light={false} date={tempDateFrom} setDate={setFrom} />
        <Box> to </Box>
        <CustomDatePicker light={false} date={tempDateTo} setDate={setTo} />
      </Stack>
      {/* See all Concerts */}
      {/* TODO: make this into button that works */}
      <Typography
        sx={{ mt: 3 }}
        display="flex"
        justifyContent="right"
        variant="h2"
      >
        See all concerts
      </Typography>
      {/* The Concert Grid itself */}
      <ConcertGrid concertsByDate={concertsByDate} logEdit={logEdit} />
    </Box>
  );
});

export default Home;
