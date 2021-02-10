import { Button } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";

import css from "./index.module.css";

const Controls: React.FC = observer(() => {
  return (
    <div className={css.controls}>
      <Button type="primary">Sort</Button>
      <Button type="primary">Randomize</Button>
      <Button type="primary">Reset</Button>
    </div>
  );
});

export default Controls;
