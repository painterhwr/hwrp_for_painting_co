import useSWR from 'swr'

interface PageProps {
  params: { token: string }
}

async function fetcher(url: string) {
  const res = await fetch(url)
  return res.json()
}

export default function PortalPage({ params }: PageProps) {
  const { data, error, isLoading } = useSWR(() =>
    params.token ? `/api/portal?token=${params.token}` : null,
    fetcher
  )
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#F5F5F5] p-6">
      <div className="max-w-2xl mx-auto bg-black/20 border border-white/10 rounded-xl p-6">
        <h1 className="text-[#B08D57] text-xl font-semibold mb-2">Your Quote / Job Status</h1>
        {isLoading && <p>Loading…</p>}
        {error && <p className="text-red-400">Error: {error.message}</p>}
        {data && !data.ok && <p className="text-red-400">{data.error}</p>}
        {data && data.ok && (
          <pre className="whitespace-pre-wrap break-words text-sm">
            {JSON.stringify(data.quote, null, 2)}
          </pre>
        )}
        <p className="text-white/70 text-sm mt-4">
          This page fetches your quote request via a public token.  For SSR, implement
          an API route (`/api/portal`) that reads the record server‑side and returns JSON.
        </p>
      </div>
    </div>
  )
}