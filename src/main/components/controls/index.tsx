import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useRootData } from "hooks";
import React from "react";

import css from "./index.module.css";

const Controls: React.FC = observer(() => {
  const { createSample, sortSample, resetSample } = useRootData((store) => ({
    createSample: store.core.createSample,
    sortSample: store.core.sortSample,
    resetSample: store.core.resetSample,
  }));

  const handleSort = () => sortSample();
  const handleCreateSample = () => createSample();
  const handleReset = () => resetSample();

  return (
    <div className={css.controls}>
      <Button onClick={handleSort} type="primary">
        Sort
      </Button>
      <Button onClick={handleCreateSample} type="primary">
        Randomize
      </Button>
      <Button onClick={handleReset} type="primary">
        Reset
      </Button>
    </div>
  );
});

export default Controls;
