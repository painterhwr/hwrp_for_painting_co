'use client'

// A placeholder Kanban board component.  Real drag‑and‑drop implementation
// should integrate with a library such as dnd-kit or react-beautiful-dnd.

export default function KanbanBoard({ projectId }: { projectId: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {['todo', 'doing', 'done'].map(status => (
        <div
          key={status}
          className="bg-black/20 border border-white/10 rounded-lg p-3"
        >
          <h3 className="font-semibold capitalize mb-2">{status}</h3>
          {/* TODO: Render tasks for this status and enable drag‑and‑drop */}
          <p className="text-white/60 text-sm">No tasks</p>
        </div>
      ))}
    </div>
  )
}