import type { Metadata } from "next"

import { LoginForm } from "./components/login-form"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to access your account and manage your preferences.",
}

export default function AuthPage() {
  return <LoginForm />
}
