import { Metadata } from "next";

import { LoginForm } from "@/app/(auth)/components/login-form";
import Logo from "@/components/logo";

/* Esta variable contiene los metadatos para la página de autenticación
  Sirve para definir el título y la descripción de la página, lo cual es útil para SEO 
  y para mostrar información relevante en los resultados de búsqueda.
*/
const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to get access to your account and manage your preferences.',
}

const AuthPage = () => {
 return (
    <div className="grid min-h-svh lg:grid-cols-2">

      {/* Imagen de fondo */}
       <div className="relative flex-col hidden bg-auth lg:block  md:m-10 lg:m-15">
        <div className="absolute flex-col inset-0 h-full w-full p-10 lg:flex">
          <Logo/>

          <div className="relative z-20 mt-auto">
            <p className="text-lg text-mist-100">
              Welcome back! Please enter your credentials to access your account.
            </p>
          </div>
        </div>

      </div>

      {/* Segunda columna */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <LoginForm />
            {/* componente de formulario de sign up */}
          </div>
        </div>
      </div>
     
    </div>
  )
}
export default AuthPage;
