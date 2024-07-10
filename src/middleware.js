import { NextResponse } from "next/server"

export function middleware(request) {
  let isAuthenticated = false

  if (!isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
