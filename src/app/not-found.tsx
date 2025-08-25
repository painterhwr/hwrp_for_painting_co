export default function NotFoundPage() {
  return (
    <div className="min-h-screen grid place-items-center p-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-white/70 mb-4">The page you're looking for could not be found.</p>
        <a href="/" className="text-[#4FD1C5] underline">
          Go back home
        </a>
      </div>
    </div>
  )
}