"use client"
import { Button } from "./ui/button"
import { useAuth } from "@/context/auth";

export default function ContinueWithGoogleButton() {
    const auth = useAuth();

    return (
        <Button onClick={() => {
            auth?.loginwithGoogle()
        }}
        className="w-full"
        >
            Continue with Google
        </Button>
    )
}