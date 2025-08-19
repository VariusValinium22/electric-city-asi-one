// Gets milliseconds from seconds
export function getSeconds(seconds: number): number {
  return seconds * 1000;
}

// Gets milliseconds from minutes
export function getMinutes(minutes: number): number {
  return minutes * getSeconds(60);
}
