'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function Navigation() {
  const router = useRouter()
  const { user, logout, loading } = useAuth()

  const handleSignOut = () => {
    logout()
    router.push('/')
  }

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">S</span>
              </div>
              <span className="hidden sm:inline-block text-lg font-bold text-foreground">The Last Signal</span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">S</span>
            </div>
            <span className="hidden sm:inline-block text-lg font-bold text-foreground">The Last Signal</span>
          </Link>

          {/* Navigation Links - Show if authenticated */}
          {user && (
            <div className="hidden md:flex items-center gap-8">
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Explore Models
              </Link>
              <Link href="/bias-report" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Bias Report
              </Link>
              <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Community
              </Link>
              <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Learn
              </Link>
            </div>
          )}

          {/* Navigation Links - Show if not authenticated */}
          {!user && (
            <div className="hidden md:flex items-center gap-8">
              <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Explore Models
              </Link>
              <Link href="/bias-report" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Bias Report
              </Link>
              <Link href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Community
              </Link>
              <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Learn
              </Link>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
