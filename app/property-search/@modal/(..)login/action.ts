"use server";

import { revalidatePath } from "next/cache";


export const loginSucess = async () => {
    revalidatePath("/property-search");
}