'use client'

import { useState } from 'react'

// Placeholder expenses table component.  Real implementation should fetch
// expenses from Supabase and allow adding new ones.
export default function ExpensesTable({ projectId }: { projectId: string }) {
  const [showDialog, setShowDialog] = useState(false)
  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowDialog(true)}
        className="bg-[#4FD1C5] text-[#0F172A] px-3 py-1 rounded-md font-semibold"
      >
        Add Expense
      </button>
      <table className="min-w-full text-sm border border-white/10">
        <thead className="bg-black/20">
          <tr>
            <th className="p-2 border-b border-white/10 text-left">Category</th>
            <th className="p-2 border-b border-white/10 text-left">Description</th>
            <th className="p-2 border-b border-white/10 text-left">Cost</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO: Render expenses here */}
          <tr>
            <td className="p-2 border-b border-white/10">–</td>
            <td className="p-2 border-b border-white/10">–</td>
            <td className="p-2 border-b border-white/10">–</td>
          </tr>
        </tbody>
      </table>
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] p-6 rounded-lg border border-white/10 max-w-sm w-full space-y-3">
            <h3 className="text-lg font-semibold mb-2">Add Expense</h3>
            {/* TODO: Add form fields and parse number values */}
            <p className="text-white/60 text-sm">Expense form goes here.</p>
            <button
              onClick={() => setShowDialog(false)}
              className="mt-4 bg-[#4FD1C5] text-[#0F172A] px-3 py-1 rounded-md font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}