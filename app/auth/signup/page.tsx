"use client"

import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {signIn} from 'next-auth/react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const schema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string()
}).refine(d => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});
type FormData = z.infer<typeof schema>;


export default function SignUp() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} =
        useForm<FormData>({resolver: zodResolver(schema)});
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    async function onSubmit(data: FormData) {
        setApiError(null);

        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const {message = 'Signup failed'} = await res.json().catch(() => ({}));
            setApiError(message);
            return;
        }

        /* immediately authenticate */
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
        });
        if (result?.error) {
            setApiError(result.error);
        }
        else {
            router.push('/app');
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-sand-12">
                    Create your account
                </h1>
                <p className="text-sm text-sand-9">
                    Enter your details to create a new account
                </p>
            </div>

            <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                <div className={"space-y-2"}>
                    <Input {...register('firstName')} placeholder="First name" className="input"/>
                    {errors.firstName && <p className="text-sm text-error-11">{errors.firstName.message}</p>}

                </div>
                <div className={"space-y-2"}>
                    <Input {...register('lastName')} placeholder="Last name" className="input"/>
                    {errors.lastName && <p className="text-sm text-error-11">{errors.lastName.message}</p>}

                </div>
            </div>
           <div className={"space-y-2"}>
               <Input {...register('email')} placeholder="Email" className="input"/>
               {errors.email && <p className="text-sm text-error-11">{errors.email.message}</p>}

           </div>
            <div className={"space-y-2"}>
                <Input {...register('password')} type="password" placeholder="Password" className="input"/>
                {errors.password && <p className="text-sm text-error-11">{errors.password.message}</p>}

            </div>
            <div className={"space-y-2"}>
                <Input {...register('confirmPassword')} type="password" placeholder="Confirm password" className="input"/>
                {errors.confirmPassword && <p className="text-sm text-error-11">{errors.confirmPassword.message}</p>}

            </div>
            <Button disabled={isSubmitting} className="btn w-full">
                {isSubmitting ? 'Please wait…' : 'Sign up'}
            </Button>
            {apiError && <p className="text-sm text-error-11">{apiError}</p>}
        </form>
    )
}
