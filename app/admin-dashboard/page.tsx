import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div>
            <Breadcrumbs items={
                [
                    { label: "Dashboard" },
                ]}
            />
            <h1 className="text-4xl font-bold mt-6">Admin Dashboard</h1>
            {/* asChild tells your <Button> component to render the <Link> directly instead of wrapping it inside a <button>. */}
            <Button asChild className="inline-flex pl-2 gap-2 mt-4">
                <Link href="/admin-dashboard/new">
                    <PlusCircleIcon /> New Property
                </Link>
            </Button>

        </div>
    );
}