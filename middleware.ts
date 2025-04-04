import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest){

    if (request.method === "POST") {
        return NextResponse.next()
    }

    // page request can only be GET
    const cookieStore = await cookies();
    const token = cookieStore.get("firebaseAuthToken")?.value;


    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));  // redirect to homepage's absolute URL
    }

    const decodedToken =  decodeJwt(token);

    // // check if the token is expired
    // if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now() ) {
    //     return NextResponse.redirect (
    //         new URL (`/api/refresh-token?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url)  // redirect to refresh token API
    //     )
    // }


    if (!decodedToken.admin && request.nextUrl.pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/", request.url));  // redirect to homepage's absolute URL
    }

    if (decodedToken.admin && request.nextUrl.pathname.startsWith("/account/my-favourites")) {
        return NextResponse.redirect(new URL("/", request.url));  // redirect to homepage's absolute URL
    }

    return NextResponse.next()
}

export const config = {
    matcher:["/admin-dashboard", "/admin-dashboard/:path*", "/account", "/account/my-favourites"]
}