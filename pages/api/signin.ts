import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import { generateSignedJwtFor, setJwtCookie } from "../../lib/auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (e) {
    console.log("failed to create user: ", e);
    res.status(401);
    res.json({ error: "Signup Failed" });
  }

  if (!user) {
    res.status(401);
    res.json({ error: "Failed to login with provided credentials" });
  } else if (bcrypt.compareSync(password, user.password)) {
    const token = generateSignedJwtFor(user);
    setJwtCookie(token, res);
    res.json(user);
  }
};
