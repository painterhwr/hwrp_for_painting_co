'use client'

import { useState } from 'react'

export default function QuoteCTA() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    details: '',
    phone: ''
  })
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)
    try {
      const res = await fetch('/api/public/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Failed')
      setMessage('Thanks! We’ll get back to you shortly.')
      setForm({ name: '', email: '', address: '', details: '', phone: '' })
    } catch (err: any) {
      setError(err?.message || 'Failed to submit')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className="w-full bg-white/5 border border-white/10 rounded-lg p-2"
        placeholder="Your Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="w-full bg-white/5 border border-white/10 rounded-lg p-2"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full bg-white/5 border border-white/10 rounded-lg p-2"
        placeholder="Address"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
      />
      <textarea
        className="w-full bg-white/5 border border-white/10 rounded-lg p-2 min-h-[96px]"
        placeholder="Brief details"
        value={form.details}
        onChange={e => setForm({ ...form, details: e.target.value })}
      />
      <input
        className="w-full bg-white/5 border border-white/10 rounded-lg p-2"
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {message && <p className="text-green-400 text-sm">{message}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-[#4FD1C5] text-[#0F172A] rounded-lg px-4 py-2 font-semibold"
      >
        {loading ? 'Sending…' : 'Get a Free Quote'}
      </button>
    </form>
  )
}