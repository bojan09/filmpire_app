import React from "react";

// mui components
import { Typography, Box } from "@mui/material";

// compoenents
import Movie from "../Movie/Movie";

// styles
import useStyles from "./styles";

const RatedCards = ({ title, data }) => {
  const classes = useStyles();
  return (
    <div>
      <Box>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        <Box display="flex" flexWrap="wrap" className={classes.container}>
          {data?.results.map((movie, i) => (
            <Movie key={movie.id} movie={movie} i={i} />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default RatedCards;
