'use client';

import React from 'react';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { Button, Input, Card } from '@repo/ui';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { authClient } from '@/lib/auth-client';
import { toast } from '@/components/ui/sonner';
import { env } from '@/lib/env';

const loginSchema = z.object({
  email: z.email('Please enter a valid work email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const router = useTransitionRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await authClient.signIn.email(
          {
            email: value.email,
            password: value.password,
          },
          {
            onSuccess: () => {
              toast.success('Signed in successfully!');
              router.replace('/dashboard');
            },
            onError: (ctx) => {
              const message =
                ctx.error.message || 'Failed to sign in. Please check your credentials.';
              toast.error('Sign in failed', {
                description: message,
              });
            },
          },
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to sign in. Please check your credentials.';
        toast.error('Sign in failed', {
          description: message,
        });
      }
    },
  });

  return (
    <div className="min-h-screen bg-canvas-bg text-ink flex flex-col justify-center items-center py-12 px-4 sm:px-6 relative selection:bg-surface-3 selection:text-ink">
      {/* Background restrained ambient grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black_30%,transparent_100%)]">
        <div
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[6px]"
        >
          <div className="w-7 h-7 rounded-[6px] bg-primary text-on-primary flex items-center justify-center transition-transform duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
          </div>
          <span className="font-bold text-sm tracking-[-0.14px] text-text-primary transition-colors">
            Doodle Jam
          </span>
        </Link>
      </div>

      {/* Main Auth Card: Clerk card surface with subtle border and card shadow */}
      <Card
        elevation="e2"
        className="w-full max-w-[400px] border border-border p-6 sm:p-8 bg-surface-1 shadow-card rounded-[6px]"
      >
        <div className="text-center mb-6">
          <h1 className="text-base sm:text-lg font-bold tracking-[-0.14px] text-text-primary">
            Welcome back
          </h1>
          <p className="mt-1 text-[11px] text-text-tertiary leading-[1.64]">
            Enter your credentials to access your canvas workspaces.
          </p>
        </div>

        {/* OAuth Social Actions */}
        <div className="space-y-2 mb-5">
          <Button
            variant="secondary"
            size="md"
            className="w-full justify-center gap-2.5"
            type="button"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3 0-.8.1-1.6.4-2.3L1.6 7.2C.6 9.2 0 10.5 0 12s.6 2.8 1.6 4.8l3.7-2.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.1L1.6 16.1C3.5 20 7.4 23 12 23z"
              />
            </svg>
            Continue with Google
          </Button>

          <Button
            variant="secondary"
            size="md"
            className="w-full justify-center gap-2.5"
            type="button"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Continue with GitHub
          </Button>
        </div>

        {/* Hairline Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="w-full border-t border-border" />
          <span className="absolute bg-surface-1 px-2.5 text-[10px] font-mono tracking-wider uppercase text-text-tertiary">
            or work email
          </span>
        </div>

        {/* Email & Password Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-3.5"
        >
          <form.Field name="email">
            {(field) => {
              const rawError = field.state.meta.isTouched ? field.state.meta.errors[0] : undefined;
              const errorMessage =
                typeof rawError === 'string'
                  ? rawError
                  : (rawError as { message?: string } | undefined)?.message;

              return (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-[11px] font-medium text-ink-muted mb-1.5"
                  >
                    Work email
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="ada@company.com"
                    autoComplete="email"
                    error={errorMessage}
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const rawError = field.state.meta.isTouched ? field.state.meta.errors[0] : undefined;
              const errorMessage =
                typeof rawError === 'string'
                  ? rawError
                  : (rawError as { message?: string } | undefined)?.message;

              return (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor={field.name} className="text-[11px] font-medium text-ink-muted">
                      Password
                    </label>
                    <Link
                      href="#forgot-password"
                      className="text-[11px] text-ink-subtle hover:text-ink transition-colors"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    error={errorMessage}
                  />
                </div>
              );
            }}
          </form.Field>

          {/* Submit Action */}
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!canSubmit || isSubmitting}
                className="w-full justify-center mt-2"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            )}
          </form.Subscribe>
        </form>

        {/* Footer inside card */}
        <div className="mt-6 pt-5 border-t border-border text-center text-[11px] text-text-tertiary">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Create account
          </Link>
        </div>
      </Card>

      {/* Sub-footer system status */}
      <div className="mt-8 flex items-center gap-2 text-[11px] font-mono text-text-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-success" />
        <span>End-to-end encrypted WebSocket Mesh • v1.0</span>
      </div>
    </div>
  );
}
