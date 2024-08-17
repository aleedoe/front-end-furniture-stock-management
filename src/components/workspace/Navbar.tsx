"use client"

import React, { useState } from 'react'
import Link from "next/link"
import {
    LogOut,
    Package2,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { LuShoppingCart } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuPackage } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { PiNotepad } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


interface NavItemDesTab {
    href: string;
    icon: React.ReactNode;
    label: string;
}


export const NavbarDestopTablet = ({ openSidebar }: { openSidebar: boolean }) => {
    const [activeItem, setActiveItem] = useState<string>('Dashboard');

    const navItems: NavItemDesTab[] = [
        { href: '#', icon: <AiOutlineHome size={20} />, label: 'Dashboard' },
        { href: '#', icon: <LuShoppingCart size={20} />, label: 'Orders' },
        { href: '#', icon: <PiNotepad size={20} />, label: 'Transactions' },
        { href: '#', icon: <LuPackage size={20} />, label: 'Items' },
        { href: '#', icon: <TbCategory size={20} />, label: 'Category' },
        { href: '#', icon: <LuUsers size={20} />, label: 'Customers' },
    ];

    const handleClick = (label: string) => {
        setActiveItem(label);
    };

    return (
        <div className="hidden border-r bg-muted/40 md:block transition-all duration-300">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        {openSidebar && <span className="transition-opacity duration-300">Acme Inc</span>}
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navItems.map(({ href, icon, label }) => (
                            <TooltipProvider key={label}>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={href}
                                            onClick={() => handleClick(label)}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${activeItem === label ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
                                                } transition-all`}
                                        >
                                            {icon}
                                            {openSidebar && <span className="transition-opacity duration-300">{label}</span>}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className={openSidebar ? 'hidden' : undefined} sideOffset={18}>
                                        {label}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <Button size="sm" className="w-full justify-between">
                        {openSidebar && <span>LogOut</span>}
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};



export const NavbarMobile = () => {
    return (
        <div>NavbarMobile</div>
    )
}
