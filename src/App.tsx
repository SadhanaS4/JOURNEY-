import { type ComponentType, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import { MeshBackground } from './components/layout/MeshBackground'
import { Navigation } from './components/layout/Navigation'
import { StaffNavigation } from './components/layout/StaffNavigation'
import { AdminNavigation } from './components/layout/AdminNavigation'
import { HelpEmergencyButton } from './components/help/HelpEmergencyButton'
import { SplashScreen } from './screens/landing/SplashScreen'
import { RoleSelection } from './screens/landing/RoleSelection'
import { PassengerLogin } from './screens/auth/PassengerLogin'
import { StaffLogin } from './screens/auth/StaffLogin'
import { AdminLogin } from './screens/auth/AdminLogin'
import { PassengerOnboarding } from './screens/passenger/PassengerOnboarding'
import { Dashboard } from './screens/Dashboard'
import { LiveRoute } from './screens/LiveRoute'
import { NexaPass } from './screens/NexaPass'
import { StationIntelligence } from './screens/StationIntelligence'
import { BoardingVerifyPage } from './screens/BoardingVerifyPage'
import { StaffOverview } from './screens/staff/StaffOverview'
import { StaffCrowd } from './screens/staff/StaffCrowd'
import { StaffTrains } from './screens/staff/StaffTrains'
import { StaffAlerts } from './screens/staff/StaffAlerts'
import { AdminOverview } from './screens/admin/AdminOverview'
import { AdminHeatmaps } from './screens/admin/AdminHeatmaps'
import { AdminSystem } from './screens/admin/AdminSystem'
import { AdminPredictions } from './screens/admin/AdminPredictions'
import { parseVerifyHash } from './data/passData'
import type { PassengerScreen, StaffScreen, AdminScreen } from './types'

const passengerScreens: Record<PassengerScreen, ComponentType> = {
  dashboard: Dashboard,
  route: LiveRoute,
  pass: NexaPass,
  intelligence: StationIntelligence,
}

const staffScreens: Record<StaffScreen, ComponentType> = {
  overview: StaffOverview,
  crowd: StaffCrowd,
  trains: StaffTrains,
  alerts: StaffAlerts,
}

const adminScreens: Record<AdminScreen, ComponentType> = {
  overview: AdminOverview,
  heatmaps: AdminHeatmaps,
  system: AdminSystem,
  predictions: AdminPredictions,
}

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
}

function LoginRouter() {
  const { role } = useApp()
  if (role === 'staff') return <StaffLogin />
  if (role === 'admin') return <AdminLogin />
  return <PassengerLogin />
}

function AppShell() {
  const {
    phase,
    role,
    passengerScreen,
    staffScreen,
    adminScreen,
    setPassengerScreen,
    setStaffScreen,
    setAdminScreen,
  } = useApp()

  if (phase === 'splash') {
    return (
      <AnimatePresence mode="wait">
        <SplashScreen key="splash" />
      </AnimatePresence>
    )
  }

  if (phase === 'roles') {
    return (
      <AnimatePresence mode="wait">
        <motion.div key="roles" {...pageTransition} className="mx-auto max-w-lg min-h-screen">
          <RoleSelection />
        </motion.div>
      </AnimatePresence>
    )
  }

  if (phase === 'login') {
    return (
      <>
        <AnimatePresence mode="wait">
          <motion.div key="login" {...pageTransition} className="mx-auto max-w-lg min-h-screen">
            <LoginRouter />
          </motion.div>
        </AnimatePresence>
        {role === 'passenger' && <HelpEmergencyButton />}
      </>
    )
  }

  if (phase === 'onboarding') {
    return (
      <>
        <AnimatePresence mode="wait">
          <motion.div key="onboarding" {...pageTransition} className="mx-auto max-w-lg min-h-screen">
            <PassengerOnboarding />
          </motion.div>
        </AnimatePresence>
        <HelpEmergencyButton />
      </>
    )
  }

  const screenKey = role === 'passenger' ? passengerScreen : role === 'staff' ? staffScreen : adminScreen
  const PassengerComponent = passengerScreens[passengerScreen]
  const StaffComponent = staffScreens[staffScreen]
  const AdminComponent = adminScreens[adminScreen]

  return (
    <main className="relative mx-auto max-w-lg min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div key={`${role}-${screenKey}`} {...pageTransition}>
          {role === 'passenger' && <PassengerComponent />}
          {role === 'staff' && <StaffComponent />}
          {role === 'admin' && <AdminComponent />}
        </motion.div>
      </AnimatePresence>

      {role === 'passenger' && <Navigation active={passengerScreen} onChange={setPassengerScreen} />}
      {role === 'passenger' && <HelpEmergencyButton />}
      {role === 'staff' && <StaffNavigation active={staffScreen} onChange={setStaffScreen} />}
      {role === 'admin' && <AdminNavigation active={adminScreen} onChange={setAdminScreen} />}
    </main>
  )
}

function AppRouter() {
  const [verifyMode, setVerifyMode] = useState(() => !!parseVerifyHash())

  useEffect(() => {
    const onHashChange = () => setVerifyMode(!!parseVerifyHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (verifyMode) {
    return <BoardingVerifyPage />
  }

  return <AppShell />
}

export default function App() {
  return (
    <AppProvider>
      <div className="relative min-h-screen">
        <MeshBackground />
        <AppRouter />
      </div>
    </AppProvider>
  )
}
