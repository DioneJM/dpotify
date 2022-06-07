import { NextRequest, NextResponse } from "next/server";

const publicPages = ["/signin", "/signup", "/public", "/share"];

// We don't take in a response object because this will be run on the edge similar to a web worker
export default function middleware(req: NextRequest) {
  const pageRequiresSignIn = !publicPages.some((route) =>
    req.nextUrl.pathname.includes(route)
  );
  if (pageRequiresSignIn) {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("/signin");
    }
  }
}
