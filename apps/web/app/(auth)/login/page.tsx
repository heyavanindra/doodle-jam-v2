'use client';

import React, { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { toast } from '@repo/ui/components/toast';
import { loginSchema } from '@repo/validator';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { authClient } from '@/lib/auth-client';
import { env } from '@/lib/env';
import { FlowerBlobSticker, ChunkyAsteriskSticker } from '@/components/hero/hero-stickers';
import { EyeIcon, EyeOffIcon, ArrowLeftIcon } from 'lucide-react';

export default function LoginPage() {
  const router = useTransitionRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as 'email' | 'password';
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await authClient.signIn.email({
        email: email.trim().toLowerCase(),
        password,
        callbackURL: `${env.NEXT_PUBLIC_WEB_URL}/dashboard`,
      });

      if (res.error) {
        toast.add({
          type: 'error',
          title: 'Login failed',
          description: res.error.message || 'Invalid email or password.',
        });
        setIsSubmitting(false);
        return;
      }

      toast.add({
        type: 'success',
        title: 'Welcome back!',
        description: 'Signed in successfully.',
      });

      router.push('/dashboard');
    } catch (err: any) {
      toast.add({
        type: 'error',
        title: 'Error',
        description: err?.message || 'An unexpected error occurred.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4 sm:p-6">
      {/* Decorative Stickers in background */}
      <div className="pointer-events-none absolute -top-8 -left-6 select-none sm:top-8 sm:left-12">
        <FlowerBlobSticker color="#FF8A00" size={88} className="rotate-[-8deg]" />
      </div>

      <div className="pointer-events-none absolute -right-8 -bottom-10 select-none sm:right-12 sm:bottom-8">
        <ChunkyAsteriskSticker color="#0099FF" size={96} className="rotate-[16deg]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Top Back Link */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-black tracking-wider text-neutral-700 uppercase transition-colors hover:text-black"
          >
            <ArrowLeftIcon className="size-4" />
            <span>Back to DoodleJam</span>
          </Link>
        </div>

        {/* Card Container */}
        <Card className="rounded-2xl border-3 border-black bg-white p-6 shadow-[6px_6px_0px_0px_#000] sm:p-8">
          <CardHeader className="p-0 text-center">
            <div className="bg-main mx-auto mb-3 flex size-11 items-center justify-center rounded-xl border-2 border-black text-xl font-black shadow-[3px_3px_0px_0px_#000]">
              ✏️
            </div>
            <CardTitle className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
              Welcome back
            </CardTitle>
            <CardDescription className="mt-1 text-sm font-medium text-neutral-600">
              Enter your credentials to access your canvases.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-6 p-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-black tracking-wider text-neutral-800 uppercase"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="maya@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-lg border-2 border-black bg-neutral-50 px-3.5 font-medium shadow-[2px_2px_0px_0px_#000] focus-visible:ring-black"
                />
                {errors.email && (
                  <span className="text-xs font-bold text-red-600">{errors.email}</span>
                )}
              </div>

              {/* Password field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-black tracking-wider text-neutral-800 uppercase"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.add({
                        type: 'info',
                        title: 'Password Reset',
                        description: 'Password reset link sent if an account exists.',
                      });
                    }}
                    className="text-xs font-bold text-neutral-600 underline underline-offset-2 hover:text-black"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-lg border-2 border-black bg-neutral-50 pr-10 pl-3.5 font-medium shadow-[2px_2px_0px_0px_#000] focus-visible:ring-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-neutral-600 hover:text-black"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-4" />
                    ) : (
                      <EyeIcon className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-xs font-bold text-red-600">{errors.password}</span>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-main mt-2 h-11 w-full cursor-pointer rounded-lg border-2 border-black text-sm font-black text-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none disabled:opacity-60"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in →'}
              </Button>
            </form>

            {/* Footer link to Sign up */}
            <div className="mt-6 text-center text-xs font-bold text-neutral-700">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-black text-black underline underline-offset-2 hover:text-neutral-600"
              >
                Create an account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
