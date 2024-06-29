import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as BellIcon } from "../assets/bell.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { Note, DBSong, Performance, Concert } from "../typing/types";
import { Link as MuiLink } from "@mui/material";
import logger from "../shared/logger";

interface Props {
  concert: Concert;
  logEdit: Function;
}

/*****************************************************************************
 * ConcertCard
 *
 * Description:
 *   The box that has the concert performances as well as "bells adjusted" icon,
 *   edit button, and stuff.
 *****************************************************************************/
const ConcertCard = ({ concert, logEdit }: Props) => {
  const name = "ConcertCard";
  logger.log(name, `Render`, logger.logLevel.DEBUG);

  const theme = useTheme();

  const handleEditClick: any = () => {
    logger.log(name, `Clicked Edit button`, logger.logLevel.DEBUG);
    logEdit(concert.id);
    return;
  };

  return (
    <Box>
      <Typography sx={{ pb: "12px" }}>{concert.type}</Typography>
      <Card
        raised={false}
        sx={{ bgcolor: "primary.contrastText", boxShadow: "none" }}
      >
        <CardContent sx={{ position: "relative", p: 5 }}>
          <Stack
            direction="row"
            spacing={2}
            //sx={{ top: 12, right: 12 }}
            display="flex"
          >
            <Typography variant="body2" fontWeight="light" flexGrow={1}>
              {concert.notes}
            </Typography>
            {/*** Bell and Edit Icons ***********************************/}
            {concert.bellsAdjusted && (
              <SvgIcon
                inheritViewBox
                component={BellIcon}
                sx={{ height: "20px", width: "20px" }}
              />
            )}
            <SvgIcon
              inheritViewBox
              component={EditIcon}
              onClick={handleEditClick}
              sx={{
                height: "20px",
                width: "20px",
                ":hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Stack>

          {/*** Concert Songs List *********************************/}
          <List dense sx={{ ml: 7, listStyleType: "disc" }}>
            {concert.performances.map(performance => {
              return (
                <ListItemText sx={{ my: 0, display: "list-item" }}>
                  <MuiLink
                    display="inline"
                    variant="body2"
                    color="secondary.main"
                    href={`/song/${performance.song._id}`}
                    underline="hover"
                  >
                    {`${performance.song.sheet[0]} - ${performance.song.title}`}
                  </MuiLink>
                  <Typography display="inline" variant="body2">
                    {` (${performance.initialsList.join(", ")})`}
                  </Typography>
                </ListItemText>
              );
            })}
          </List>
=        </CardContent>
      </Card>
    </Box>
  );
};

export default ConcertCard;
