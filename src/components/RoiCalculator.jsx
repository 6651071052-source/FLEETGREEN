import { useState } from 'react'
import { formatMoney } from '../utils/format.js'

export default function RoiCalculator() {
  const [vehicles, setVehicles] = useState(10)
  const [liters, setLiters] = useState(900)
  const savings = vehicles * liters * 30500 * 0.03
  const cost = vehicles * 80000
  const ratio = savings / cost
  const co2 = vehicles * liters * 0.03 * 2.68
  return (
    <section className="roi-section" id="roi">
      <div className="section-heading"><span>Công cụ tính thử</span><h2>Ước tính mức tiết kiệm mỗi tháng</h2></div>
      <div className="roi-grid">
        <div className="roi-controls card">
          <label><span>Số lượng xe tải</span><b>{vehicles} xe</b></label>
          <input type="range" min="3" max="30" value={vehicles} onChange={(e) => setVehicles(+e.target.value)} />
          <label><span>Mức tiêu thụ dầu trung bình/xe/tháng</span><b>{liters} lít</b></label>
          <input type="range" min="300" max="2000" step="50" value={liters} onChange={(e) => setLiters(+e.target.value)} />
          <p className="fine-print">Đơn giá dầu diesel 0,05S: 30.500 đ/lít · Mức giảm 3% là giả định/ước tính.</p>
        </div>
        <div className="roi-results">
          <div className="saving-card card">
            <span>Tiền dầu tiết kiệm được — giả định / ước tính</span>
            <strong>{formatMoney(savings)}</strong>
            <small>Giảm khoảng 2,68 kg CO₂/lít đã dùng</small>
          </div>
          <div className="cost-card card"><span>Chi phí thuê bao FleetGreen</span><b>{formatMoney(cost)}</b></div>
          <div className="ratio-card"><strong>gấp ~{ratio.toFixed(1)} lần</strong><span>chi phí dịch vụ</span></div>
          <div className="comparison-bar">
            <div style={{ width: '90%' }}><span>Tiết kiệm</span></div>
            <div style={{ width: `${cost / savings * 100}%` }}><span>Thuê bao</span></div>
          </div>
          <p>CO₂ giảm ước tính: <b>{co2.toLocaleString('vi-VN', { maximumFractionDigits: 0 })} kg/tháng</b></p>
        </div>
      </div>
      <p className="roi-note">Mức giảm 3% là giả định, sẽ được kiểm chứng bằng số liệu thí điểm.</p>
    </section>
  )
}
