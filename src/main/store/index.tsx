import { makeAutoObservable } from "mobx";
import createArray from "main/utils/create-array";

export class CoreStore {
  arraySample: number[];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.arraySample = createArray(5);
  }
}

export const CoreStoreInstance = new CoreStore();

export type CoreStoreType = typeof CoreStoreInstance;
