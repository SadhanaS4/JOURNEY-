import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { AppPhase, UserRole, PassengerScreen, StaffScreen, AdminScreen } from '../types'

export interface VerifiedPassenger {
  name: string
  fullName: string
  pnr: string
}

interface AppContextValue {
  phase: AppPhase
  role: UserRole | null
  displayName: string
  verifiedPassenger: VerifiedPassenger | null
  profilePhoto: string | null
  passRevealed: boolean
  passengerScreen: PassengerScreen
  staffScreen: StaffScreen
  adminScreen: AdminScreen
  completeSplash: () => void
  selectRole: (role: UserRole) => void
  loginStaff: (name: string) => void
  loginAdmin: (name: string) => void
  completePassengerVerification: (passenger: VerifiedPassenger) => void
  setProfilePhoto: (url: string | null) => void
  completeOnboarding: () => void
  revealPass: () => void
  logout: () => void
  goToRoles: () => void
  goBack: () => void
  setPassengerScreen: (s: PassengerScreen) => void
  setStaffScreen: (s: StaffScreen) => void
  setAdminScreen: (s: AdminScreen) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>('splash')
  const [role, setRole] = useState<UserRole | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [verifiedPassenger, setVerifiedPassenger] = useState<VerifiedPassenger | null>(null)
  const [profilePhoto, setProfilePhotoState] = useState<string | null>(null)
  const [passRevealed, setPassRevealed] = useState(false)
  const [passengerScreen, setPassengerScreen] = useState<PassengerScreen>('dashboard')
  const [staffScreen, setStaffScreen] = useState<StaffScreen>('overview')
  const [adminScreen, setAdminScreen] = useState<AdminScreen>('overview')

  const completeSplash = useCallback(() => setPhase('roles'), [])

  const selectRole = useCallback((r: UserRole) => {
    setRole(r)
    setPhase('login')
  }, [])

  const loginStaff = useCallback((name: string) => {
    setRole('staff')
    setDisplayName(name)
    setPhase('app')
  }, [])

  const loginAdmin = useCallback((name: string) => {
    setRole('admin')
    setDisplayName(name)
    setPhase('app')
  }, [])

  const completePassengerVerification = useCallback((passenger: VerifiedPassenger) => {
    setRole('passenger')
    setVerifiedPassenger(passenger)
    setDisplayName(passenger.name)
    setPhase('onboarding')
  }, [])

  const setProfilePhoto = useCallback((url: string | null) => {
    setProfilePhotoState(url)
  }, [])

  const completeOnboarding = useCallback(() => {
    setPhase('app')
    setPassengerScreen('dashboard')
  }, [])

  const revealPass = useCallback(() => setPassRevealed(true), [])

  const goToRoles = useCallback(() => {
    setRole(null)
    setPhase('roles')
  }, [])

  const logout = useCallback(() => {
    setDisplayName('')
    setVerifiedPassenger(null)
    setProfilePhotoState(null)
    setRole(null)
    setPassRevealed(false)
    setPhase('roles')
    setPassengerScreen('dashboard')
    setStaffScreen('overview')
    setAdminScreen('overview')
  }, [])

  const goBack = useCallback(() => {
    if (phase === 'login') {
      setRole(null)
      setPhase('roles')
    } else if (phase === 'onboarding') {
      setVerifiedPassenger(null)
      setDisplayName('')
      setProfilePhotoState(null)
      setPhase('login')
    } else if (phase === 'app') {
      logout()
    }
  }, [phase, logout])

  return (
    <AppContext.Provider
      value={{
        phase,
        role,
        displayName,
        verifiedPassenger,
        profilePhoto,
        passRevealed,
        passengerScreen,
        staffScreen,
        adminScreen,
        completeSplash,
        selectRole,
        loginStaff,
        loginAdmin,
        completePassengerVerification,
        setProfilePhoto,
        completeOnboarding,
        revealPass,
        logout,
        goToRoles,
        goBack,
        setPassengerScreen,
        setStaffScreen,
        setAdminScreen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
