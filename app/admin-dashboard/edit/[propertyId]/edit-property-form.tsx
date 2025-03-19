"use client"

import PropertyForm from "@/components/property-form"
import { auth } from "@/firebase/client"
import { Property } from "@/types/Property"
import { propertyDetailsSchema } from "@/validation/propertySchema"
import { SaveIcon } from "lucide-react"
import { z } from "zod"
import { updateProperty } from "../action"
import { useRouter } from "next/navigation"
import { toast } from "sonner";

type Props = Property

export default function EditPropertyForm({
    id,
    address1,
    address2,
    postcode,
    price,
    status,
    city,
    bedrooms,
    bathrooms,
    description,
}: Props) {
    const router = useRouter();
    const handleSubmit = async (data: z.infer<typeof propertyDetailsSchema>) => {
        const token = await auth?.currentUser?.getIdToken();
        if (!token) {
            return
        }

        await updateProperty({...data, id}, token);
        toast.success("Success!", { description: "Property updated successfully" });
        router.push("/admin-dashboard")
    }
    return <div>
        <PropertyForm handleSubmit={handleSubmit} 
        submitButtonlabel={<><SaveIcon />Save Property</> }
        defaultValues={
            {
                address1,
                address2,
                postcode,
                price,
                city,
                status,
                bedrooms,
                bathrooms,
                description,
            }} />
    </div>
}