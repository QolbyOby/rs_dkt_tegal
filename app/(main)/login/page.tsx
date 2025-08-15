import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import gambar_login from "@/public/img/hero_section2.png"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import com_login from "@/public/img/com_login.png"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh relative lg:grid-cols-2">
            <div className="absolute top-4 left-4">
                <Button>
                    <Link href="/">Kembali ke Beranda</Link>
                </Button>
            </div>
            <Image
                src={com_login}
                alt="Background Image"
                className="absolute bottom-0 left-0  w-60"
            />
            <Image
                src={com_login}
                alt="Background Image"
                className="absolute top-0 right-1/2  w-60 rotate-180"
            />
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src={gambar_login}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
