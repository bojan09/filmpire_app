import React from "react";

// MUI
import { Grid } from "@mui/material";

// styles
import useStyles from "./styles";
import { Movie } from "..";

// Components

const MovieList = ({ movies, numberOfMovies }) => {
  const classes = useStyles;
  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
