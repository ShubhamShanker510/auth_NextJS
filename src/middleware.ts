import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    // checking current path
    const path=request.nextUrl.pathname

    // defining two paths public and private
    const isPublicPath = path ==='/login' || path==='/signup' || path==='/verifyemail'

    const token=request.cookies.get("token")?.value || ''

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.url))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }


}
 
// on which path middleware should apply
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/verifyemail',
    '/profile'
  ]
}