import { useState } from 'react'
import { Trophy, Lightbulb } from 'lucide-react'
import { formatMoney, formatPercent } from '../utils/format.js'
import { getSavings } from '../utils/rules.js'
import { useFleet } from '../context/FleetContext.jsx'

export default function FleetTable() {
  const { vehicles, alerts } = useFleet()
  const [ranking, setRanking] = useState('vehicle')
  const ranked = [...vehicles].sort((a, b) => (a.consumption / a.standard) - (b.consumption / b.standard))
  return (
    <section className="fleet-section">
      <div className="fleet-table card">
        <div className="section-row"><div><span>Đội xe</span><h2>Quản lý & gợi ý tiết kiệm</h2></div></div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>Biển số / loại xe</th><th>Tài xế</th><th>Tuyến cố định</th><th>Lít đã đổ</th><th>Mức tiêu hao</th><th>So với định mức</th><th>Trạng thái</th><th>Gợi ý tiết kiệm</th></tr></thead>
            <tbody>
              {vehicles.map((vehicle) => {
                const diff = (vehicle.consumption - vehicle.standard) / vehicle.standard * 100
                const suggestion = getSavings(vehicle)
                const hasAlert = alerts.some((alert) => alert.plate === vehicle.plate && alert.status === 'open')
                return (
                  <tr key={vehicle.plate}>
                    <td><b>{vehicle.plate}</b><small>{vehicle.type}</small></td>
                    <td>{vehicle.driver}</td><td>{vehicle.route}</td><td>{vehicle.liters} L</td>
                    <td><b>{formatPercent(vehicle.consumption)}</b> L/100km</td>
                    <td className={diff > 0 ? 'text-danger' : 'text-success'}>{diff > 0 ? '+' : ''}{formatPercent(diff)}</td>
                    <td><span className={`status ${hasAlert ? 'warning' : 'normal'}`}>{hasAlert ? 'Cần kiểm tra' : 'Bình thường'}</span></td>
                    <td><div className="suggestion"><Lightbulb size={16}/><div><b>{suggestion.title}</b><small>{formatMoney(suggestion.amount)} ước tính/tháng</small></div></div></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <aside className="ranking card">
        <div className="ranking-tabs">
          <button className={ranking === 'vehicle' ? 'active' : ''} onClick={() => setRanking('vehicle')}>Xếp hạng xe</button>
          <button className={ranking === 'driver' ? 'active' : ''} onClick={() => setRanking('driver')}>Xếp hạng tài xế</button>
        </div>
        <div className="ranking-title"><Trophy size={18}/><span>{ranking === 'vehicle' ? 'Xe tiết kiệm nhất tháng' : 'Tài xế có hiệu suất tốt tháng này'}</span></div>
        <ol>
          {ranked.map((vehicle, index) => (
            <li key={vehicle.plate}>
              <b>{index + 1}</b>
              <div><strong>{ranking === 'vehicle' ? vehicle.plate : vehicle.driver}</strong><small>{ranking === 'vehicle' ? vehicle.type : vehicle.plate}</small></div>
              <em>{formatPercent((vehicle.consumption / vehicle.standard - 1) * 100)}</em>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  )
}
