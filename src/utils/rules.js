import { DIESEL_PRICE } from '../data/mockData.js'

export function calculateKpis(vehicles, co2Factor) {
  const liters = vehicles.reduce((sum, vehicle) => sum + vehicle.liters, 0)
  const distance = vehicles.reduce((sum, vehicle) => sum + vehicle.distance, 0)
  return {
    cost: liters * DIESEL_PRICE,
    liters,
    distance,
    averageConsumption: distance ? (liters / distance) * 100 : 0,
    co2Kg: liters * co2Factor,
  }
}

export function getSavings(vehicle) {
  const diff = (vehicle.consumption - vehicle.standard) / vehicle.standard
  const suggestions = diff > 0
    ? [
        { title: 'Kiểm tra áp suất lốp', rate: 0.015 },
        { title: 'Bảo dưỡng lọc gió', rate: 0.01 },
        { title: 'Hạn chế chạy không tải', rate: 0.02 },
      ]
    : [{ title: 'Duy trì thói quen lái ổn định', rate: 0.005 }]
  const top = suggestions[0]
  return { ...top, amount: top.rate * vehicle.liters * DIESEL_PRICE }
}

export function evaluateSubmission({ vehicle, aiLiters, submittedLiters, captureHour, invoiceHour, captureProvince, invoiceProvince }) {
  const reasons = []
  if (Math.abs(submittedLiters - aiLiters) / aiLiters > 0.1) {
    reasons.push('Số liệu sửa lệch hơn 10% so với số AI đọc')
  }
  const historyAverage = vehicle.history.reduce((sum, value) => sum + value, 0) / vehicle.history.length
  if (submittedLiters > historyAverage * 1.2) {
    reasons.push('Lượng dầu vượt hơn 20% so với trung bình 10 lần đổ gần nhất cùng tuyến')
  }
  if (Math.abs(captureHour - invoiceHour) > 2 || captureProvince !== invoiceProvince) {
    reasons.push('Giờ hoặc địa chỉ in chưa khớp với vị trí và giờ lúc chụp')
  }
  return reasons
}
