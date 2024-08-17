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
import { NavbarDestopTablet } from "@/components/workspace/Navbar"


export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

    const [openSidebar, setOpenSidebar] = useState<boolean>(true);
    // console.log(openSidebar);

    return (
        <>
            <div className={`grid min-h-screen w-full transition-all duration-300 ${openSidebar ? 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]' : 'md:grid-cols-[75px_1fr] lg:grid-cols-[75px_1fr]'}`}>
                <NavbarDestopTablet openSidebar={openSidebar} />
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