import Logo from "@/components/logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <aside className="relative hidden bg-auth lg:m-15 lg:block">
        <div className="absolute inset-0 flex flex-col p-10">
          <Logo />
          <p className="relative z-20 mt-auto text-lg text-mist-100">
            Manage your account securely and keep your product workspace up to date.
          </p>
        </div>
      </aside>

      <main className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">{children}</div>
        </div>
      </main>
    </div>
  )
}
