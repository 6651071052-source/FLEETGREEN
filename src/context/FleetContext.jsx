import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultAlerts, vehicles as seedVehicles } from '../data/mockData.js'

const FleetContext = createContext(null)
const STORAGE_KEY = 'fleetgreen-demo-state-v1'

export function FleetProvider({ children }) {
  const [activeView, setActiveView] = useState('owner')
  const [alerts, setAlerts] = useState(defaultAlerts)
  const [vehicles, setVehicles] = useState(seedVehicles)
  const [driverHistory, setDriverHistory] = useState([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
      if (saved) {
        setActiveView(saved.activeView || 'owner')
        setAlerts(saved.alerts || defaultAlerts)
        setVehicles(saved.vehicles || seedVehicles)
        setDriverHistory(saved.driverHistory || [])
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeView, alerts, vehicles, driverHistory }))
  }, [activeView, alerts, vehicles, driverHistory])

  const resetDemo = () => {
    localStorage.removeItem(STORAGE_KEY)
    setActiveView('owner')
    setAlerts(defaultAlerts)
    setVehicles(seedVehicles)
    setDriverHistory([])
  }

  const updateAlertStatus = (id, status) => {
    setAlerts((current) => current.map((alert) => alert.id === id ? { ...alert, status } : alert))
  }

  const addSubmission = (submission) => {
    setAlerts((current) => [submission, ...current])
    setDriverHistory((current) => [submission, ...current])
  }

  const openAlertCount = useMemo(() => alerts.filter((alert) => alert.status === 'open').length, [alerts])

  return (
    <FleetContext.Provider value={{ activeView, setActiveView, alerts, vehicles, driverHistory, openAlertCount, resetDemo, updateAlertStatus, addSubmission }}>
      {children}
    </FleetContext.Provider>
  )
}

export const useFleet = () => useContext(FleetContext)
