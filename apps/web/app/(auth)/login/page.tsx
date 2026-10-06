'use client';

import * as React from 'react';
import { Eye, EyeOff, Loader2, Layers } from 'lucide-react';
import { Link, useTransitionRouter } from 'next-view-transitions';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';

import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@repo/ui/components/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@repo/ui/components/input-group';
import { authClient } from '@/lib/auth-client';
import { toast } from '@/components/ui/sonner';
import { PatternBorder } from '@/components/pattern-border';

const LoginFormSchema = z.object({
  email: z.email('Email Required'),
  password: z.string('Password Required'),
});

const fieldSurface =
  'h-10 rounded-lg bg-background/60 shadow-[inset_0_1px_2px_rgb(0_0_0/0.05)] ' +
  'transition-[box-shadow,border-color] duration-150 ' +
  'focus-visible:ring-4 focus-visible:ring-primary/10';

export default function LoginPage() {
  const router = useTransitionRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: LoginFormSchema,
    },
    onSubmit: async ({ value }) => {
      const signInPromise = (async () => {
        const res = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (res.error) {
          throw new Error(res.error.message || 'Failed to sign in. Please check your credentials.');
        }

        return res.data;
      })();

      toast.promise(signInPromise, {
        loading: 'Signing in…',
        success: () => {
          router.replace('/dashboard');
          return 'Signed in successfully!';
        },
        error: (err: any) => err?.message || 'Could not sign in.',
      });

      await signInPromise.catch(() => {});
    },
  });

  return (
    <div className="bg-background relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
      {/* Backdrop: faded grid + one soft glow behind the card */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={
            'absolute inset-0 opacity-[0.35] ' +
            'bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] ' +
            'bg-size-[44px_44px] ' +
            'mask-[radial-gradient(ellipse_55%_50%_at_50%_45%,#000_20%,transparent_100%)]'
          }
        />
        <div className="bg-primary/15 absolute top-[8%] left-1/2 h-90 w-160 -translate-x-1/2 rounded-full blur-[110px]" />
      </div>

      <PatternBorder className="w-full max-w-sm rounded-2xl sm:max-w-md">
        <Card className="bg-card relative w-full gap-6 rounded-xl py-8">
          <CardHeader className="flex flex-col items-center justify-center gap-1.5 px-8 text-center">
            <div className="from-primary to-primary/80 text-primary-foreground shadow-primary/25 ring-primary/40 mx-auto mb-3 flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-b shadow-lg ring-1 inset-shadow-xs inset-shadow-white/25">
              <Layers className="size-5" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-balance">
              Enter your credentials to sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8">
            <form
              id="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup className="gap-5">
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name} className="font-medium">
                          Email address
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="name@example.com"
                          autoComplete="email"
                          className={fieldSurface}
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name} className="font-medium">
                          Password
                        </FieldLabel>
                        <InputGroup className={fieldSurface}>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            type={showPassword ? 'text' : 'password'}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            aria-invalid={isInvalid}
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              type="button"
                              size="icon-xs"
                              onClick={() => setShowPassword((prev) => !prev)}
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="size-3.5" />
                              ) : (
                                <Eye className="size-3.5" />
                              )}
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                        {isInvalid ? (
                          <FieldError errors={field.state.meta.errors} />
                        ) : (
                          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 px-8">
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button
                  type="submit"
                  form="login-form"
                  disabled={isSubmitting}
                  className={
                    'from-primary to-primary/85 h-10 w-full rounded-lg bg-linear-to-b font-medium ' +
                    'ring-primary/50 shadow-primary/25 shadow-lg ring-1 inset-shadow-xs inset-shadow-white/20 ' +
                    'hover:shadow-primary/35 transition-all duration-150 hover:brightness-110 ' +
                    'active:translate-y-px active:brightness-95 disabled:opacity-70'
                  }
                >
                  {isSubmitting && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
                  {isSubmitting ? 'Signing in…' : 'Sign in'}
                </Button>
              )}
            </form.Subscribe>

            <p className="text-muted-foreground text-center text-sm">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-foreground hover:text-primary font-medium underline-offset-4 transition-colors hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </PatternBorder>
    </div>
  );
}
