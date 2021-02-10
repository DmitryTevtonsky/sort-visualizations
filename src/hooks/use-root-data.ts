import { StoreState } from "../store-provider/store-types";
import { storeContext } from "../store-provider";
import { useStoreData } from "./use-store-data";

export const useRootData = <Selection>(
  dataSelector: (store: StoreState) => Selection
): Selection =>
  useStoreData(storeContext, (contextData) => contextData!, dataSelector);
