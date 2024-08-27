"use client"

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React, { useState } from 'react';
import { LuFile, LuListFilter, LuMoreHorizontal, LuPlusCircle } from 'react-icons/lu';
import { getUsers } from '@/api/dashboard/administrator/actions';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface UserType {
    id: number;
    name: string;
    access_rights: any;
    email: string;
    phone: string;
    password: string;
}

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserPage />
        </QueryClientProvider>
    );
}

const UserPage = () => {
    const [page, setPage] = useState(1);

    const { data, error, isLoading } = useQuery({
        queryKey: ['users', page],
        queryFn: () => getUsers(page),
        refetchOnWindowFocus: false,
    });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="p-4 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
            </div>
            <div className='mt-2'>
                <Tabs defaultValue="internal-user">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="internal-user">Internal user</TabsTrigger>
                            <TabsTrigger value="reseller">Reseller</TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 gap-1">
                                        <LuListFilter size={20} />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Filter
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Active
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Archived
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button size="sm" variant="outline" className="h-8 gap-1">
                                <LuFile size={20} />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Export
                                </span>
                            </Button>
                            <Button size="sm" className="h-8 gap-1">
                                <LuPlusCircle size={20} />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add User
                                </span>
                            </Button>
                            {/* Other dropdown and button controls */}
                        </div>
                    </div>
                    <TabsContent value="internal-user">
                        <Card x-chunk="dashboard-06-chunk-0">
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Access Right</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Password</TableHead>
                                            <TableHead>
                                                Actions
                                                <span className="sr-only">Actions</span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={7}>Loading...</TableCell>
                                            </TableRow>
                                        ) : error ? (
                                            <TableRow>
                                                <TableCell colSpan={7}>Error loading data</TableCell>
                                            </TableRow>
                                        ) : (
                                            data.data.data.map((user: UserType, index: number) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>{index + 1 + (page - 1) * 10}</TableCell> {/* Adjusted for pagination */}
                                                    <TableCell className="font-medium">{user.name}</TableCell>
                                                    <TableCell>{user.access_rights.name}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.phone}</TableCell>
                                                    <TableCell>{user.password}</TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    aria-haspopup="true"
                                                                    size="icon"
                                                                    variant="ghost"
                                                                >
                                                                    <LuMoreHorizontal size={18} />
                                                                    <span className="sr-only">Toggle menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter>
                                <div className='w-full flex flex-row items-center justify-between'>
                                    <div className="text-xs text-muted-foreground">
                                        Showing <strong>{data?.data?.current_page}</strong> of <strong>{data?.data?.total_pages}</strong> pages
                                    </div>
                                    <Pagination className='mx-0 w-auto'>
                                        <PaginationContent>
                                            {data?.data?.previous && (
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        href="#"
                                                        onClick={() => handlePageChange(page - 1)}
                                                    />
                                                </PaginationItem>
                                            )}
                                            {[...Array(data?.data?.total_pages)].map((_, i) => (
                                                <PaginationItem key={i}>
                                                    <PaginationLink
                                                        href="#"
                                                        isActive={i + 1 === page}
                                                        onClick={() => handlePageChange(i + 1)}
                                                    >
                                                        {i + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}
                                            {data?.data?.next && (
                                                <PaginationItem>
                                                    <PaginationNext
                                                        href="#"
                                                        onClick={() => handlePageChange(page + 1)}
                                                    />
                                                </PaginationItem>
                                            )}
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default App;
