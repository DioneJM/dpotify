import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { NextApiResponse } from "next";
import cookie from "cookie";

export const generateSignedJwtFor = (user: User) => {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      signedOn: Date.now(),
    },
    "secret_hello", // TODO put this in environment variable
    { expiresIn: "8h" }
  );
};

export const setJwtCookie = (token: string, response: NextApiResponse) => {
  response.setHeader(
    "Set-Cookie",
    cookie.serialize("TRAX_ACCESS_TOKEN ", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60, // 8 hours
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
};
