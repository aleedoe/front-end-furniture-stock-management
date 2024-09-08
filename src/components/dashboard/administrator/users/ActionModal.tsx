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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const addInternalUser = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
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
    access_right: z.enum(["administrator", "warehouser"], {
        message: "Please select a valid access right.",
    }),
});


export const HandleAddInternalUser = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof addInternalUser>>({
        resolver: zodResolver(addInternalUser),
        defaultValues: {
            username: "",
            phone: undefined,
            email: "",
            password: "",
            access_right: undefined,
        },
    });

    const handleSubmitForm = async (data: z.infer<typeof addInternalUser>) => {

        try {

            setLoading(true);

            const res = await handleLogin(data.username, data.password);

            if (res.status === 'success') {
                console.log('Login successful');

                toast({
                    title: "Login successful!",
                    description: "anda akan segera diarahkan ke halaman administrator.",
                });
            }

            if (res.status === 'error') {
                console.log('Login failed');
                if (res.message === "Username not found.") {
                    form.setError("username", {
                        type: "manual",
                        message: res.message,
                    });
                } else if (res.message === "Invalid password.") {
                    form.setError("password", {
                        type: "manual",
                        message: res.message,
                    });
                }
            }

        } catch (error) {
            console.error('Login failed', error);

        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
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
                                <Input placeholder="phone" {...field} />
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
                                <Input placeholder="Email" {...field} />
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
                <FormField
                    control={form.control}
                    name="access_right"
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
                                            <SelectItem value="administrator">Administrator</SelectItem>
                                            <SelectItem value="warehouser">Warehouser</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </Button> */}
            </form>
        </Form>
    )
}
