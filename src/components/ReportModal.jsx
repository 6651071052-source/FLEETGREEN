import { Printer, Download, X } from 'lucide-react'
import { calculateKpis } from '../utils/rules.js'
import { CO2_FACTOR } from '../data/mockData.js'
import { formatMoney } from '../utils/format.js'
import { downloadVehicleCsv } from '../utils/csv.js'

export default function ReportModal({ vehicles, onClose }) {
  const kpis = calculateKpis(vehicles, CO2_FACTOR)
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal report-modal">
        <div className="modal-header"><div><span>Báo cáo tháng</span><h2>Chi phí & phát thải CO₂ — Scope 3</h2></div><button onClick={onClose}><X/></button></div>
        <div className="report-summary">
          <div><span>Tổng chi phí</span><b>{formatMoney(kpis.cost)}</b></div>
          <div><span>Tổng lít</span><b>{kpis.liters} L</b></div>
          <div><span>Tổng CO₂</span><b>{kpis.co2Kg.toLocaleString('vi-VN')} kg</b></div>
        </div>
        <table className="report-table"><thead><tr><th>Biển số</th><th>Tài xế</th><th>Lít</th><th>Chi phí</th></tr></thead>
          <tbody>{vehicles.map((vehicle) => <tr key={vehicle.plate}><td>{vehicle.plate}</td><td>{vehicle.driver}</td><td>{vehicle.liters} L</td><td>{formatMoney(vehicle.liters * 30500)}</td></tr>)}</tbody>
        </table>
        <div className="emission-source"><b>Hệ số phát thải:</b> 74.100 kg CO₂/TJ · Tham chiếu: QĐ 2626/QĐ-BTNMT · Công cụ đo lường sơ bộ.</div>
        <div className="modal-actions">
          <button className="secondary-button" onClick={() => downloadVehicleCsv(vehicles)}><Download size={16}/>Tải file CSV</button>
          <button className="primary-button" onClick={() => window.print()}><Printer size={16}/>In / Lưu PDF</button>
        </div>
      </div>
    </div>
  )
}
