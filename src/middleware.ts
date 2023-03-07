import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseTokenFromRequest } from './backend/auth/getSupabaseTokenFromRequest'

export { default } from 'next-auth/middleware'

const ensureAuthenticated = (request: NextRequest) => {
  const token = getSupabaseTokenFromRequest(request)
  if (!token) {
    const url = new URL('/login', request.url)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const middleware = (request: NextRequest) => {
  return ensureAuthenticated(request)
}

export const config = {
  /**
   * middleware function will be applied to each page that matches array
   */
  matcher: ['/assignments'],
}
