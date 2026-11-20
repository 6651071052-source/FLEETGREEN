import { useState } from 'react'
import { Download } from 'lucide-react'
import { useFleet } from '../context/FleetContext.jsx'
import { calculateKpis } from '../utils/rules.js'
import { CO2_FACTOR } from '../data/mockData.js'
import { formatMoney, formatPercent } from '../utils/format.js'
import KpiCard from '../components/KpiCard.jsx'
import AlertCenter from '../components/AlertCenter.jsx'
import FuelChart from '../components/FuelChart.jsx'
import FleetTable from '../components/FleetTable.jsx'
import ReportModal from '../components/ReportModal.jsx'

export default function OwnerDashboard() {
  const { vehicles } = useFleet()
  const [reportOpen, setReportOpen] = useState(false)
  const kpis = calculateKpis(vehicles, CO2_FACTOR)
  return (
    <main className="dashboard">
      <div className="dashboard-heading">
        <div><span>Tổng quan tháng 11</span><h1>Bảng điều khiển chủ xe</h1></div>
        <button className="report-button" onClick={() => setReportOpen(true)}><Download size={17}/>Xuất báo cáo tháng (chi phí & phát thải CO₂, Scope 3)</button>
      </div>
      <section className="kpi-grid">
        <KpiCard type="cost" label="Tổng chi phí nhiên liệu tháng này" value={formatMoney(kpis.cost)}/>
        <KpiCard type="liters" label="Tổng lượng dầu tiêu thụ" value={`${kpis.liters} Lít`}/>
        <KpiCard type="consumption" label="Mức tiêu hao trung bình toàn đội" value={`${formatNumber(kpis.averageConsumption)} L/100km`}/>
        <KpiCard type="co2" label="Tổng phát thải CO₂ quy đổi" value={`${kpis.co2Kg.toLocaleString('vi-VN')} kg CO₂ (${(kpis.co2Kg / 1000).toFixed(2).replace('.', ',')} Tấn)`} note="Ước tính sơ bộ theo QĐ 2626/QĐ-BTNMT, chưa thay thế kiểm kê chính thức."/>
      </section>
      <AlertCenter/>
      <FuelChart vehicles={vehicles}/>
      <FleetTable/>
      {reportOpen && <ReportModal vehicles={vehicles} onClose={() => setReportOpen(false)}/>}
    </main>
  )
}

function formatNumber(value) {
  return (Math.round(value * 10) / 10).toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}
