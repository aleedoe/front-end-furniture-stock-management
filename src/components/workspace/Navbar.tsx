"use client"

import React from 'react'
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

export const NavbarDestopTablet = ({openSidebar}: {openSidebar: boolean}) => {
    return (
        <div className={`hidden border-r bg-muted/40 md:block transition-all duration-300`}>
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        {openSidebar && <span className="transition-opacity duration-300">Acme Inc</span>}
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                        <AiOutlineHome size={20} />
                                        {openSidebar && <span className="transition-opacity duration-300">Dashboard</span>}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className={openSidebar ? "hidden" : undefined} sideOffset={18}>Dashboard</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                        <LuShoppingCart size={20} />
                                        {openSidebar && <span className="transition-opacity duration-300">Orders</span>}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className={openSidebar ? "hidden" : undefined} sideOffset={18}>Orders</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                        <PiNotepad size={20} />
                                        {openSidebar && <span className="transition-opacity duration-300">Transactions</span>}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className={openSidebar ? "hidden" : undefined} sideOffset={18}>Transactions</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link href="#" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                                        <LuPackage size={20} />
                                        {openSidebar && <span className="transition-opacity duration-300">Items</span>}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className={openSidebar ? "hidden" : undefined} sideOffset={18}>Items</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                        <TbCategory size={20} />
                                        {openSidebar && <span className="transition-opacity duration-300">Category</span>}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className={openSidebar ? "hidden" : undefined} sideOffset={18}>Category</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                        <LuUsers size={20} />
                                        {openSidebar && <span className="transition-opacity duration-300">Customers</span>}
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className={openSidebar ? "hidden" : undefined} sideOffset={18}>Customers</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
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
    )
}



export const NavbarMobile = () => {
    return (
        <div>NavbarMobile</div>
    )
}
