import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { BackButton } from '../../components/layout/BackButton'

export function StaffLogin() {
  const { loginStaff, goBack } = useApp()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (username === 'staff' && password === '1234') {
        loginStaff('Station Officer')
      } else {
        setError('Invalid credentials. Use staff / 1234')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen px-6 pt-8 pb-12">
      <div className="mb-10"><BackButton onClick={goBack} /></div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[11px] font-medium tracking-[0.2em] text-nexa/70 uppercase mb-2">Staff Portal</p>
        <h2 className="font-display text-2xl font-semibold text-cream mb-1">Station Access</h2>
        <p className="text-sm text-cream/40 mb-8 font-light">Operations and monitoring</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] text-cream/35 uppercase tracking-wider mb-2 block">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="staff"
              className="w-full bg-cream/[0.04] border border-cream/[0.08] rounded-2xl px-4 py-3.5 text-sm text-cream placeholder:text-cream/20 focus:outline-none focus:border-nexa/40 transition-colors" />
          </div>
          <div>
            <label className="text-[10px] text-cream/35 uppercase tracking-wider mb-2 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"
              className="w-full bg-cream/[0.04] border border-cream/[0.08] rounded-2xl px-4 py-3.5 text-sm text-cream placeholder:text-cream/20 focus:outline-none focus:border-nexa/40 transition-colors" />
          </div>
          {error && <p className="text-xs text-red-400/80">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-nexa text-cream text-sm font-medium hover:bg-nexa-deep transition-colors disabled:opacity-50 mt-2">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 glass p-4 rounded-2xl">
          <p className="text-[10px] text-cream/30 uppercase tracking-wider mb-2">Demo Credentials</p>
          <p className="text-xs text-cream/50 font-mono">staff / 1234</p>
        </div>
      </motion.div>
    </div>
  )
}
