import React from "react";

// react dom
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// styles
import "./index.css";
// dark/light mode toggler
import ToggleColorModeProvider from "./utils/ToggleColorMode";

// redux
import { Provider } from "react-redux";
// redux store
import store from "./app/store";

// components
import App from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
  </Provider>,
  document.getElementById("root")
);
