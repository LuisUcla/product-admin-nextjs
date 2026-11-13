
import type { Metadata } from "next"

import { SignUpForm } from "./components/sign-up.form"

export const metadata: Metadata = {
  title: "Create account",
  description: "Create an account to manage your product workspace.",
}

export default function SignUpPage() {
  return <SignUpForm />
}