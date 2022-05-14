import { NextRequest, NextResponse } from "next/server";

const signedInPages = ["/", "/playlist", "/library"];

// We don't take in a response object because this will be run on the edge similar to a web worker
export default function middleware(req: NextRequest) {
  if (signedInPages.includes(req.nextUrl.pathname)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
