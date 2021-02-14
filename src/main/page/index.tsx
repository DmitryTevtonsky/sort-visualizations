// import "./App.css";
import { observer } from "mobx-react-lite";
import { useRootData } from "hooks";
import { v4 as uuidv4 } from "uuid";
import React, { useMemo } from "react";

import { Controls, NumberColumn } from "../components";
import css from "./index.module.css";

const Core: React.FC = observer(() => {
  // const { t } = useTranslation();
  const { sample, sortedSample } = useRootData((store) => ({
    sample: store.core.sample,
    sortedSample: store.core.sortedSample,
  }));

  const array = useMemo(() => (sortedSample.length ? sortedSample : sample), [
    sample,
    sortedSample,
  ]);

  return (
    <div className={css.main}>
      <div className={css.mainLayout}>
        <h1 className={css.mainTitle}>Visualizations of sorting algorithms</h1>
        <div className={css.arrayLayout}>
          {array.map((element) => (
            <NumberColumn key={uuidv4()} value={element} />
          ))}
        </div>
        <Controls />
      </div>
    </div>
  );
});

export default Core;
