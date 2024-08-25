"use client"

import {
    CircleUser,
    Menu,
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

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { NavbarDestopTablet, NavbarMobile } from "@/components/workspace/Navbar"
import { getSessionData } from "@/lib/session"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


export default function DashboardLayout({ children, }: { children: React.ReactNode }) {

    const [openSidebar, setOpenSidebar] = useState<boolean>(true);
    const [activeItem, setActiveItem] = useState<string>('Dashboard');
    const [userRole, setUserRole] = useState<string>('');
    const [loadingNavbar, setLoadingNavbar] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSessionData();

            if (data.status === 'success' && data.data && data.data.access_rights) {
                setUserRole(data.data.access_rights.name);
                setLoadingNavbar(false);
            } else {
                console.error('Failed to retrieve user role');
            }

        };

        fetchData();
    }, [userRole]);


    const handleSetActiveItem = (label: string) => {
        setActiveItem(label);
    };

    return (
        <>
            <div className={`grid h-screen w-full transition-all duration-300 ${openSidebar ? 'md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]' : 'md:grid-cols-[75px_1fr] lg:grid-cols-[75px_1fr]'}`}>
                <NavbarDestopTablet
                    openSidebar={openSidebar}
                    activeItem={activeItem}
                    role={userRole}
                    onSetActiveItem={handleSetActiveItem}
                    loadingNav={loadingNavbar}
                />
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <NavbarMobile
                            activeItem={activeItem}
                            role={userRole}
                            onSetActiveItem={handleSetActiveItem}
                        />
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
                    <main className="flex flex-1 flex-col gap-4 lg:gap-6">
                        <ScrollArea className="h-[calc(100vh-6vh)] lg:h-[calc(98vh-50px)] p-4  lg:p-6">
                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
                            </div>
                            {children}
                        </ScrollArea>
                    </main>
                </div>
            </div>
        </>
    )
}