import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import { generateSignedJwtFor, setJwtCookie } from "../../lib/auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    console.log("failed to create user: ", e);
    res.status(401);
    res.json({ error: "Signup Failed" });
  }

  const token = generateSignedJwtFor(user);
  setJwtCookie(token, res);
  res.json(user);
};
