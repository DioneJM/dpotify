import { createStore, action, Action } from "easy-peasy";
import { Song } from "@prisma/client";

export interface ApplicationState {
  activeSongs: Song[];
  activeSong: Song;
  changeActiveSongs: Action<ApplicationState>;
  changeActiveSong: Action<ApplicationState>;
}

export const store = createStore<ApplicationState>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action<ApplicationState>((state, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action<ApplicationState>((state, payload) => {
    state.activeSong = payload;
  }),
});
