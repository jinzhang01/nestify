"use client"

import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel, AlertDialogDescription } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { removeToken } from "@/context/actions";
import { useAuth } from "@/context/auth";
import { GoogleAuthProvider, reauthenticateWithPopup, deleteUser } from "firebase/auth";
import { useState } from "react"
import { toast } from "sonner";
import { deleteUserFavourotes } from "./actions";

export default function DeleteAccountButton() {
    const auth = useAuth();
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDeleteClick = async () => {
        if (auth?.currentUser) {
            setIsDeleting(true)
            try {
                const provider = new GoogleAuthProvider();
                await reauthenticateWithPopup(auth.currentUser, provider);
                // delete user's favourites 
                await deleteUserFavourotes()
                await deleteUser(auth.currentUser);
                await removeToken();


            } catch (error) {
                toast.error("Error deleting account. Please try again.");
                setIsDeleting(false)
            }
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">Delete Account</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete your account?
                    </AlertDialogTitle>
                    <AlertDialogDescription >
                        This action cannot be undone. Your account and all associated data will be permanently deleted.
                        
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteClick} disabled={isDeleting}> {isDeleting ? "Deleting..." : "Delete Account"} </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}