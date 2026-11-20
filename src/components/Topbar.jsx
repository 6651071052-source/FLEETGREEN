import { RotateCcw, Truck } from 'lucide-react'
import { useFleet } from '../context/FleetContext.jsx'

export default function Topbar() {
  const { activeView, setActiveView, openAlertCount, resetDemo } = useFleet()
  const tabs = [
    ['landing', 'Trang giới thiệu'],
    ['owner', 'Chủ xe'],
    ['driver', 'Tài xế'],
  ]
  return (
    <header className="topbar">
      <div className="brand"><Truck size={21} /><b>FleetGreen</b></div>
      <nav className="role-tabs" aria-label="Chuyển chế độ xem">
        {tabs.map(([key, label]) => (
          <button key={key} className={activeView === key ? 'active' : ''} onClick={() => setActiveView(key)}>
            {label}
            {key === 'owner' && openAlertCount > 0 && <span className="alert-badge">{openAlertCount}</span>}
          </button>
        ))}
      </nav>
      <button className="reset-button" onClick={resetDemo}><RotateCcw size={16} /> Reset demo</button>
    </header>
  )
}
