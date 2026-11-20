import { Fuel, Gauge, Leaf, Wallet } from 'lucide-react'

const icons = { cost: Wallet, liters: Fuel, consumption: Gauge, co2: Leaf }
export default function KpiCard({ type, label, value, note }) {
  const Icon = icons[type]
  return (
    <article className="kpi-card card">
      <div className={`kpi-icon ${type}`}><Icon size={20}/></div>
      <div><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</div>
    </article>
  )
}
