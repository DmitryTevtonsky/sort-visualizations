// import "./App.css";
import { observer } from "mobx-react-lite";
import React from "react";

import css from "./index.module.css";

type NumberColumnProps = {
  value: number;
};

const NumberColumn: React.FC<NumberColumnProps> = observer(
  ({ value }: NumberColumnProps) => {
    return <div className={css.numberColumn}>{value}</div>;
  }
);

export default NumberColumn;
