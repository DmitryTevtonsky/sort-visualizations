import React, { useMemo } from "react";

import { CoreStoreInstance } from "../main/store";
import { StoreState } from "./store-types";

type StoreProviderProps = {
  children?: React.ReactNode;
};
export const StoreProvider: React.FC = ({ children }: StoreProviderProps) => {
  const core = CoreStoreInstance;

  const store = useMemo(() => ({ core }), [core]);

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const storeContext = React.createContext<StoreState | null>(null);

export default StoreProvider;
