import { Playlist, Song } from "@prisma/client";
import { Box } from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/SongsTable";
import BottomPlayer from "../../components/BottomPlayer";
import { bottomPlayerHeight } from "../../components/PlayerLayout";

export interface PlaylistServerSideProps {
  playlist: Playlist & { songs: Song[] };
  user?: any;
}

const getBGColor = (id) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const PlaylistId = ({
  playlist,
  user = undefined,
}: PlaylistServerSideProps) => {
  const color = getBGColor(playlist.id);
  const loggedIn = !!user;
  return (
    <>
      <GradientLayout
        title={playlist.name}
        subtitle="playlist"
        description={`${playlist.songs.length} songs`}
        color={color}
        imageSrc={`https://picsum.photos/400?random=${playlist.id}`}
      >
        <Box paddingX="40px" overflowY="auto">
          <SongsTable songs={playlist.songs} />
        </Box>
      </GradientLayout>
      {!loggedIn && (
        <Box
          position="absolute"
          left="0"
          bottom="0"
          width="100vw"
          height={bottomPlayerHeight}
          overflow="hidden"
        >
          <BottomPlayer />
        </Box>
      )}
    </>
  );
};

export const getServerSideProps = async ({
  query,
  req,
}): Promise<{
  props: PlaylistServerSideProps;
}> => {
  // @ts-ignore
  const user =
    req.cookies.TRAX_ACCESS_TOKEN &&
    validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: parseInt(query.id, 10),
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist, user },
  };
};

export default PlaylistId;
