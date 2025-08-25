'use client'

// Placeholder gallery component.  Real implementation should list photos from
// the Supabase storage bucket and allow uploading new ones.
export default function PhotoGallery({ projectId }: { projectId: string }) {
  return (
    <div className="space-y-3">
      <p className="text-white/60 text-sm">
        Photo gallery for project {projectId} coming soon.
      </p>
      {/* TODO: List images and provide upload button */}
    </div>
  )
}