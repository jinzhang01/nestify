import { PropertyStatus } from "@/types/propertyStatus";
import { Badge } from "./ui/badge";

const statusLabel = {
    draft: "Draft",
    "for-sale": "For Sale", 
    sold: "Sold",
    withdrawn: "Withdrawn",
}

const variant:{[key:string]:"secondary"|"primary"|"success"|"destructive"} = {
    draft: "secondary",
    "for-sale": "primary", 
    sold: "success",
    withdrawn: "destructive",
}

export default function PropertyStatusBadge(
    {status} : {status: PropertyStatus}
){
    const label = statusLabel[status];
    return <Badge variant={variant[status]}>{label}
        
    </Badge>

}