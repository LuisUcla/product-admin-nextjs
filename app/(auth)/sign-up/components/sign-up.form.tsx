"use client"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { createUser, updateUser } from "@/lib/firebase"
import { LoaderCircle } from "lucide-react"
import toast from "react-hot-toast"


export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  /* loading */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* Definicion del schema del formulario */
  const formSchema = z.object({
    uid: z.string(),
    name: z.string()
      .min(4, { message: "Name must be at least 4 characters" }),
    email: z.string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z.string()
      .min(6, { message: "Password must be at least 6 characters" })
  })

  /* Inicializacion del formulario */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: "",
      name: "",
      email: "",
      password: ""
    }
  });

  /* Metodoas para usar del formulario, sirve para capturar los 
    errores y mostrar en UI, ademas de usar el metodo de handleSubmit
  */
  const { register, handleSubmit, formState  } = form;
  const { errors } = formState


  /* Metodo de onSubmit que se dispara en el boton de 'Sign Up' */
  const onSubmit = async (user: z.infer<typeof formSchema>) => {   
    console.log("user", user); 
    try {
      setIsLoading(true); // Establece el estado de carga (muestra el spinner)
      let res = await createUser(user);

      if (!res) {
        toast.error("Error creating user", {duration: 2500}); // Muestra un mensaje de error en caso de fallo en el servicio de autenticación 
        throw new Error("Error creating user");
      }
      await updateUser({ displayName: user.name });
      toast.success("User created successfully", {duration: 2500}); // Muestra un mensaje de exito en caso de exito en el servicio de autenticación
      setIsLoading(false); // Restablece el estado de carga (oculta el spinner)
      setTimeout(() => {
        window.location.href = "/sign-in"; // Redirige a la pagina de sign in despues de 2.5 segundos
      }, 2500);
    } catch (error: any) {
      toast.error(error.message, {duration: 2500}); // Muestra un mensaje de error en caso de fallo en el servicio de autenticación 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} 
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email and password to login to your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name
          ">Name</FieldLabel>
          <Input 
            {...register("name")} 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            required 
            autoComplete="name" 
            className="h-10"
          />
          <p className="text-destructive text-xs">{errors.name?.message}</p>
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
          />
          <p className="text-destructive text-xs">{errors.email?.message}</p>
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
            className="h-10"
          />
          <p className="text-destructive text-xs">{errors.password?.message}</p>
        </Field>

        <Field>
          <Button disabled={isLoading} className="h-10" type="submit">
            {isLoading && (
               <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
            )}
            {!isLoading && "Login"}
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
