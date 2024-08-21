import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const session = request.cookies.get("session");
    console.log('mengambil cookie dari middleware: ', session?.value)

    
    
    if (!session) {
        return NextResponse.redirect(new URL("/admin-login", request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!admin-login|api|_next/static|_next/image|favicon.ico|images).*)",
    ],
};