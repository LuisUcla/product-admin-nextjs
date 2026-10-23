
import Logo from "@/components/logo";
import { SignUpForm } from "./components/sign-up.form";


const SignUpPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      

      {/* primera columna */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <SignUpForm />  {/* componente de formulario de sign up */}
          </div>
        </div>
      </div>

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
     
    </div>
  )
}

export default SignUpPage