import { AlertTriangle, Check, MessageSquare } from 'lucide-react'
import { useFleet } from '../context/FleetContext.jsx'
import AuditModal from './AuditModal.jsx'
import { useState } from 'react'

export default function AlertCenter() {
  const { alerts, updateAlertStatus } = useFleet()
  const [selected, setSelected] = useState(null)
  const open = alerts.filter((alert) => alert.status === 'open')
  return (
    <section className="alert-center">
      <div className="center-heading">
        <div><span className="title-icon"><AlertTriangle size={18}/></span><h2>Trung tâm Cần kiểm tra</h2></div>
        <b>{open.length} đang mở</b>
      </div>
      <div className="alert-list">
        {open.length === 0 ? (
          <div className="empty-state"><Check/> Không còn cảnh báo đang mở.</div>
        ) : open.map((alert) => (
          <article className="alert-card" key={alert.id}>
            <div className="alert-main">
              <div className="alert-tag">{alert.title}</div>
              <h3>{alert.plate} <span>· {alert.route}</span></h3>
              <p><b>{alert.driver}</b> — {alert.detail}</p>
            </div>
            <div className="alert-actions">
              <button className="secondary-button" onClick={() => setSelected(alert)}>Xem ảnh gốc &amp; Audit Log</button>
              <button className="accept-button" onClick={() => updateAlertStatus(alert.id, 'accepted')}><Check size={16}/>Chấp nhận số liệu</button>
              <button className="request-button" onClick={() => updateAlertStatus(alert.id, 'requested')}><MessageSquare size={16}/>Yêu cầu giải trình</button>
            </div>
          </article>
        ))}
      </div>
      {selected && <AuditModal alert={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
