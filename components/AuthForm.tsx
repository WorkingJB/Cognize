"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let result
      if (mode === "signin") {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        })
      } else {
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
      }

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error.message,
        })
        return
      }

      if (mode === "signin") {
        router.refresh()
        router.push("/profile")
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation email.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</CardTitle>
        <CardDescription>
          {mode === "signin" ? "Enter your email and password to sign in" : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
          {mode === "signin" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </Button>
      </CardFooter>
    </Card>
  )
}

