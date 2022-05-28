import { Playlist } from "@prisma/client";
import prisma from "../../lib/prisma";
import { Simulate } from "react-dom/test-utils";
import { validateToken } from "../../lib/auth";

interface ServerSideProps {
  playlist: Playlist;
}

const PlaylistId = ({ playlist }: ServerSideProps) => {
  return <div>playlist</div>;
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
