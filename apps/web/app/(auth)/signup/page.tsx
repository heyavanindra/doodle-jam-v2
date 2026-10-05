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
import { Navbar } from '@/components/navbar';

const SignUpFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export default function SignUpPage() {
  const router = useTransitionRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    validators: {
      onChange: SignUpFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        await authClient.signUp.email(
          {
            name: value.name,
            email: value.email,
            password: value.password,
          },
          {
            onSuccess: () => {
              toast.success('Account created successfully!');
              router.replace('/dashboard');
            },
            onError: (ctx) => {
              const message = ctx.error.message || 'Failed to create account.';
              toast.error('Sign up failed', { description: message });
            },
          },
        );
      } catch {
        toast.error('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-sm border-none shadow-control sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Enter your details below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="signup-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="John Doe"
                        autoComplete="name"
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />

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
          <Button type="submit" form="signup-form" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
            Create Account
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
