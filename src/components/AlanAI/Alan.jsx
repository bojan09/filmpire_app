import React, { useEffect, useContext } from "react";

// redux
import { useDispatch } from "react-redux";

// react dom
import { useHistory } from "react-router-dom";

import {
  selectGenreOrCategory,
  searchMovie,
} from "../../features/currentGenreOrCategory";

// change color functionality
import { ColorModeContext } from "../../utils/ToggleColorMode";

// login/logout fu nctionality
import { fetchToken } from "../../utils";

import alanBtn from "@alan-ai/alan-sdk-web";

const useAlan = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { setMode } = useContext(ColorModeContext);

  useEffect(() => {
    alanBtn({
      key: "2b1895da36ff0dd996d6432757a753d32e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        // SEARCH GENRES
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (foundGenre) {
            history.push("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else if (genreOrCategory) {
            // top rated | popular | upcoming
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            history.push("/");
            dispatch(selectGenreOrCategory(category));
          }

          // LIGHT / DARK MODE
        } else if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }

          // LOG IN / LOG OUT
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          history.push("/");
          // SEARCH FUNCTIONALITY
        } else if (command === "search") {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);

  return <div>Alan</div>;
};

export default useAlan;
