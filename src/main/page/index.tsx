// import "./App.css";
import { observer } from "mobx-react-lite";
import { useRootData } from "hooks";
import { v4 as uuidv4 } from "uuid";
import React from "react";

import { Controls, NumberColumn } from "../components";
import css from "./index.module.css";

const Core: React.FC = observer(() => {
  // const { t } = useTranslation();
  const { arraySample } = useRootData((store) => ({
    arraySample: store.core.arraySample,
  }));
  return (
    <div className={css.main}>
      <div className={css.mainLayout}>
        <h1 className={css.mainTitle}>Bubble sort visualization</h1>
        <div className={css.arrayLayout}>
          {arraySample.map((element) => (
            <NumberColumn key={uuidv4()} value={element} />
          ))}
        </div>
        <Controls />
      </div>
    </div>
  );
});

export default Core;
