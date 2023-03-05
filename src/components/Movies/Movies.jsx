import React, { useState } from "react";

// MUI
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";

// Redux
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";

// Components
import MovieList from "../MovieList/MovieList";

const Movies = () => {
  const { data, error, isFetching } = useGetMoviesQuery();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Plesae search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) return `An error has occured. ${error}`;

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
