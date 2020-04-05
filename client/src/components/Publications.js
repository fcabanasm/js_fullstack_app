import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  normalGrid: {
    color: "black",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
  },
  clickeableGrid: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fafafa",
    },
  },
  title: {
    fontSize: "13pt",
  },
  author: {
    fontSize: "13pt",
    color: "#999",
  },
}));

const isClickeable = (publication) => {
  return publication.story_url || publication.url;
};

export default function Publications({ publications, handleDelete }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {publications.map((publication) => (
          <Grid item xs={12} key={publication._id}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              className={`${classes.normalGrid} ${
                isClickeable(publication) ? classes.clickeableGrid : ""
              }`}
            >
              <Grid
                item
                xs={8}
                onClick={
                  isClickeable(publication)
                    ? (e) =>
                        window.open(publication.story_url || publication.url)
                    : undefined
                }
              >
                <span className={classes.title}>{`${
                  publication.title || publication.story_title
                }.`}</span>
                &nbsp;
                <span
                  className={classes.author}
                >{`- ${publication.author} -`}</span>
              </Grid>
              <Grid item xs={3}>
                {moment(publication.createdAt).format("DD/MM/YYYY HH:mm")}
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  aria-label="delete"
                  onClick={(e) => {
                    handleDelete(publication._id);
                  }}
                >
                  <DeleteRoundedIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
