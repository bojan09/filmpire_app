// state
import React, { useState } from "react";

// mui components
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

// mui icons
import { ArrowBack } from "@mui/icons-material";

// react router
import { useHistory, useParams } from "react-router-dom";

// react queries
import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";

// components
import MovieList from "../MovieList/MovieList";

// styles
import useStyles from "./styles";

const Actors = () => {
  const classes = useStyles();
  const history = useHistory();
  const page = 1;

  const { id } = useParams();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history.goBack()}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      {/* --- Main Container --- */}

      <Grid container spacing={3}>
        {/* --- Actors Image Container --- */}
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>

        {/* --- Actors Small Bio Container --- */}
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>

          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>

          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || "Sorry, no biography yet .."}
          </Typography>

          {/* --- Actors Small Bio Container - Buttons --- */}
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            {/* --- IMDB Button --- */}
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>

            {/* --- IMDB Button --- */}
            <Button
              startIcon={<ArrowBack />}
              onClick={() => history.goBack()}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* --- Movies Actors Starred In --- */}
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>

        {movies && <MovieList movies={movies} numberOfMovies={12} />}
      </Box>
    </>
  );
};

export default Actors;
