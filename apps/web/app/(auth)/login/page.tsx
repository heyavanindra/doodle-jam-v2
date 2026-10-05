'use client';

import * as React from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
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

const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export default function LoginPage() {
  const router = useTransitionRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const res = await authClient.signIn.email({
              email: value.email,
              password: value.password,
            });

            if (res.error) {
              reject(
                new Error(res.error.message || 'Failed to sign in. Please check your credentials.'),
              );
            } else {
              resolve(res.data);
            }
          } catch (err: any) {
            reject(new Error(err?.message || 'An unexpected error occurred.'));
          }
        }),
        {
          loading: 'Signing in…',
          success: () => {
            router.replace('/dashboard');
            return 'Signed in successfully!';
          },
          error: (err: any) => err?.message || 'Could not sign in.',
        },
      );
    },
  });

  const { isSubmitting } = form.state;

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
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
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={field.name}
                          name={field.name}
                          type={showPassword ? 'text' : 'password'}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          aria-invalid={isInvalid}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            size="icon-xs"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? (
                              <EyeOff className="size-3.5" />
                            ) : (
                              <Eye className="size-3.5" />
                            )}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" form="login-form" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
            Sign In
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            Don't have an account?{' '}
            <Link
              href="/signup"
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
