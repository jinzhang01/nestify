"use client"
import { LogIn } from "lucide-react";
import { Button } from "./ui/button"
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";


export default function ContinueWithGoogleButton({ onSuccess }: { onSuccess?: () => void }) {
    const auth = useAuth();
    const router = useRouter();


    return (
        <Button onClick={async() => {
            await auth?.loginwithGoogle()
            // router.refresh()
            onSuccess?.();
        }}
        className="w-full"
        >
            <LogIn />
            Continue with Google
        </Button>
    )
}