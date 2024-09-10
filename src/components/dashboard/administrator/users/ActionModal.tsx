"use client"

import React, { useState } from 'react'

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

import { createInternalUser, deleteInternalUser, getInternalUserById, updateInternalUser } from '@/api/dashboard/administrator/users/actions';
import { LuPlusCircle } from 'react-icons/lu';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

const internalUser = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    phone: z.number().min(2, {
        message: "Phone must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
    access_rights: z.enum(["1", "3"], {
        message: "Please select a valid access right.",
    }),
});


export const HandleAddInternalUser = () => {

    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof internalUser>>({
        resolver: zodResolver(internalUser),
        defaultValues: {
            name: "",
            phone: undefined,
            email: "",
            password: "",
            access_rights: undefined,
        },
    });

    const handleSubmitForm = async (data: z.infer<typeof internalUser>) => {
        try {
            const res = await createInternalUser(data);
            console.log('res add: ', res.data);


            if (res.data.status === 'success') {
                toast({
                    title: 'Success!',
                    description: 'Internal user created successfully.',
                });

                // Tutup alert dialog setelah sukses
                setIsOpen(false);

                // Reset form values
                form.reset({
                    name: '',
                    phone: undefined,
                    email: '',
                    password: '',
                    access_rights: undefined, // Reset access_right ke undefined
                });
            } else if (res.data.status === 'error') {
                toast({
                    title: 'Error',
                    description: res.data.message || 'Failed to create internal user.',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while creating the user.',
            });
            console.error('Create user failed', error);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1" onClick={() => form.reset()}>
                    <LuPlusCircle size={20} />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add User
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Form {...form}>
                            <form className="grid gap-4" onSubmit={form.handleSubmit(handleSubmitForm)}>
                                {/* Your form fields here */}
                                <FormField
                                    control={form.control}
                                    name="access_rights"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Access Right</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select access right" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Access Right</SelectLabel>
                                                            <SelectItem value="1">Administrator</SelectItem>
                                                            <SelectItem value="3">Warehouser</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="phone" {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full hidden">
                                    save
                                </Button>
                            </form>
                        </Form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        type='button'
                        onClick={form.handleSubmit(handleSubmitForm)} // Handle form submit when "Save" is clicked
                    >
                        Save
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


interface HandleEditInternalUserProps {
    userId: number;
}

export const HandleEditInternalUser = ({ userId }: HandleEditInternalUserProps) => {

    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const form = useForm<z.infer<typeof internalUser>>({
        resolver: zodResolver(internalUser),
        defaultValues: {
            name: "",
            phone: undefined,
            email: "",
            password: "",
            access_rights: undefined,
        },
    });

    const getDataUser = async () => {
        setIsLoading(true); // Start loading
        try {
            const res = await getInternalUserById(userId);
            console.log('get data individu: ', res.data);

            if (res.data.status === 'success') {
                // Update form values with the retrieved data
                form.reset({
                    name: res.data.data.name,
                    phone: res.data.data.phone,
                    email: res.data.data.email,
                    password: res.data.data.password,
                    access_rights: res.data.data.access_rights.id.toString(),
                });
            } else if (res.data.status === 'error') {
                toast({
                    title: 'Error',
                    description: res.data.message || 'Failed to get data internal user.',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while fetching the user data.',
            });
            console.error('Fetch user data failed', error);
        } finally {
            setIsLoading(false); // End loading
        }
    };

    const handleSubmitForm = async (data: z.infer<typeof internalUser>) => {
        try {
            const res = await updateInternalUser(userId, data);
            console.log('res add: ', res.data);


            if (res.data.status === 'success') {
                toast({
                    title: 'Success!',
                    description: res.data.description,
                });

                // Tutup alert dialog setelah sukses
                setIsOpen(false);

                // Reset form values
                form.reset({
                    name: '',
                    phone: undefined,
                    email: '',
                    password: '',
                    access_rights: undefined, // Reset access_right ke undefined
                });
            } else if (res.data.status === 'error') {
                toast({
                    title: 'Error',
                    description: res.data.message || 'Failed to create internal user.',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while creating the user.',
            });
            console.error('Create user failed', error);
        }
    };
    
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    className='p-3' 
                    onClick={() => {
                        setIsOpen(true); // Open popover
                        getDataUser(); // Fetch data when popover opens
                    }}
                >
                    <FiEdit size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' side='left' className="w-80">
                {isLoading ? ( 
                    <div className="flex justify-center items-center h-40">
                        {/* Replace with a spinner component if desired */}
                        <p>Loading...</p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form className="grid gap-4" onSubmit={form.handleSubmit(handleSubmitForm)}>
                            {/* Your form fields here */}
                            <div>user id = {userId}</div>
                            <FormField
                                control={form.control}
                                name="access_rights"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Access Right</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select access right" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Access Right</SelectLabel>
                                                        <SelectItem value="1">Administrator</SelectItem>
                                                        <SelectItem value="3">Warehouser</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="phone" {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Save
                            </Button>
                            <Button type="reset" variant='outline' onClick={() => setIsOpen(false)} className="w-full">
                                Cancel
                            </Button>
                        </form>
                    </Form>
                )}
            </PopoverContent>
        </Popover>
    );
};


export const HandleDeleteInternalUser = ({ userId, userName }: { userId: any; userName: any }) => {

    const { toast } = useToast();

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const form = useForm({
        defaultValues: {
            userId: '', // Initialize as empty string
        },
    });
    
    const handleSubmitForm = async () => {
        try {
            const res = await deleteInternalUser(userId);
            console.log('get data individu: ', res.data);

            if (res.data.status === 'success') {
                // Update form values with the retrieved data
                toast({
                    title: 'Success!',
                    description: res.data.description,
                });
                
                form.reset({
                    // userId: res.data.data.userId,
                });

                setIsOpen(false);
                
            } else if (res.data.status === 'error') {
                toast({
                    title: 'Error',
                    description: res.data.message || 'Failed to get data internal user.',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while fetching the user data.',
            });
            console.error('Fetch user data failed', error);
        } finally {
            setIsLoading(false); // End loading
        }
    };
    
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    className='p-3' 
                    onClick={() => {
                        setIsOpen(true); // Open popover
                    }}
                >
                    <RiDeleteBinLine size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' side='left' className="w-80">
                {isLoading ? ( 
                    <div className="flex justify-center items-center h-40">
                        {/* Replace with a spinner component if desired */}
                        <p>Loading...</p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form className="grid gap-4" onSubmit={form.handleSubmit(handleSubmitForm)}>
                            <span className='text-lg font-semibold'>Are you sure for delete {userName}?</span>
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({ field }) => (
                                    <FormItem className='hidden'>
                                        <FormLabel>Id User</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="userId" 
                                                {...field} 
                                                type="number" 
                                                value={userId} // Use value from the form state
                                                onChange={(e) => field.onChange(Number(e.target.value))} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" variant="destructive" className="w-full">
                                Delete
                            </Button>
                            <Button type="reset" variant='outline' onClick={() => setIsOpen(false)} className="w-full">
                                Cancel
                            </Button>
                        </form>
                    </Form>
                )}
            </PopoverContent>
        </Popover>
    );
}
