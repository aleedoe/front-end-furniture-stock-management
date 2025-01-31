"use client"

import React from 'react'
import Link from "next/link"
import {
    LogOut,
    Menu,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { usePathname, useRouter } from 'next/navigation'
import { deleteSessionData } from '@/lib/session'



interface NavItem {
    href: string;
    icon: React.ReactNode;
    label: string;
}

const navItemsAdministrator: NavItem[] = [
    { href: '/dashboard/administrator', icon: <AiOutlineHome size={20} />, label: 'Dashboard' },
    { href: '/dashboard/administrator/orders', icon: <LuShoppingCart size={20} />, label: 'Orders' },
    { href: '#', icon: <PiNotepad size={20} />, label: 'Transactions' },
    { href: '#', icon: <LuPackage size={20} />, label: 'Items' },
    { href: '#', icon: <TbCategory size={20} />, label: 'Category' },
    { href: '/dashboard/administrator/users', icon: <LuUsers size={20} />, label: 'Users' },
];

const navItemsWarehouser: NavItem[] = [
    { href: '#', icon: <AiOutlineHome size={20} />, label: 'Dashboard' },
    { href: '#', icon: <LuPackage size={20} />, label: 'Items' },
    { href: '#', icon: <TbCategory size={20} />, label: 'Category' },
];

export const NavbarDestopTablet = ({
    openSidebar,
    role,
    loadingNav,
}: {
    openSidebar: boolean;
    role: string;
    loadingNav: boolean;
}) => {

    const navItems = role === "administrator" ? navItemsAdministrator : navItemsWarehouser;
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (label: string) => {
        // onSetActiveItem(label);
    };

    const handleLogout = async () => {
        await deleteSessionData();
        router.push('/login');
    }

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
                        {loadingNav ? (
                            <div className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all'>
                                Loading...
                            </div>
                        ) : (
                            navItems.map(({ href, icon, label }) => (
                                <TooltipProvider key={label}>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={href}
                                                onClick={() => handleClick(label)}
                                                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${pathname === href ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'} transition-all`}
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
                            ))
                        )}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="sm" className="w-full justify-between">
                                {openSidebar && <span>LogOut</span>}
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Yakin Ingin Keluar?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Pastikan semua data telah tersimpan.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleLogout()} >Logout</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </div>
        </div>
    );
};



export const NavbarMobile = ({
    role,
}: {
    role: string;
}) => {

    const navItems = role === "administrator" ? navItemsAdministrator : navItemsWarehouser;
    const pathname = usePathname();

    const handleClick = (label: string) => {
        // onSetActiveItem(label);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    {navItems.map(({ href, icon, label }) => (
                        <Link
                            key={label}
                            href={href}
                            onClick={() => handleClick(label)}
                            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${pathname === href ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {icon}
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="sm" className="w-full justify-between">
                                LogOut
                                <LogOut />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Yakin Ingin Keluar?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Pastikan semua data telah tersimpan.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Logout</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </SheetContent>
        </Sheet>
    );
};