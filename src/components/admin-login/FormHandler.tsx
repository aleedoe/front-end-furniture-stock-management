"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleLogin } from '@/app/(dashboard)/admin-login/api/actions/auth';
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";


// Schema for form validation using Zod
const LoginFormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
});

export default function FormHandler() {

    const router = useRouter();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const handleSubmitForm = async (data: z.infer<typeof LoginFormSchema>) => {

        try {
            const res = await handleLogin(data.username, data.password);

            if (res.status === 'success') {
                console.log('Login successful');

                toast({
                    title: "Login successful!",
                    description: "anda akan segera diarahkan ke halaman administrator.",
                });

                router.push("/workspace/administrator");
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
                                <Input placeholder="username or email" {...field} />
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
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Loading..." : "Login"}
                </Button>
                <Button variant="outline" className="w-full" disabled={form.formState.isSubmitting}>
                    Login with Google
                </Button>
            </form>
        </Form>
    );
}
