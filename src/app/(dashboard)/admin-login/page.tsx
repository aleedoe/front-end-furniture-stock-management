"use client"

import { FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PageLogin() {
    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        console.log('data', { username, password });

        // Example of handling login (assuming handleLogin is an async function)
        try {
            // Uncomment the line below and import handleLogin properly
            // await handleLogin(username, password);
            // Redirect or handle successful login here
            // router.push('/some-page');
        } catch (error) {
            // Handle login error here
            console.error('Login failed', error);
        }
    }

    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitForm} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username" // Ensure the name attribute is set
                                type="text"
                                placeholder="username or email"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password" // Ensure the name attribute is set
                                type="password"
                                placeholder="password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}