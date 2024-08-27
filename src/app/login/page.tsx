import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import FormHandler from '@/components/login/FormHandler';

export default function PageLogin() {

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
                    <FormHandler />
                </CardContent>
            </Card>
        </div>
    );
}