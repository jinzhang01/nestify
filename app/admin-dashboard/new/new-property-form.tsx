"use client"
import { propertyDetailsSchema } from "@/validation/propertySchema"
import PropertyForm from "@/components/property-form"
import { z } from "zod"
import { PlusCircleIcon } from "lucide-react";
import { useAuth } from "@/context/auth";
import { createNewProperty } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";




export default function NewPropertyForm() {
    const auth = useAuth();
    const router = useRouter();
    const handleSubmit = async (data: z.infer<typeof propertyDetailsSchema>) => {
        const token = await auth?.currentUser?.getIdToken();
        if (!token) {
            return
        }
        const response = await createNewProperty({ ...data, token });

        if (response.error) {
            toast.error("Error!", { description: response.message })
            return
        }
        
        if (!response.error) {
            toast.success("Success!", { description: "Property created successfully"})
        }
        router.push(`/admin-dashboard`)

    };
    return (<div>
        <PropertyForm handleSubmit={handleSubmit} submitButtonlabel={
            <>
                <PlusCircleIcon /> Create Property
            </>
        }
        />
    </div>)
}