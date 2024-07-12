import { hasCookie } from "cookies-next"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export function middleware(request) {
  let isAuthenticated = false

  // Check if is invited user
  if (hasCookie("guest", { cookies })) {
    isAuthenticated = true
  }

  // Check if connected

  // Check if isAuthenticated
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
