import { FleetProvider, useFleet } from './context/FleetContext.jsx'
import Topbar from './components/Topbar.jsx'
import Landing from './pages/Landing.jsx'
import OwnerDashboard from './pages/OwnerDashboard.jsx'
import DriverApp from './pages/DriverApp.jsx'

function AppShell() {
  const { activeView } = useFleet()
  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar />
      {activeView === 'landing' && <Landing />}
      {activeView === 'owner' && <OwnerDashboard />}
      {activeView === 'driver' && <DriverApp />}
      <div className="demo-banner">Bản demo – dữ liệu mô phỏng. Biển số, tên tài xế là hư cấu.</div>
    </div>
  )
}

export default function App() {
  return (
    <FleetProvider>
      <AppShell />
    </FleetProvider>
  )
}
