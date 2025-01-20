"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              Messaging Analytics
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/dashboard" current={pathname === "/dashboard"}>
                Dashboard
              </NavLink>
              <NavLink href="/post-message" current={pathname === "/post-message"}>
                Post Message
              </NavLink>
              <NavLink href="/analytics" current={pathname === "/analytics"}>
                Analytics
              </NavLink>
              <NavLink href="/profile" current={pathname === "/profile"}>
                Profile
              </NavLink>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, current, children }: { href: string; current: boolean; children: React.ReactNode }) => (
  <Link
    href={href}
    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      current
        ? "border-primary text-primary"
        : "border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground"
    }`}
  >
    {children}
  </Link>
)

export default Navbar

