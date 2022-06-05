import { Song } from "@prisma/client";

export const shuffleSongs = (songsToShuffle: Song[]) => {
  const shuffledSongs = [...songsToShuffle];
  // Fisher Method shuffle
  let j;
  let x;
  let index;
  for (index = shuffledSongs.length - 1; index > 0; index -= 1) {
    j = Math.floor(Math.random() * (index + 1));
    x = shuffledSongs[index];
    shuffledSongs[index] = shuffledSongs[j];
    shuffledSongs[j] = x;
  }
  return shuffledSongs;
};
