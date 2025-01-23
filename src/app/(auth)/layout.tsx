"use client";

import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    return (
        <div className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Link href={'/'}>
                        <Image src="/logo.svg" alt="logo" width={152} height={56} />
                    </Link>
                    <Link href={`${pathname === "/sign-in" ? "/sign-up" : "/sign-in"}`} className={buttonVariants({ variant: 'secondary' })}>
                        {pathname === "/sign-in" ? "Sign Up" : "Sign In"}
                    </Link>
                </nav>
                <div className="flex flex-col items-center justify-center p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
