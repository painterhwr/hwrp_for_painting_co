'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { canManageAll } from '@/lib/roles'

// Simple sidebar item component
function Item({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(`${href}/`)
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-[#B08D57] text-black font-bold'
          : 'hover:bg-white/5 text-white'
      }`}
    >
      {label}
    </Link>
  )
}

export default function MainSidebar() {
  const { role } = useAuth()
  return (
    <aside className="hidden md:flex w-64 flex-col gap-2 p-4 bg-black/20 border-r border-white/10">
      <Item href="/dashboard" label="Dashboard" />
      <Item href="/jobs" label="Jobs" />
      {canManageAll(role) && <Item href="/clients" label="Clients" />}
      {canManageAll(role) && <Item href="/team" label="Team" />}
      <Item href="/messages" label="Messages" />
      <Item href="/homepage-management" label="Homepage" />
    </aside>
  )
}