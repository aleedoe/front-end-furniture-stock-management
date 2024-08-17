"use client"

import Link from "next/link"
import {
    CircleUser,
    LogOut,
    Menu,
    Package2,
    Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { LuShoppingCart } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuPackage } from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";
import { PiNotepad } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";

import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

    const [openSidebar, setOpenSidebar] = useState<boolean>(true);
    // console.log(openSidebar);

    return (
        <>
            <div className={`grid min-h-screen w-full transition-all duration-300 ${openSidebar ? 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]' : 'md:grid-cols-[75px_1fr] lg:grid-cols-[75px_1fr]'}`}>
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
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <nav className="grid gap-2 text-lg font-medium">
                                    <Link
                                        href="#"
                                        className="flex items-center gap-2 text-lg font-semibold"
                                    >
                                        <Package2 className="h-6 w-6" />
                                        <span className="sr-only">Acme Inc</span>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <AiOutlineHome size={20} />
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                                    >
                                        <LuShoppingCart size={20} />
                                        Orders
                                    </Link>
                                    <Link
                                        href="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <PiNotepad size={20} />
                                        Transactions
                                    </Link>
                                    <Link
                                        href="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <LuPackage size={20} />
                                        Items
                                    </Link>
                                    <Link
                                        href="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <TbCategory size={20} />
                                        Category
                                    </Link>
                                    <Link
                                        href="#"
                                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                    >
                                        <LuUsers size={20} />
                                        Customers
                                    </Link>
                                </nav>
                                <div className="mt-auto">
                                    <Button size="sm" className="w-full justify-between">
                                        LogOut
                                        <LogOut />
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 hidden md:flex lg:flex"
                            onClick={() => setOpenSidebar(!openSidebar)}
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                        <div className="w-full flex-1">
                            <form>
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                    />
                                </div>
                            </form>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="icon" className="rounded-full">
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        <div className="flex items-center">
                            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
                        </div>
                        <div
                            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
                        >
                            <div className="flex flex-col items-center gap-1 text-center">
                                <h3 className="text-2xl font-bold tracking-tight">
                                    {children}
                                </h3>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}