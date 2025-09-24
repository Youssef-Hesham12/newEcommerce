"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react"
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
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function Login() {
  const router = useRouter()
  // const searchParams = useSearchParams()
  // const callbackURL = searchParams.get("callbackUrl") || "/products"
  const [signingIn, setSigningIn] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  type LoginFormValues = z.infer<typeof formSchema>
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values:LoginFormValues) {
    setSigningIn(true)
    setAuthError(null)

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    console.log("response", response)

    if (response?.error) {
      setAuthError("Invalid email or password.")
    }

    if (response?.ok) {
      router.push("/")
    }

    setSigningIn(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-black to-gray-100">
      <div className="w-full max-w-md bg-white border border-black rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Sign In
        </h2>

        {authError && (
          <div className="mb-4 text-red-600 text-sm font-medium text-center">
            {authError}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
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

            {/* Password */}
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

            {/* Forget Password Link */}
            <div className="flex justify-end">
              <Link
                href="/auth/forget"
                className="text-sm text-blue-600 hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              disabled={signingIn}
              type="submit"
              className="w-full bg-black text-white rounded-lg py-2 hover:bg-white hover:text-black border border-black transition-all flex items-center justify-center gap-2"
            >
              {signingIn && <Loader2 className="animate-spin w-4 h-4" />}
              Sign In
            </Button>

            <p className="text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link
                href={"/auth/register"}
                className="text-sky-600 cursor-pointer"
              >
                Create account now
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}
