
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Forgot password",
  description: "Password recovery for your Product Admin account.",
}

export default function ForgotPasswordPage() {
  return (
    <section className="flex flex-col gap-4 text-center">
      <h1 className="text-2xl font-bold">Forgot your password?</h1>
      <p className="text-sm text-muted-foreground">
        Password recovery is not available yet. Please contact your administrator
        for help accessing your account.
      </p>
      <Link href="/" className="text-sm underline underline-offset-4">
        Back to sign in
      </Link>
    </section>
  )
}