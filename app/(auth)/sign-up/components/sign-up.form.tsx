"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { createUser, updateUser } from "@/lib/firebase"
import { showErrorToast, showToast } from "@/lib/toast"
import { cn } from "cn"

const signUpSchema = z.object({
  name: z.string().min(4, { message: "Name must be at least 4 characters" }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>

const defaultValues: SignUpFormValues = {
  name: "",
  email: "",
  password: "",
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const user = await createUser({
        email: values.email,
        password: values.password,
      })

      if (!user) {
        throw new Error("Error creating user")
      }

      await updateUser({ displayName: values.name })
      showToast("success", "User created successfully")
      router.replace("/")
    } catch (error) {
      showErrorToast(error, "Unable to create account. Please try again.")
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
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your details to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            {...register("name")}
            id="name"
            type="text"
            placeholder="John Doe"
            required
            autoComplete="name"
            className="h-10"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          <p id="name-error" role="alert" className="text-destructive text-xs">
            {errors.name?.message}
          </p>
        </Field>

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
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            {...register("password")}
            id="password"
            type="password"
            required
            autoComplete="new-password"
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
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link href="/" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
