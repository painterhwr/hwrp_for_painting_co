'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (authError) {
      setError(authError.message)
    } else {
      // Redirect to the next page or dashboard
      const params = new URLSearchParams(window.location.search)
      const next = params.get('next') || '/dashboard'
      window.location.href = next
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen grid place-items-center bg-[#1E1E1E] p-6 text-[#F5F5F5]">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-black/30 p-6 rounded-xl border border-white/10"
      >
        <h1 className="text-[#B08D57] text-xl font-semibold mb-4">Sign in</h1>
        <input
          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#4FD1C5] text-[#0F172A] rounded-lg px-4 py-2 font-semibold"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}