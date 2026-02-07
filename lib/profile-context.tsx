"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { UserProfile } from "./profile-types"
import { loadProfile, saveProfile, clearProfile } from "./profile-storage"

// ── Context shape ────────────────────────────────────────────────────────────

interface ProfileContextValue {
  /** The current user profile, or null if no profile exists yet */
  profile: UserProfile | null
  /** True once localStorage has been read (prevents hydration flash) */
  isLoaded: boolean
  /** Merge a partial update into the profile and persist */
  updateProfile: (partial: Partial<UserProfile>) => void
  /** Set the full profile (used by onboarding to commit the final result) */
  setProfile: (profile: UserProfile) => void
  /** Clear the profile and return to onboarding */
  resetProfile: () => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

// ── Provider ─────────────────────────────────────────────────────────────────

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Read from localStorage on mount
  useEffect(() => {
    const stored = loadProfile()
    if (stored) setProfileState(stored)
    setIsLoaded(true)
  }, [])

  const updateProfile = useCallback(
    (partial: Partial<UserProfile>) => {
      setProfileState((prev) => {
        if (!prev) return prev
        const updated = { ...prev, ...partial }
        saveProfile(updated)
        return updated
      })
    },
    []
  )

  const setProfile = useCallback((newProfile: UserProfile) => {
    setProfileState(newProfile)
    saveProfile(newProfile)
  }, [])

  const resetProfileFn = useCallback(() => {
    setProfileState(null)
    clearProfile()
  }, [])

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoaded,
        updateProfile,
        setProfile,
        resetProfile: resetProfileFn,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext)
  if (!ctx) {
    throw new Error("useProfile() must be used within a <ProfileProvider>")
  }
  return ctx
}
