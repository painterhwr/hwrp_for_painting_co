-- Storage bucket policies for project photos and public assets

-- Managers can create/read/update/delete objects in the private bucket
CREATE POLICY "managers manage project-photos" ON storage.objects FOR ALL USING (
  bucket_id = 'project-photos' AND
  EXISTS (
    SELECT 1 FROM public.users u
    WHERE u.id = auth.uid() AND u.role IN ('admin','manager','supervisor')
  )
);

-- Field users can read photos for assigned projects.  Files are stored
-- under `${projectId}/filename` so we match on the prefix.
CREATE POLICY "field read assigned project-photos" ON storage.objects FOR SELECT USING (
  bucket_id = 'project-photos' AND
  EXISTS (
    SELECT 1 FROM public.projects p
    WHERE auth.uid() = ANY(p.assigned_user_ids) AND position(p.id::text || '/' IN name) = 1
  )
);

-- Public assets are read only by anyone
CREATE POLICY "public read public-assets" ON storage.objects FOR SELECT USING (
  bucket_id = 'public-assets'
);