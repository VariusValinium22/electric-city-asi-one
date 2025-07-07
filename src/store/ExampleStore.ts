import { makeAutoObservable } from "mobx";

export class ExampleStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count += 1;
  }

  decrement() {
    this.count -= 1;
  }

  // Computed value example
  get isPositive() {
    return this.count > 0;
  }
}
