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
import React from 'react';
import { LuFile, LuListFilter, LuPlusCircle } from 'react-icons/lu';
import MainTabInterUser from '@/components/dashboard/administrator/users/MainTabInterUser';
import MainTabReseller from '@/components/dashboard/administrator/users/MainTabReseller';

const UserPage = () => {

    return (
        <div className="p-4 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
            </div>
            <div className='mt-2'>
                <Tabs defaultValue="internal-user" >
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
                    <MainTabInterUser/>
                    <MainTabReseller/>
                </Tabs>
            </div>
        </div>
    );
};

export default UserPage;
