"use client"

import PropertyForm from "@/components/property-form"
import { auth, storage } from "@/firebase/client"
import { Property } from "@/types/Property"
import { propertySchema } from "@/validation/propertySchema"
import { SaveIcon } from "lucide-react"
import { z } from "zod"
import { updateProperty } from "../action"
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import { deleteObject, ref, uploadBytesResumable, UploadTask } from "firebase/storage"
import { savePropertyImages } from "../../action"

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
    images = []
}: Props) {
    const router = useRouter();
    const handleSubmit = async (data: z.infer<typeof propertySchema>) => {
        const token = await auth?.currentUser?.getIdToken();

        if (!token) {
            return
        }

        const {images: newImages, ...rest} = data

        const response = await updateProperty({ ...rest, id }, token);

        if(!!response?.error) {
            toast.error("Error!", { description: response.message });
            return
        }

        const storageTasks: (UploadTask | Promise<void>)[] = [];
        const imagesToDelete = images.filter(image => !newImages.find(newImage => image === newImage.url))

        imagesToDelete.forEach(image => {
            storageTasks.push(deleteObject(ref(storage, image)))
        })

        const paths: string[] = [];
        newImages.forEach((image, index) => {
            if(image.file) {
                const path = `properties/${id}/${Date.now()}-${index}-${image.file.name}`;
                paths.push(path);
                const storageRef = ref(storage, path);
                storageTasks.push(uploadBytesResumable(storageRef, image.file));
            } else {
                paths.push(image.url)
            }

        })

        await Promise.all(storageTasks);
        await savePropertyImages({ propertyId: id, images: paths }, token);

        toast.success("Success!", { description: "Property updated successfully" });
        router.push("/admin-dashboard")
    }
    return <div>
        <PropertyForm handleSubmit={handleSubmit}
            submitButtonlabel={<><SaveIcon />Save Property</>}
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
                    images: images.map((image) => ({
                        id: image,
                        url: image,
                    }))

                }} />
    </div>
}