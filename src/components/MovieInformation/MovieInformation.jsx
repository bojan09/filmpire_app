// state
import React, { Component } from "react";

// mui components
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from "@mui/material";

// mui icons
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";

// genre Icons
import genreIcons from "../../assets/genres";

// react router
import { Link, useParams } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

// axios
import axios from "axios";

// getMovie Query
import { useGetMovieQuery } from "../../services/TMDB";

// components
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

// styles
import useStyles from "./styles";

const MovieInformation = () => {
  const classes = useStyles();
  const addToFavorites = () => {};
  const addToWatchlist = () => {};

  const isMovieFavorited = false;
  const isMovieWatchlisted = true;

  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong, go back</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} align="center">
        {/* --- Image Grid --- */}
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          className={classes.poster}
          alt={data?.title}
        />
      </Grid>

      {/* --- Title and Realese Date Grid --- */}
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>

        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        {/* --- Average rating Grid --- */}
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
            >
              {Math.round(data?.vote_average)} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min
            {data?.spoken_languages.length > 0
              ? ` / ${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>

        {/* --- Genre Grid --- */}
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              style={{ textDecoration: "none" }}
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt="icon pic here"
                className={classes.genreImage}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>

        {/* --- Overview --- */}
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>

        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>

        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>

        {/* --- Top Cast Grid --- */}
        <Grid item container spacing={2}>
          {data &&
            data?.credits.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>

        {/* ---  Buttons Grid --- */}
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonsContainer}>
            {/* ---  3 Button Grid --- */}
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                {/* --- Movie Website Button --- */}
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>

                {/* --- IMDB Website Button --- */}
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>

                {/* --- Movie Trailer Button --- */}
                <Button onClick={() => {}} href="#" endIcon={<Theaters />}>
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>

            {/* ---  3 Button Grid --- */}
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                {/* --- Add to Favorites Button --- */}
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <Favorite /> : <FavoriteBorderOutlined />
                  }
                >
                  {isMovieFavorited ? "Unfavorite" : "Favorite"}
                </Button>

                {/* --- Add to Watchlist Button --- */}
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>

                {/* --- Movie Trailer Button --- */}
                <Button
                  sx={{ borderColor: "primary.main" }}
                  endIcon={<ArrowBack />}
                >
                  <Typography
                    style={{ textDecoration: "none" }}
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieInformation;
