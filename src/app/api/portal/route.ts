import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/portal?token=...
// Fetches a quote request by its portal_token
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Missing token' }, { status: 400 })
  }
  const { data, error } = await supabase
    .from('quote_requests')
    .select('*')
    .eq('portal_token', token)
    .single()
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true, quote: data })
}