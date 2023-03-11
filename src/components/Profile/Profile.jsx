// state
import React, { useEffect } from "react";

// mui components
import { Typography, Button, Box } from "@mui/material";
// mui icons
import { ExitToApp } from "@mui/icons-material";

// redux
import { useSelector } from "react-redux";
// redux helper function to access user object
import { userSelector } from "../../features/auth";

const Profile = () => {
  const { user } = useSelector(userSelector);

  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  const favoriteMovies = [];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies.length ? (
        <Typography variant="h5">
          Add favorites or watchlist some movies to see them here
        </Typography>
      ) : (
        <Box>FAVORITE MOVIES</Box>
      )}
    </Box>
  );
};

export default Profile;
