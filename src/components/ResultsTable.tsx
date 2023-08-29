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
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import {
  resultTableRowData,
  searchByFieldRowData,
  Song,
} from "../typing/types";
import { songDisplayFieldToVar } from "../shared/utils";
import { useState, useEffect } from "react";

/*****************************************************************************/

enum SortState {
  NoSort,
  Asc,
  Desc,
}

const playingStatsFields = ["Available", "You", "Sheet", "Song"];
const playingStatsFieldsFull = [
  //"Available",
  //"Played",
  //"You",
  "Sheet",
  "Song",
  "Composer",
  "Arranger",
  "Genre",
  //"Requests",
  "Key",
  "Time Sig",
  "Tempo",
  "Added",
];

function getField(field: string): string {
  return field == "Song" ? "title" : songDisplayFieldToVar(field);
}

// Example from https://mui.com/material-ui/react-table/
// An ascending comparison function
function ascendingCompare<T>(a: T, b: T, orderBy: keyof T) {
  if (a[orderBy] < b[orderBy]) {
    return -1;
  } else if (a[orderBy] > b[orderBy]) {
    return 1;
  } else {
    return 0;
  }
}

// This function gets the compare *function* to use, whether ascend or descend.
// It takes in the order - asc or desc - and the key by which to sort
// Its return type a function that takes in 2 array items and returns a number
function getCompareFunction(
  order: SortState.Asc | SortState.Desc,
  orderBy: any
): (a: resultTableRowData, b: resultTableRowData) => number {
  return order == SortState.Asc
    ? (a, b) => ascendingCompare(a, b, orderBy)
    : (a, b) => -ascendingCompare(a, b, orderBy);
}

/*****************************************************************************
 * TextCell
 *
 * Description:
 *   Table cell with formatting so we don't have to repeat this formatting
 *   everywhere in the ResultsTable
 *****************************************************************************/
const TextCell = (props: { text: any }) => {
  return (
    <TableCell align="center">
      {/* This is cumbersome!!! Try styled */}
      <Typography color="primary.dark" variant="h2">
        {props.text}
      </Typography>
    </TableCell>
  );
};

const TagCell = (props: { tags: string[] }) => {
  return (
    <TableCell align="center">
      {props.tags.map((text, index) => {
        return (
          <Typography color="primary.dark" variant="h2">
            {text}
          </Typography>
        );
      })}
    </TableCell>
  );
};

const LinkCell = (props: { text: any; href: string }) => {
  return (
    <TableCell align="center">
      {/* This is cumbersome!!! Try styled */}
      <MuiLink
        component={RouterLink}
        to={props.href}
        color="primary.dark"
        variant="h2"
        underline="hover"
      >
        {props.text}
      </MuiLink>
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
 * HeaderCell
 *
 * Description:
 *   Reusable component for wherever there is a table of song results.
 *   "Lite" mode shows a shortened list of fields.
 *****************************************************************************/
interface HeaderCellProps {
  field: string;
  fieldToDisplay: Function;
  sortButtonOnClick: Function;
  sortState: SortState;
  index: number;
}

const HeaderCell = ({
  field,
  fieldToDisplay,
  sortButtonOnClick,
  sortState,
  index,
}: HeaderCellProps) => {
  return (
    <TableCell align="center">
      <Stack direction="row" justifyContent={"center"}>
        <Typography
          color="primary.dark"
          variant="h2"
          fontWeight="bold"
          sx={{ pr: 2 }} // Pad to the right to space out buttons because button padding is weird
        >
          {fieldToDisplay(field)}
        </Typography>
        {/* Sorting Buttons. */}
        {/* Tried to modularize this, but couldn't figure out best way to pass onClick properly */}
        <ButtonGroup orientation="vertical">
          <IconButton
            sx={{ p: 0, height: 12, width: 12 }}
            disableRipple
            onClick={() => {
              sortButtonOnClick(field, SortState.Asc, index);
            }}
          >
            <SvgIcon
              sx={{ p: 0, height: 12, width: 12 }}
              component={ArrowDropUpIcon}
              viewBox={"6 6 12 12"}
              color={sortState === SortState.Asc ? "primary" : "disabled"}
            />
          </IconButton>
          <IconButton
            sx={{ p: 0, height: 12, width: 12 }}
            disableRipple
            onClick={() => {
              sortButtonOnClick(field, SortState.Desc, index);
            }}
          >
            <SvgIcon
              sx={{ p: 0, height: 12, width: 12 }}
              component={ArrowDropDownIcon}
              viewBox={"6 6 12 12"}
              color={sortState === SortState.Desc ? "primary" : "disabled"}
            />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </TableCell>
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
  const [sortDirection, setSortDirection] = useState<
    SortState.Asc | SortState.Desc
  >(SortState.Asc);
  const [sortStates, setSortStates] = useState<SortState[]>([]);

  console.log(orderBy);
  console.log(props.data);

  const headerFields: string[] = props.lite
    ? playingStatsFields
    : playingStatsFieldsFull;

  // Pass this into the Sort buttons to update sorting State variables
  const sortButtonOnClick = (
    field: string,
    order: SortState.Asc | SortState.Desc,
    index: number
  ) => {
    // Update sort states - this field gets order, all other fields unsorted
    const updSortStates = sortStates.map((state, i) => {
      return i === index ? order : SortState.NoSort;
    });
    setSortStates(updSortStates);
    // Update other sorting state variables
    setOrderBy(getField(field));
    setSortDirection(order);
  };

  // Initialize sortStates - reset sort every time new search is made
  useEffect(() => {
    // reset sortstates
    const tempStates: SortState[] = [];
    for (let i = 0; i < headerFields.length; i++) {
      tempStates.push(SortState.NoSort);
    }
    setSortStates(() => tempStates);
    // orderBy sheet ascending
    setOrderBy("sheet");
    setSortDirection(SortState.Asc);
  }, [props.data]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headerFields.map((field, index) => (
              <HeaderCell
                field={field}
                index={index}
                sortState={sortStates[index]}
                fieldToDisplay={(text: string) => text}
                sortButtonOnClick={sortButtonOnClick}
              />
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
                  {/* TODO ADD THESE BACK
                  <TextCell text={rowData.available} />
                  {!props.lite && <TextCell text={rowData.played} />}
                  <TextCell text={rowData.you} />
                  */}
                  <TextCell text={rowData.sheet[0]} />
                  <LinkCell
                    text={rowData.title}
                    href={`/song/${rowData._id}`}
                  />
                  {!props.lite && <TagCell tags={rowData.composer} />}
                  {!props.lite && <TagCell tags={rowData.arranger} />}
                  {!props.lite && <TagCell tags={rowData.genre} />}
                  {/*!props.lite && <TextCell text={rowData.requests} />*/}
                  {!props.lite && <TagCell tags={rowData.key} />}
                  {!props.lite && <TagCell tags={rowData.time_sig} />}
                  {!props.lite && <TagCell tags={rowData.tempo} />}
                  {!props.lite && <TextCell text={rowData.date_added} />}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

/*****************************************************************************
 * SearchByField
 *
 * Description:
 *   Reusable component for wherever there is a table of song results.
 *   "Lite" mode shows a shortened list of fields.
 *****************************************************************************/
interface SearchByFieldProps {
  field: string;
  data: searchByFieldRowData[];
}
const SearchByFieldResults = ({ field, data }: SearchByFieldProps) => {
  const [orderBy, setOrderBy] = useState("sheet");
  const [sortDirection, setSortDirection] = useState<SortState>(SortState.Asc);

  // Pass this into the Sort buttons to update sorting State variables
  const sortButtonOnClick = (field: string, order: SortState) => {
    setOrderBy(getField(field.toLowerCase()));
    setSortDirection(order);
  };

  const headerFields = [field, "count"];

  const [sortStates, setSortStates] = useState<SortState[]>([]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headerFields.map((field, index) => (
              <HeaderCell
                field={field}
                index={index}
                sortState={sortStates[index]}
                fieldToDisplay={(text: string) => text}
                sortButtonOnClick={sortButtonOnClick}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && // Only try to render body contents if data exists
            data
              //.sort(getCompareFunction(sortDirection, orderBy)) // TODO Get this to work with diff types
              .map((rowData, index) => (
                <TableRow
                  sx={{
                    bgcolor: !(index % 2) ? "primary.contrastText" : "#FFFFFF",
                    border: "hidden",
                  }}
                >
                  <TextCell text={rowData.tag} />
                  <TextCell text={rowData.count} />
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { ResultsTable, SearchByFieldResults };
