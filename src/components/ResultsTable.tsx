import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { resultTableRowData, Song } from "../typing/types";
import { useState } from "react";

/*****************************************************************************/

const playingStatsFields = ["Available", "You", "Sheet", "Song"];
const playingStatsFieldsFull = [
  "Available",
  "Played",
  "You",
  "Sheet",
  "Song",
  "Composer",
  "Arranger",
  "Genre",
  "Requests",
  "Key Sig",
  "Time Sig",
  "Tempo",
  "Added",
];

function getField(field: string): string {
  return field == "song" ? "title" : field.replaceAll(" ", "");
}

// Example from https://mui.com/material-ui/react-table/
// An ascending comparison function
function ascendingCompare<T>(a: T, b: T, orderBy: keyof T) {
  if (a[orderBy] < b[orderBy]) {
    console.log(-1);
    return -1;
  } else if (a[orderBy] > b[orderBy]) {
    console.log(1);
    return 1;
  } else {
    console.log(0);
    return 0;
  }
}

type Order = "asc" | "desc";

// This function gets the compare *function* to use, whether ascend or descend.
// It takes in the order - asc or desc - and the key by which to sort
// Its return type a function that takes in 2 array items and returns a number
function getCompareFunction(
  order: string,
  orderBy: any
): (a: resultTableRowData, b: resultTableRowData) => number {
  return order == "asc"
    ? (a, b) => ascendingCompare(a, b, orderBy)
    : (a, b) => -ascendingCompare(a, b, orderBy);
}

/*****************************************************************************
 * FormattedCell
 *
 * Description:
 *   Table cell with formatting so we don't have to repeat this formatting
 *   everywhere in the ResultsTable
 *****************************************************************************/
const FormattedCell = (props: { text: any }) => {
  return (
    <TableCell align="center">
      {/* This is cumbersome!!! Try styled */}
      <Typography color="primary.dark" variant="h2">
        {props.text}
      </Typography>
    </TableCell>
  );
};

/*****************************************************************************
 * SortButton UNUSED
 *
 * Description:
 *   Table cell with formatting so we don't have to repeat this formatting
 *   twice in the ResultsTable
 *****************************************************************************/
type Arrows = typeof ArrowDropUpIcon | typeof ArrowDropDownIcon;
type Direction = "up" | "down";

const SortButton = (props: { component: Arrows; direction: Direction }) => {
  return (
    <IconButton
      sx={{ p: 0, height: 12, width: 12 }}
      disableRipple
      // How to pass onClick here ??
    >
      <SvgIcon
        sx={{ p: 0, height: 12, width: 12 }}
        component={props.component}
        viewBox={"6 6 12 12"}
      />
    </IconButton>
  );
};

/*****************************************************************************
 * ResultsTable
 *
 * Description:
 *   Reusable component for wherever there is a table of song results.
 *   "Lite" mode shows a shortened list of fields.
 *****************************************************************************/
const ResultsTable = (props: { data: resultTableRowData[]; lite: boolean }) => {
  // Consider using mui styled() to style the table rows to alternate colors and hide borders

  // State variables for sorting. Sorts the whole table by column specified by orderBy
  const [orderBy, setOrderBy] = useState("sheet");
  const [sortDirection, setSortDirection] = useState("asc");

  const headerFields: string[] = props.lite
    ? playingStatsFields
    : playingStatsFieldsFull;

  // Pass this into the Sort buttons to update sorting State variables
  const sortButtonOnClick = (field: string, order: string) => {
    setOrderBy(getField(field.toLowerCase()));
    setSortDirection(order);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headerFields.map(field => (
              <TableCell align="center">
                <Stack direction="row">
                  <Typography
                    color="primary.dark"
                    variant="h2"
                    fontWeight="bold"
                    sx={{ pr: 2 }} // Pad to the right to space out buttons because button padding is weird
                  >
                    {field}
                  </Typography>
                  {/* Sorting Buttons. */}
                  {/* Tried to modularize this, but couldn't figure out best way to pass onClick properly */}
                  <ButtonGroup orientation="vertical">
                    <IconButton
                      sx={{ p: 0, height: 12, width: 12 }}
                      disableRipple
                      onClick={() => {
                        sortButtonOnClick(field, "asc");
                      }}
                    >
                      <SvgIcon
                        sx={{ p: 0, height: 12, width: 12 }}
                        component={ArrowDropUpIcon}
                        viewBox={"6 6 12 12"}
                      />
                    </IconButton>
                    <IconButton
                      sx={{ p: 0, height: 12, width: 12 }}
                      disableRipple
                      onClick={() => {
                        sortButtonOnClick(field, "desc");
                      }}
                    >
                      <SvgIcon
                        sx={{ p: 0, height: 12, width: 12 }}
                        component={ArrowDropDownIcon}
                        viewBox={"6 6 12 12"}
                      />
                    </IconButton>
                  </ButtonGroup>
                </Stack>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data && // Only try to render body contents if data exists
            props.data
              .sort(getCompareFunction(sortDirection, orderBy))
              .map((rowData, index) => (
                <TableRow
                  sx={{
                    bgcolor: !(index % 2) ? "primary.contrastText" : "#FFFFFF",
                    border: "hidden",
                  }}
                >
                  <FormattedCell text={rowData.available} />
                  {!props.lite && <FormattedCell text={rowData.played} />}
                  <FormattedCell text={rowData.you} />
                  <FormattedCell text={rowData.sheet} />
                  <FormattedCell text={rowData.title} />
                  {!props.lite && <FormattedCell text={rowData.composer} />}
                  {!props.lite && <FormattedCell text={rowData.arranger} />}
                  {!props.lite && <FormattedCell text={rowData.genre} />}
                  {!props.lite && <FormattedCell text={rowData.requests} />}
                  {!props.lite && <FormattedCell text={rowData.keysig} />}
                  {!props.lite && <FormattedCell text={rowData.timesig} />}
                  {!props.lite && <FormattedCell text={rowData.tempo} />}
                  {!props.lite && <FormattedCell text={rowData.added} />}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;