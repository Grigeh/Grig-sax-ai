import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🎷 GigCRM</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, Grig</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-1">🔔 Needs Attention</h2>
            <p className="text-gray-400 text-sm">No follow-ups due</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-1">🎵 Upcoming Performances</h2>
            <p className="text-gray-400 text-sm">No performances booked</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-1">✨ New Leads</h2>
            <p className="text-gray-400 text-sm">No new leads this week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-1">🕐 Recent Activity</h2>
            <p className="text-gray-400 text-sm">No recent activity</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-1">📋 Today's Reminders</h2>
            <p className="text-gray-400 text-sm">No reminders today</p>
          </div>
        </div>
      </div>
    </main>
  )
}
