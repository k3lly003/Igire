'use client';
import clsx from 'clsx';
import { GoHome } from "react-icons/go";
import { LuShoppingCart } from "react-icons/lu";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { RiLogoutCircleLine } from "react-icons/ri";
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function DashboardSideBar() {
    const pathname = usePathname();

    return (

        <div className="desktop:block hidden h-full">
            <div className="sticky top-0 flex h-full max-h-screen flex-col gap-[9rem] py-10 
            text-white bg-[#0B3004] border-r  pl-8">
                <nav className="flex flex-1 justify-between flex-col items-start text-md">
                    <div className="flex items-center w-full">
                        <Image
                            src="/logo.png"
                            alt="LOGO"
                            width={75}
                            height={75}
                            className="rounded-md"
                        />
                        <p className="font-bold flex flex-col items-center">
                            Igire Rwanda <span className="font-normal">Organization</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <Link
                            href="/dashboard/projectDir"
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 transition-all",
                                pathname === '/dashboard/projectDir' && "text-[#F79E1B]"
                            )}
                        >
                            <GoHome className="h-3 w-3" />
                            Home
                        </Link>
                        <Link
                            href="/dashboard/projectDir/request"
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-[#F79E1B]",
                                pathname.startsWith('/dashboard/projectDir/request') && "text-[#F79E1B]"
                            )}
                        >
                            <LuShoppingCart className="h-3 w-3" />
                            Transactions
                        </Link>
                        <Link
                            href="/dashboard/projectDir/stock"
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-[#F79E1B]",
                                pathname === '/dashboard/projectDir/stock' && "text-[#F79E1B]"
                            )}
                        >
                            <HiOutlineArchiveBox className="h-3 w-3" />
                            Stock
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/dashboard/projectDir/logout"
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-[#F79E1B]",
                                pathname === '/dashboard/projectDir/logout' && "text-[#F79E1B]"
                            )}
                        >
                            <RiLogoutCircleLine className="h-3 w-3" />
                            Logout
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
}