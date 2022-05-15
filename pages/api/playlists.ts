import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(async (req, res, user) => {
  try {
    const playlists = await prisma.playlist.findMany({
      where: {
        userId: user.id,
      },
    });
    res.json(playlists);
  } catch (e) {
    console.log("failed to get playlist for user");
    res.status(401);
    res.json({ error: "Failed to retrieve playlists" });
  }
});
