export const secondsToMinutes = (amountInSeconds: number): string => {
  const minutes = Math.floor(amountInSeconds / 60);
  const seconds: number = Math.round(amountInSeconds - minutes * 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
