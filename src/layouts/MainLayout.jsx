import React from 'react'

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50 text-slate-900">
    <main className="mx-auto max-w-7xl px-4 py-6">
      {children}
    </main>
  </div>
)

export default MainLayout
