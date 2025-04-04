import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyByID } from "@/data/properties";
import EditPropertyForm from "./edit-property-form";

export default async function EditProperty({ params }: { params: Promise<any> }) {
    const paramsValue = await params;
    const property = await getPropertyByID(paramsValue.propertyId);

    return (
        <div>
            <Breadcrumbs items={
                [
                    { label: "Dashboard", href: "/admin-dashboard" },
                    { label: "Edit Property" }
                ]
            }
            />

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle >Edit Property</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditPropertyForm id={property.id}
                    address1={property.address1}
                    address2={property.address2}
                    postcode={property.postcode}
                    price={property.price}
                    status={property.status}
                    city={property.city}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    description={property.description}
                    images={property.images || []}

                    />
                </CardContent>
            </Card>

        </div>
    )
}