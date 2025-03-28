"use client";

import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { loginSucess } from "./action";


export default function LoginModal () {
    const router = useRouter();

    return <Dialog open onOpenChange={() => {router.back()}}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription> You Must Log In to Favourite a Property</DialogDescription>
            </DialogHeader>

            <ContinueWithGoogleButton onSuccess={async () => {
                await loginSucess();
                router.back();
            }} />
        </DialogContent>
    </Dialog>
}