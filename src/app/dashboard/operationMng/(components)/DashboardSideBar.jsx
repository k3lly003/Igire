'use client';
import clsx from 'clsx';
import { GoHome } from "react-icons/go";
import { LuShoppingCart } from "react-icons/lu";
import { IoReceiptOutline } from "react-icons/io5";
import { LiaTagsSolid } from "react-icons/lia";
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
                            href="/dashboard/operationMng"
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2  transition-all",
                                pathname === '/dashboard/operationMng' && "text-[#F79E1B]"
                            )}
                        >
                            <GoHome className="h-3 w-3" />
                            Home
                        </Link>
                        <Link
                            href="/dashboard/operationMng/purchaseOrder"
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-[#F79E1B]",
                                pathname.startsWith('/dashboard/operationMng/purchaseOrder') && "text-[#F79E1B]"
                            )}
                        >
                            <LuShoppingCart className="h-3 w-3" />
                            Purchase order
                        </Link>
                        <Link
                            href="/dashboard/operationMng/stock"
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-[#F79E1B]",
                                pathname.startsWith('/dashboard/operationMng/stock') && "text-[#F79E1B]"
                            )}
                        >
                            <LiaTagsSolid className="h-3 w-3" />
                            Stock
                        </Link>
                        <Link
                            href="/dashboard/operationMng/receipt"
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:text-[#F79E1B]",
                                pathname.startsWith('/dashboard/operationMng/receipt') && "text-[#F79E1B]"
                            )}
                        >
                            <IoReceiptOutline className="h-3 w-3" />
                            Receipt
                        </Link>
                    </div>
                    <div>
                        <Link
                            href="/dashboard/admin/logout"
                            className={clsx(
                                "flex items-center gap-2 rounded-lg px-3  transition-all hover:text-[#F79E1B]",
                                pathname === '/dashboard/admin/logout' && "text-[#F79E1B]"
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