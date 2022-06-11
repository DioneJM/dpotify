import { Playlist, Song } from "@prisma/client";
import { Box } from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/SongsTable";
import BottomPlayer from "../../components/BottomPlayer";
import { bottomPlayerHeight } from "../../components/PlayerLayout";
import { useMobileLayout } from "../../lib/hooks";

export interface PlaylistServerSideProps {
  playlist: Playlist & { songs: Song[] };
  shared: boolean;
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

const PlaylistId = ({ playlist, shared }: PlaylistServerSideProps) => {
  const color = getBGColor(playlist.id);
  const [mobileLayout] = useMobileLayout();
  return (
    <>
      <GradientLayout
        title={playlist.name}
        subtitle="playlist"
        description={`${playlist.songs.length} songs`}
        color={color}
        imageSrc={`https://picsum.photos/400?random=${playlist.id}`}
      >
        <Box
          paddingX={mobileLayout ? "0px" : "40px"}
          paddingBottom={mobileLayout ? "40px" : "0px"}
          overflowY="auto"
        >
          <SongsTable songs={playlist.songs} />
        </Box>
      </GradientLayout>
      {shared && (
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
}): Promise<{
  props: PlaylistServerSideProps;
}> => {
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
    props: { playlist, shared: false },
  };
};

export default PlaylistId;
