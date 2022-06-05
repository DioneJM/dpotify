import { createStore, action, Action } from "easy-peasy";
import { Song } from "@prisma/client";

interface ApplicationState {
  activeSongs: Song[];
  activeSong: Song;
  changeActiveSongs: Action<Song[]>;
}

export const store = createStore<ApplicationState>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action<ApplicationState>((state, payload) => {
    state.activeSongs = payload;
  }),
});
