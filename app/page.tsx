import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen relative p-24 -mt-12 flex items-center justify-center overflow-hidden">
      <Image fill className="object-cover" src="/Homepage_background.png" alt="" />
      <div className="absolute top-0 left-0 size-full bg-black/50 backdrop-blur-sm" />

      <div className="flex flex-col gap-10 text-white relative z-10">
        <h1 className="uppercase tracking-widest font-semibold text-5xl max-w-screen-md text-center">Find Your New Home With Nestify</h1>
        <Button asChild className="mx-auto p-8 text-lg gap-5">
          <Link href="/property-search"><SearchIcon /> Search Properties</Link>
        </Button>

      </div>

      <p className="absolute bottom-4 w-full text-center text-sm opacity-80 text-white z-10">
        <strong>Disclaimer:</strong> This demo site is for illustrative purposes only. All property listings shown here are fictional and do not represent actual properties or availability.
      </p>
    </main>
  );
}
