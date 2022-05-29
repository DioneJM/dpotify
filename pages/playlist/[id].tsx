import { Playlist, Song } from "@prisma/client";
import { Box, Text } from "@chakra-ui/react";
import prisma from "../../lib/prisma";
import { validateToken } from "../../lib/auth";
import GradientLayout from "../../components/GradientLayout";

interface ServerSideProps {
  playlist: Playlist & { songs: Song[] };
}

const PlaylistId = ({ playlist }: ServerSideProps) => {
  return (
    <GradientLayout
      title={playlist.name}
      imageSrc="https://placedog.net/300/300"
    >
      <Box paddingX="40px">
        {playlist.songs?.map((song) => (
          <Box color="white" paddingY={"8px"}>
            <Box bg="green.800">
              <Text>{song.name}</Text>
              <Text>{song.artist.name}</Text>
              <Text>{song.url}</Text>
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
