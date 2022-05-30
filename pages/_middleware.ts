import { NextRequest, NextResponse } from "next/server";

const signedOutPages = ["/signin", "/signup"];

// We don't take in a response object because this will be run on the edge similar to a web worker
export default function middleware(req: NextRequest) {
  const pageRequiresSignIn = !signedOutPages.some((route) =>
    req.nextUrl.pathname.includes(route)
  );
  if (pageRequiresSignIn) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
