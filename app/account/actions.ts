"use server"

import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";

export const deleteUserFavourotes = async () => {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("firebaseAuthToken")?.value;

    if (!token) {
        return;
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        await firestore.collection("favourites").doc(decodedToken.uid).delete();
    } catch(e) {

    }
}