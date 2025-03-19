"use server"

import { auth, firestore } from "@/firebase/server";
import { Property } from "@/types/Property"
import { propertyDetailsSchema } from "@/validation/propertySchema";

export const updateProperty = async (data: Property, authToken: string) => {
    const { id, ...propertyData } = data;
    const verfiedToken = await auth.verifyIdToken(authToken);

    if (!verfiedToken.admin) {
        return { error: true, message: "You are not authorized to perform this action" }
    }

    const validation = propertyDetailsSchema.safeParse(propertyData);
    if (!validation.success) {
        return { error: true, message: validation.error.issues[0]?.message ?? "A validation error occured" }
    }

    await firestore.collection("properties").doc(id).update({
        ...propertyData,
        updated: new Date(),
    });
}