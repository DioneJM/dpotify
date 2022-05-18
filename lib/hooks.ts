import useSWR from "swr";
import { User, Playlist } from "@prisma/client";
import fetcher from "./fetcher";

export const useMe = () => {
  const { data, error } = useSWR<User & { playlistCount: number }>(
    "/me",
    fetcher
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const usePlaylist = (): {
  playlists: Playlist[];
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR<Playlist[]>("/playlists", fetcher);
  return {
    playlists: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
};
