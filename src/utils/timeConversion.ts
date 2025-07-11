// Gets millisecounds from secounds
export function getSecounds(secounds: number): number {
  return secounds * 1000;
}

// Gets millisecounds from minutes
export function getMinutes(minutes: number): number {
  return minutes * getSecounds(60);
}
