import { getTotalPages } from "@/firebase/server";
import { Property } from "@/types/Property";
import { PropertyStatus } from "@/types/propertyStatus";
import { firestore } from "firebase-admin";
import "server-only";

type GetPropertiesOptions = {
    filters?: {
        minPrice?: number | null;
        maxPrice?: number | null;
        minBedrooms?: number | null;
        maxBedrooms?: number | null;
        status?: PropertyStatus | null;
    }
    pagenation?: {
        pageSize?: number;
        page?: number;
    }
}

export const getProperties = async (options?: GetPropertiesOptions) => {
    const page = options?.pagenation?.page || 1;
    const pageSize = options?.pagenation?.pageSize || 10;
    const { minPrice, maxPrice, minBedrooms, maxBedrooms, status } = options?.filters || {};

    let propertiesQuery = firestore().collection("properties").orderBy("updated", "desc");

    if (minPrice !== null && minPrice !== undefined) {
        propertiesQuery = propertiesQuery.where("price", ">=", minPrice);
    }
    if (maxPrice !== null && maxPrice !== undefined) {
        propertiesQuery = propertiesQuery.where("price", "<=", maxPrice);
    }
    if (minBedrooms !== null && minBedrooms !== undefined) {
        propertiesQuery = propertiesQuery.where("bedrooms", ">=", minBedrooms);
    }
    if (maxBedrooms !== null && maxBedrooms !== undefined) {
        propertiesQuery = propertiesQuery.where("bedrooms", "<=", maxBedrooms);
    }
    if (status) {
        propertiesQuery = propertiesQuery.where("status", "in", status);
    }

    const totalPages = await getTotalPages(propertiesQuery, pageSize);

    const propertiesSnapshot = await propertiesQuery.limit(pageSize).offset((page - 1) * pageSize).get();

    const properties = propertiesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()}) as Property);


    return {data: properties, totalPages};

}
