import React, { useEffect, useContext } from "react";

// change color functionality
import { ColorModeContext } from "../../utils/ToggleColorMode";

// login/logout fu nctionality
import { fetchToken } from "../../utils";

import alanBtn from "@alan-ai/alan-sdk-web";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);

  useEffect(() => {
    alanBtn({
      key: "2b1895da36ff0dd996d6432757a753d32e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode }) => {
        if (command === "changeMode") {
          // Call the client code that will react to the received command
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();

          window.location.href = "/";
        }
      },
    });
  }, []);

  return <div>Alan</div>;
};

export default useAlan;
