"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  LayoutDashboard,
  FolderOpen,
  DollarSign,
  BarChart3,
  Users,
  Settings,
  Upload,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Files", href: "/dashboard/files", icon: FolderOpen },
  { name: "Earnings", href: "/dashboard/earnings", icon: DollarSign },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Referrals", href: "/dashboard/referrals", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn("flex flex-col h-screen bg-card border-r transition-all duration-300", collapsed ? "w-16" : "w-64")}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Upload className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              ShareEarn
            </span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={onToggle} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-3",
                  isActive && "bg-primary text-primary-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">3</Badge>
              </Button>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button asChild className="w-full rounded-2xl">
            <Link href="/upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
