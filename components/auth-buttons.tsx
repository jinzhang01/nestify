"use client"; // ✅ Mark as a Client Component -- this is imporant to use the client side

import { useAuth } from "@/context/auth";
import Link from "next/link"; // Import Link for navigation
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";


export default function AuthButtons() {
    const auth = useAuth();
    console.log("user loged in");

    return (
        <div>
            {auth?.currentUser ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            {auth.currentUser.photoURL && (
                                <Image
                                    src={auth.currentUser.photoURL}
                                    alt={`${auth.currentUser.displayName} avatar`}
                                    width={70}
                                    height={70}
                                />)
                            }
                            <AvatarFallback>
                                {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
                            </AvatarFallback>
                        </Avatar>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            <div>{auth.currentUser.displayName}</div>
                            <div className="font-normal text-xs">{auth.currentUser.email}</div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/account">My Account</Link>
                        </DropdownMenuItem>
                        {!!auth.customClaims?.admin && (
                            <DropdownMenuItem asChild>
                                <Link href="/admin-dashboard">Admin Dashboard</Link>
                            </DropdownMenuItem>)}
                        {!auth.customClaims?.admin && (<DropdownMenuItem asChild>
                            <Link href="/account/my-favourites">My Favourites</Link>
                        </DropdownMenuItem>)}


                        <DropdownMenuItem onClick={
                            async () => {
                                await auth.logout();
                            }
                        }>Log Out</DropdownMenuItem>


                    </DropdownMenuContent>
                </DropdownMenu>

            ) : (
                <div className="flex gap-2 items-center">
                    <Link href="/login" className="uppercase tracking-widest hover:underline">Login</Link>
                    <div className="h-8 w-[1px] bg-white/50" />
                    <Link href="/register" className="uppercase tracking-widest hover:underline">Sign Up</Link>
                </div>
            )}
        </div>
    );
}