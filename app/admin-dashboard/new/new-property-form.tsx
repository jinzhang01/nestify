"use client"
import { propertyDetailsSchema } from "@/validation/propertySchema"
import PropertyForm from "@/components/property-form"
import { z } from "zod"
import { PlusCircleIcon } from "lucide-react";



export default function NewPropertyForm() {
    const handleSubmit = async (data: z.infer<typeof propertyDetailsSchema>) => {
        console.log({ data })
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