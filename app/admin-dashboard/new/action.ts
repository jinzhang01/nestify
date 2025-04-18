"use server"

import { auth, firestore } from "@/firebase/server";
import { propertyDetailsSchema } from "@/validation/propertySchema";
import { z } from "zod";


export const createNewProperty = async (data:
    {
        address1: string;
        address2?: string;
        city: string;
        postcode: string;
        price: number;
        bedrooms: number;
        bathrooms: number;
        status:
        "draft" | "for-sale" | "sold" | "withdrawn";
        description: string;
        token: string;
    }
) => {
    const { token, ...propertyData } = data;
    const verfiedToken = await auth.verifyIdToken(data.token);

    if (!verfiedToken.admin) {
        return { error: true, message: "You are not authorized to perform this action" }
    }

    const validation = propertyDetailsSchema.safeParse(propertyData);
    if (!validation.success) {
        return { error: true, message: validation.error.issues[0]?.message ?? "A validation error occured" }
    }

    const property = await firestore.collection("properties").add({
        ...propertyData,
        created: new Date(),
        updated: new Date(),
    });

    return {
        propertyId: property.id,
    }
}


export const savePropertyImages = async ({ propertyId, images }: { propertyId: string, images: string[] }, authToken: string) => {
    const verfiedToken = await auth.verifyIdToken(authToken);

    if (!verfiedToken.admin) {
        return { error: true, message: "You are not authorized to perform this action" }
    }

    const schema = z.object({
        propertyId: z.string(),
        images: z.array(z.string())
    })
    const validation = schema.safeParse({ propertyId, images });
    if (!validation.success) {
        return { error: true, message: validation.error.issues[0]?.message ?? "A validation error occured" }
    }
    await firestore.collection("properties").doc(propertyId).update({
        images})
}