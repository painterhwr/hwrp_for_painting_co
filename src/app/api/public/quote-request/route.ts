import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import crypto from 'crypto'

// POST /api/public/quote-request
// Accepts { name, email, address, details?, phone? } and inserts a quote request
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, address, details, phone } = body || {}
    if (!name || !email || !address) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }
    const portalToken = crypto.randomBytes(20).toString('hex')
    const { data, error } = await supabase.from('quote_requests').insert({
      name,
      email,
      phone: phone ?? null,
      address,
      details: details ?? '',
      portal_token: portalToken
    }).select('id').single()
    if (error) {
      throw new Error(error.message)
    }
    return NextResponse.json({ ok: true, id: data?.id, portalToken })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? 'ERR' }, { status: 500 })
  }
}