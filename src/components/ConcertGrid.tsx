import * as React from "react";
import Grid from "@mui/material/Grid";
import ConcertCard from "./ConcertCard";
import { Concert } from "../typing/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {dateHashToDisplayStr} from "../shared/utils";
import { isConstructorDeclaration } from "typescript";

interface ConcertGridProps {
  concertsByDate: {[key: number] : Concert[]};
  logEdit: Function;
}

interface ConcertGridRowProps {
  date: string;
  rowConcerts: Concert[];
  logEdit: Function;
}

/*****************************************************************************
 * ConcertGridRow
 *
 * Description:
 *   A Row on the concert grid showing all the concerts of the day.
 *   Contains the Date as well as the Concert Type and ConcertCard for each concert
 * Note:
 *   If there are less than 3 concerts in a day, there will be empty boxes inserted
 *   in the row so that concert cards do not exceed 1/3 the row wide. If there are
 *   more than 3 concerts, they will be equally sized.
 *****************************************************************************/
function ConcertGridRow({ date, rowConcerts, logEdit }: ConcertGridRowProps) {

  // This determines how many invisible boxes to put in the row so that things
  let extraBoxes = [];
  for (let i = rowConcerts.length; i < 3; i++) {
    extraBoxes.push(i);
  }

  return (
    <Box
      sx={{ 
        pb: "24px",
      }}
    >
      <Typography sx={{ pb: "12px" }} variant="h2">
        {date}
      </Typography>
      <Box display="grid"
        sx={{ 
          //https://css-tricks.com/equal-columns-with-flexbox-its-more-complicated-than-you-might-think/
          gridAutoFlow:"column", gridAutoColumns:"1fr",
          columnGap:3
        }}
      >
        {rowConcerts.map((concert, i) => {
          return(
            <ConcertCard concert={concert} logEdit={logEdit} />
          );
        })}
        {extraBoxes.map(() => {
          console.log("EMPTY BOX")
          return (
            <Box />
          );
        })
        }
      </Box>
    </Box>
  );
}

/*****************************************************************************
 * ConcertGrid
 *
 * Description:
 *   Contains the whole concert grid for that page.
 *****************************************************************************/
const ConcertGrid = ({ concertsByDate, logEdit }: ConcertGridProps) => {
  
  // A custom sort function that sorts in DESCENDING order
  const descSort = (a: string, b: string) => {
    if ( a < b ) {
      return 1
    }
    else if (a > b) {
      return -1
    }
    else {
      return 0
    }
  }
  
  // Sort the Dates so that we look up the concerts object in custom order
  const sortedDates = Object.keys(concertsByDate).sort(descSort);

  // Returned object - all the rows of concerts
  return (
    <Box>
      {sortedDates.map((dateHash) => {
        return(
        <ConcertGridRow
          date={dateHashToDisplayStr(parseInt(dateHash))}
          rowConcerts={concertsByDate[parseInt(dateHash)]}
          logEdit={logEdit}
        />
        );
      })}
    </Box>
  );
};

export default ConcertGrid;
