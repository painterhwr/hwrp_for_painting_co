import { supabase } from '@/lib/supabase'
import KanbanBoard from '@/components/kanban-board'
import ExpensesTable from '@/components/expenses-table'
import PhotoGallery from '@/components/photo-gallery'

interface PageProps {
  params: { id: string }
}

async function fetchProject(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await fetchProject(params.id)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    project.address
  )}`
  return (
    <div className="p-6 space-y-6">
      <div className="bg-black/20 border border-white/10 rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-1">{project.address}</h1>
        <p className="text-white/70 text-sm mb-2">
          Client: {project.client_id ?? 'Unknown'}
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4FD1C5] underline text-sm"
        >
          View on Google Maps
        </a>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
        <KanbanBoard projectId={project.id} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Expenses</h2>
        <ExpensesTable projectId={project.id} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Photos</h2>
        <PhotoGallery projectId={project.id} />
      </div>
    </div>
  )
}