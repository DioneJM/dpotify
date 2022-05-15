import useSWR from "swr";
import { User } from "@prisma/client";
import fetcher from "./fetcher";

export const useMe = () => {
  const { data, error } = useSWR<User>("/me", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR<User>("/playlist", fetcher);

  return {
    playlists: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
};
