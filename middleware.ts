import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest){
    console.log("middleware:", request.url)

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
    if (!decodedToken.admin) {
        return NextResponse.redirect(new URL("/", request.url));  // redirect to homepage's absolute URL
    }
    return NextResponse.next()
}

export const config = {
    matcher:["/admin-dashboard"]
}