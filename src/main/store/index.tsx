/* eslint-disable no-console */
import { createArray, timer } from "main/utils";
import { makeAutoObservable } from "mobx";

import { SwapElements } from "./types";

export class CoreStore {
  sample: number[];

  sortedSample: number[];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.sample = createArray(8);
    this.sortedSample = [];
  }

  createSample(): void {
    this.sortedSample = [];
    this.sample = createArray(8);
  }

  swapElements({ next, curr, j }: SwapElements): void {
    this.sortedSample[j] = next;
    this.sortedSample[j + 1] = curr;
  }

  async sortSample(): Promise<void> {
    this.sortedSample = [...this.sample];

    for (let i = 0; i + 1 < this.sortedSample.length; i += 1) {
      for (let j = 0; j + 1 < this.sortedSample.length - i; j += 1) {
        const curr = this.sortedSample[j];
        const next = this.sortedSample[j + 1];
        if (next < curr) {
          // eslint-disable-next-line no-await-in-loop
          await timer(1000);
          this.swapElements({ next, curr, j });
        }
      }
    }
  }

  resetSample(): void {
    this.sortedSample = [];
  }
}

export const CoreStoreInstance = new CoreStore();

export type CoreStoreType = typeof CoreStoreInstance;
