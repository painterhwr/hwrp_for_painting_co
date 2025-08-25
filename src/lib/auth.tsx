"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export type Role = 'admin' | 'manager' | 'supervisor' | 'painter' | 'apprentice'

type AuthCtx = {
  user: User | null
  role: Role | null
  loading: boolean
}

const AuthContext = createContext<AuthCtx>({ user: null, role: null, loading: true })

/**
 * AuthProvider subscribes to Supabase auth state changes and fetches the
 * user's role from the `users` table.  It exposes the current user,
 * role and loading flag.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthCtx>({ user: null, role: null, loading: true })

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session?.user) {
        setState({ user: null, role: null, loading: false })
        return
      }
      const user = session.user
      // Fetch the user's role from the public.users table
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
      if (error) {
        setState({ user, role: null, loading: false })
      } else {
        setState({ user, role: (data?.role ?? null) as Role | null, loading: false })
      }
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)