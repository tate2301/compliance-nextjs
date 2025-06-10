'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Min 6 characters' })
});
type FormData = z.infer<typeof schema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(values: FormData) {
    setApiError(null);

    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
    });

    if (res?.error) {
      setApiError(res.error);
    } else {
      router.push(res?.url ?? '/app');
    }
  }

  return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register('email')}
                aria-invalid={!!errors.email}
            />
            {errors.email && (
                <p className="text-sm text-error-11">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register('password')}
                aria-invalid={!!errors.password}
            />
            {errors.password && (
                <p className="text-sm text-error-11">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>

          {apiError && <p className="text-sm text-error-11">{apiError}</p>}
        </form>

        {/* --- OR continue with --- */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center">
          <span className="bg-sand-1 px-2 text-sm text-sand-9">
            Or continue with
          </span>
          </div>
        </div>

        {/* Social buttons (only visual here) */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="w-full">
            {/* …google svg… */}
            Google
          </Button>
          <Button variant="outline" type="button" className="w-full">
            {/* …facebook svg… */}
            Facebook
          </Button>
        </div>

        {/* Switch to signup */}
        <p className="text-center text-sm text-sand-11">
          Don&#39;t have an account?{' '}
          <button
              type="button"
              onClick={() => router.push('/auth/signup')}
              className="text-primary-9 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
  );
}
