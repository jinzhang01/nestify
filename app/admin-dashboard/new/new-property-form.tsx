"use client"
import { propertySchema } from "@/validation/propertySchema"
import PropertyForm from "@/components/property-form"
import { z } from "zod"
import { PlusCircleIcon } from "lucide-react";
import { useAuth } from "@/context/auth";
import { createNewProperty } from "./action";
import { savePropertyImages } from "../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { storage } from "@/firebase/client";




export default function NewPropertyForm() {
    const auth = useAuth();
    const router = useRouter();
    const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
        const token = await auth?.currentUser?.getIdToken();
        if (!token) {
            return
        }

        const { images, ...rest } = data;
        const response = await createNewProperty({ ...rest, token });

        if (response.error || !response.propertyId) {
            toast.error("Error!", { description: response.message })
            return
        }

        const uploadTasks: UploadTask[] = [];
        const paths: string[] = [];
        images.forEach((image, index) => {
            if(image.file) {
                const path = `properties/${response.propertyId}/${Date.now()}-${index}-${image.file.name}`;
                paths.push(path);
                const storageRef = ref(storage, path);
                uploadTasks.push(uploadBytesResumable(storageRef, image.file));
            }})
            await Promise.all(uploadTasks);
            await savePropertyImages({ propertyId: response.propertyId, images: paths }, token);

        
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