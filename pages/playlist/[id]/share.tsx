import PlaylistId, { PlaylistServerSideProps } from "../[id]";
import { validateToken } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

const PublicPlaylist = PlaylistId;

PublicPlaylist.publicPage = true;

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
    props: { playlist, shared: true },
  };
};

export default PublicPlaylist;
