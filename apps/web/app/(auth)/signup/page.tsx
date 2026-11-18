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
import { signUpSchema } from '@repo/validator';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { authClient } from '@/lib/auth-client';
import { env } from '@/lib/env';
import { FlowerBlobSticker, ChunkyAsteriskSticker } from '@/components/hero/hero-stickers';
import { EyeIcon, EyeOffIcon, ArrowLeftIcon, CheckCircle2Icon } from 'lucide-react';

export default function SignUpPage() {
  const router = useTransitionRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side Zod validation
    const result = signUpSchema.safeParse({ name, email, password });
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; password?: string } = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as 'name' | 'email' | 'password';
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        callbackURL: `${env.NEXT_PUBLIC_WEB_URL}/dashboard`,
      });

      if (res.error) {
        toast.add({
          type: 'error',
          title: 'Sign up failed',
          description: res.error.message || 'Could not create account.',
        });
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      toast.add({
        type: 'success',
        title: 'Account created!',
        description: 'Please check your email to verify your account.',
      });
    } catch (err: any) {
      toast.add({
        type: 'error',
        title: 'Error',
        description: err?.message || 'An unexpected error occurred.',
      });
    } finally {
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
          {isSuccess ? (
            /* Success State */
            <div className="flex flex-col items-center py-4 text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full border-2 border-black bg-[#DCFCE7] shadow-[2.5px_2.5px_0px_0px_#000]">
                <CheckCircle2Icon className="size-8 text-[#16A34A]" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-neutral-900">
                Check your inbox!
              </h2>
              <p className="mt-2 text-sm font-medium text-neutral-700">
                We sent a confirmation link to <strong className="text-black">{email}</strong>.
                Click it to verify your account and start sketching.
              </p>
              <div className="mt-6 w-full">
                <Link href="/login" className="w-full">
                  <Button className="h-11 w-full border-2 border-black font-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
                    Go to Log in →
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Sign Up Form */
            <>
              <CardHeader className="p-0 text-center">
                <div className="bg-main mx-auto mb-3 flex size-11 items-center justify-center rounded-xl border-2 border-black text-xl font-black shadow-[3px_3px_0px_0px_#000]">
                  ✏️
                </div>
                <CardTitle className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl">
                  Create an account
                </CardTitle>
                <CardDescription className="mt-1 text-sm font-medium text-neutral-600">
                  Start collaborating on real-time canvases in seconds.
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-6 p-0">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <Label
                      htmlFor="name"
                      className="text-xs font-black tracking-wider text-neutral-800 uppercase"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Maya Lin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 rounded-lg border-2 border-black bg-neutral-50 px-3.5 font-medium shadow-[2px_2px_0px_0px_#000] focus-visible:ring-black"
                    />
                    {errors.name && (
                      <span className="text-xs font-bold text-red-600">{errors.name}</span>
                    )}
                  </div>

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
                    <Label
                      htmlFor="password"
                      className="text-xs font-black tracking-wider text-neutral-800 uppercase"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 rounded-lg border-2 border-black bg-neutral-50 pr-10 pl-3.5 font-medium shadow-[2px_2px_0px_0px_#000] focus-visible:ring-black"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-600 hover:text-black"
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
                    {isSubmitting ? 'Creating account...' : 'Create account →'}
                  </Button>
                </form>

                {/* Footer link to Login */}
                <div className="mt-6 text-center text-xs font-bold text-neutral-700">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="text-black underline underline-offset-2 hover:text-neutral-600"
                  >
                    Log in
                  </Link>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
