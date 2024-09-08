"use client"


import React, { useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    TabsContent,
} from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { getInternalUsers } from '@/api/dashboard/administrator/users/actions';

import { LuMoreHorizontal } from 'react-icons/lu';


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
            <MainTabInterUser />
        </QueryClientProvider>
    );
}

const MainTabInterUser = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const { data, error, isLoading } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: () => getInternalUsers(currentPage),
        refetchOnWindowFocus: false,
    });

    const totalPages = data?.data?.total_pages || 1;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <TabsContent value="internal-user">
            <Card x-chunk="internal-user">
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Name with extend component</TableHead>
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
                                        <TableCell>{index + 1 + (currentPage - 1) * 10}</TableCell> {/* Adjusted for pagination */}
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
                        <Pagination className="mx-0 w-auto">
                            <PaginationContent>
                                {currentPage > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        />
                                    </PaginationItem>
                                )}

                                {/* Adjusted logic for total pages */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                    // Handle cases where total pages is less than 3
                                    if (totalPages <= 3) {
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    href="#"
                                                    isActive={page === currentPage}
                                                    onClick={() => handlePageChange(page)}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    }
                                    // Handle cases where total pages is more than 3
                                    else {
                                        if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                            return (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        href="#"
                                                        isActive={page === currentPage}
                                                        onClick={() => handlePageChange(page)}
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            );
                                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                                            return <PaginationEllipsis key={page} />;
                                        } else {
                                            return null;
                                        }
                                    }
                                })}

                                {currentPage < totalPages && (
                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardFooter>
            </Card>
        </TabsContent>
    )
}

export default App