import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of routes that require authentication.  If the user isn't
// authenticated (no Supabase session cookie) they will be redirected to /login.
const PROTECTED_PATHS = [
  '/dashboard',
  '/jobs',
  '/projects',
  '/clients',
  '/team',
  '/messages',
  '/homepage-management'
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const requiresAuth = PROTECTED_PATHS.some(
    p => pathname === p || pathname.startsWith(`${p}/`)
  )
  if (!requiresAuth) return NextResponse.next()

  // Supabase auth cookie name: "sb:token" or similar; we simply check for any cookie starting with "sb-"
  const hasSession = Array.from(req.cookies.keys()).some(key => key.startsWith('sb-'))
  if (!hasSession) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

// Apply middleware to all routes except static assets and API routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)']
}