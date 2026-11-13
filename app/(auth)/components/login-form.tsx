"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "@/lib/firebase"
import { showErrorToast } from "@/lib/toast"
import { cn } from "cn"

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})

export type LoginFormValues = z.infer<typeof loginSchema>

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await signIn(values.email, values.password)
    } catch (error) {
      showErrorToast(error, "Unable to sign in. Please try again.")
    }
  }

  return (
    <form
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email and password to access your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            className="h-10"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <p id="email-error" role="alert" className="text-destructive text-xs">
            {errors.email?.message}
          </p>
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <Input
            {...register("password")}
            id="password"
            type="password"
            required
            autoComplete="current-password"
            className="h-10"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          <p id="password-error" role="alert" className="text-destructive text-xs">
            {errors.password?.message}
          </p>
        </Field>

        <Field>
          <Button disabled={isSubmitting} className="h-10" type="submit">
            {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
