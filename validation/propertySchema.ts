import {z} from "zod"

export const peopertyDetailsSchema = z.object({
    address1: z.string().min(1, "Address1 must contain a value"),
    address2:z.string().optional(),
    city: z.string().min(3, "City must contain at least 3 characters"),
    postcode: z.string().refine((postcode) => {
        // a candidate postcode regex
        const postcodeRegex  = /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/i;
        return postcodeRegex.test(postcode)
    }, "Invalid postcode"),
    description: z.string().min(40, "Description must contain at least 40 characters"),
    bedrooms: z.number().int().min(0, "Bedrooms must be at least 0"),
    bathrooms: z.number().int().min(0, "Bathrooms must be at least 0"),
    status: z.enum(["draft", "for-sale", "sold", "withdrawn"]),

})