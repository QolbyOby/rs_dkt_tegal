// components/login-form.tsx

'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Email atau password salah");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}












// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

// export function LoginForm({
//     className,
//     ...props
// }: React.ComponentProps<"form">) {
//     return (
//         <div>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Login to your account</CardTitle>
//                     <CardDescription>
//                         Enter your email below to login to your account
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form className={cn("flex flex-col gap-6", className)} {...props}>
//                         <div className="flex flex-col gap-6">
//                             <div className="grid gap-3">
//                                 <Label htmlFor="email">Email</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     placeholder="m@example.com"
//                                     required
//                                 />
//                             </div>
//                             <div className="grid gap-3">
//                                 <div className="flex items-center">
//                                     <Label htmlFor="password">Password</Label>
//                                 </div>
//                                 <Input id="password" type="password" required />
//                             </div>
//                             <div className="flex flex-col gap-3">
//                                 <Button type="submit" className="w-full">
//                                     Login
//                                 </Button>
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }
