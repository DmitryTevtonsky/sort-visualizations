import React from "react";
import ReactDOM from "react-dom";

import { Core, StoreProvider } from "./main";

import "./index.module.css";
import "antd/dist/antd.less";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Core />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
