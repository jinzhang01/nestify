"use client";

import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation"


export default function Login() {
    const router = useRouter();
    // if already logged in, redirect to homepage
    if (auth.currentUser) {
        return router.push("/");
        
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <ContinueWithGoogleButton />
                </CardContent>
    
            </Card>


        </div>
    );
}