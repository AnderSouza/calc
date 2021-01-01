import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FormulaTextHandler } from "./components/index";
import Wrapper from "./components/wrapper";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Wrapper>
      <FormulaTextHandler />
    </Wrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
