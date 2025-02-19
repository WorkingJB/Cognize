import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import AuthForm from "@/components/AuthForm"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Messaging Analytics Platform",
  description: "Connect Slack and Teams for message analytics",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {session ? (
            <>
              <Navbar />
              <main className="container mx-auto p-4">{children}</main>
            </>
          ) : (
            <div className="flex items-center justify-center min-h-screen">
              <AuthForm />
            </div>
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

