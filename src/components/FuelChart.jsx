import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ComposedChart } from 'recharts'
import { formatNumber } from '../utils/format.js'

export default function FuelChart({ vehicles }) {
  const data = vehicles.map((vehicle) => ({
    name: vehicle.plate,
    actual: vehicle.consumption,
    standard: vehicle.standard,
    history: vehicle.history.reduce((sum, value) => sum + value, 0) / vehicle.history.length / 5,
  }))
  return (
    <section className="chart-section card">
      <div className="section-row"><div><span>Hiệu suất nhiên liệu</span><h2>Tiêu hao theo xe</h2></div></div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="name" tick={{ fontSize: 11 }}/><YAxis unit=" L"/><Tooltip formatter={(value) => `${formatNumber(value, 1)} L/100km`}/>
            <Legend/>
            <Bar dataKey="actual" name="Thực tế" fill="#2D6A4F" shape={(props) => {
              const item = data[props.index]
              return <rect {...props} fill={item.actual > item.standard ? '#DC2626' : '#2D6A4F'} rx={5}/>
            }}/>
            <Line type="monotone" dataKey="standard" name="Định mức" stroke="#D97706" strokeDasharray="5 5" dot={false}/>
            <Line type="monotone" dataKey="history" name="TB 10 lần đổ" stroke="#64748b" dot={{ r: 3 }}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
