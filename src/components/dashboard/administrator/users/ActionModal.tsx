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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const addInternalUser = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    phone: z.number().min(2, {
        message: "phone must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "email must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
});

export const HandleAddInternalUser = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof addInternalUser>>({
        resolver: zodResolver(addInternalUser),
        defaultValues: {
            username: "",
            password: "",
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="access right" {...field} />
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
