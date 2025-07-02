import { makeAutoObservable } from 'mobx';
import { ExampleStore } from './ExampleStore';

export class RootStore {
  exampleStore: ExampleStore;

  constructor() {
    this.exampleStore = new ExampleStore();
    makeAutoObservable(this);
  }
}

// Create a single instance of the store
export const rootStore = new RootStore(); 