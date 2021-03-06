import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { JwtToken, secret } from "./jwt";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      console.log("no token in request found");
      res.status(401);
      res.json({ error: "Not authorised" });
      return;
    }

    let user;
    try {
      const { id } = jwt.verify(token, secret) as JwtToken;
      console.log("id: ", id);
      user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error("Not real user");
      }
    } catch (e) {
      console.log("Failed to verify token: ", JSON.stringify(e));
      res.status(401);
      res.json({ error: "Not authorised" });
      return;
    }

    return handler(req, res, user);
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, secret);
  return user;
};
