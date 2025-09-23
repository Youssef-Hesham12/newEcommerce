"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { apiServices } from "@/services/api"
import Link from "next/link"

const formSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    phone: z.string().min(10, "Phone is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rePassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  })

export default function Register() {
  const [registering, setRegistering] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  type LoginFormValues = z.infer<typeof formSchema>
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    setRegistering(true)
    setRegisterError(null)

    try {
      const res = await apiServices.register(
        values.name,
        values.email,
        values.password,
        values.rePassword,
        values.phone
      )

      if (res?.statusMsg === "fail") {
        if (res?.message === "Account Already Exists") {
          setRegisterError("This email is already registered.")
        } else {
          setRegisterError(res.message || "Registration failed")
        }
        setRegistering(false)
        return
      }

      const loginRes = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (loginRes?.error) {
        setRegisterError("Registered but login failed. Try to login manually.")
      } else {
        router.push("/auth/login")
      }
    } catch (error) {
      console.error("Register error:", error)
      setRegisterError("Something went wrong. Please try again.")
    }

    setRegistering(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-black to-gray-100">
      <div className="w-full max-w-md bg-white border border-black rounded-2xl  lg-ms-10 shadow-lg p-4">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Create Account
        </h2>

        {registerError && (
          <div className="mb-4 text-red-600 text-sm font-medium text-center">
            {registerError}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your full name"
                      type="text"
                      {...field}
                      className="border border-black rounded-lg focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your-email@example.com"
                      type="email"
                      {...field}
                      className="border border-black rounded-lg focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your phone number"
                      type="text"
                      {...field}
                      className="border border-black rounded-lg focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      {...field}
                      className="border border-black rounded-lg focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      {...field}
                      className="border border-black rounded-lg focus:ring-2 focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={registering}
              type="submit"
              className="w-full bg-black text-white rounded-lg py-2 hover:bg-white hover:text-black border border-black transition-all flex items-center justify-center gap-2"
            >
              {registering && <Loader2 className="animate-spin w-4 h-4" />}
              Register
            </Button>
            <p>Already have an account <Link href={"/auth/login"} className='text-sky-600 cursor-pointer'>login now</Link></p>
          </form>
        </Form>
      </div>
    </div>
  )
}
