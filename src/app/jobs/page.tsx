import { supabase } from '@/lib/supabase'

async function fetchProjects() {
  const { data, error } = await supabase.from('projects').select(
    'id, address, client_id, clients(name)'
  )
  if (error) throw error
  return data
}

export default async function JobsPage() {
  // Fetch projects server-side (this runs on the server in Next.js 14)
  const projects = await fetchProjects()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <div className="space-y-3">
        {projects.map(project => (
          <div
            key={project.id}
            className="p-4 bg-black/20 border border-white/10 rounded-lg"
          >
            <h2 className="font-semibold text-lg">{project.address}</h2>
            <p className="text-white/70 text-sm">
              Client: {project.clients?.name || 'Unknown'}
            </p>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-white/70">No projects found.</p>
        )}
      </div>
    </div>
  )
}