import { Playlist, Song } from "@prisma/client";
import { Box, Text } from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/SongsTable";

interface ServerSideProps {
  playlist: Playlist & { songs: Song[] };
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

const PlaylistId = ({ playlist }: ServerSideProps) => {
  const color = getBGColor(playlist.id);
  return (
    <GradientLayout
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      color={color}
      imageSrc={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <Box paddingX="40px">
        <SongsTable songs={playlist.songs} />
        {playlist.songs?.map((song) => (
          <Box color="white" paddingY={"8px"}>
            <Box bg={`${color}.800`}>
              <Text fontSize="2xl" fontWeight="bold">
                {song.name}
              </Text>
              <Text fontSize="md">{song.artist.name}</Text>
              <Text>{song.url}</Text>
              <audio controls>
                <source src={song.url} />
              </audio>
            </Box>
          </Box>
        ))}
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({
  query,
  req,
}): Promise<{
  props: ServerSideProps;
}> => {
  const { id: userId } = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: parseInt(query.id, 10),
      userId,
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
    props: { playlist },
  };
};

export default PlaylistId;
