import { makeAutoObservable } from "mobx";

export class MainStore {
  count = 0;

  constructor(initialCount?: number) {
    makeAutoObservable(this);

    if (typeof initialCount === "number") {
      this.setStoredSharkCount(initialCount);
      this.count = initialCount;
    } else {
      this.initializeSharkCount();
    }
  }

  initializeSharkCount() {
    const storedCount = this.getStoredSharkCount();
    if (storedCount === null || storedCount === undefined) {
      this.setStoredSharkCount(0);
      this.count = 0;
    } else {
      this.count = storedCount;
    }
  }

  getStoredSharkCount(): number | null {
    const sharkCount = localStorage.getItem("created-shark-count");
    return sharkCount !== null ? parseInt(sharkCount) : null;
  }

  setStoredSharkCount(value: number) {
    localStorage.setItem("created-shark-count", value.toString());
  }

  increment() {
    this.count += 1;
    this.setStoredSharkCount(this.count);
  }

  get currentSharkCount() {
    return this.count;
  }

  decrement() {
    this.count -= 1;
  }

  // Computed value example
  get isPositive() {
    return this.count > 0;
  }
}
