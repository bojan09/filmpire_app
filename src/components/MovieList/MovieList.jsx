import React from "react";

// MUI
import { Grid } from "@mui/material";

// styles
import useStyles from "./styles";
import { Movie } from "..";

// Components

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const classes = useStyles;
  const startFrom = excludeFirst ? 0 : 1;

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
