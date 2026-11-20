export function downloadVehicleCsv(vehicles) {
  const header = ['Biển số', 'Loại xe', 'Tài xế', 'Tuyến', 'Số lít', 'Quãng đường (km)', 'L/100km', 'Định mức', 'Chi phí dự kiến']
  const rows = vehicles.map((vehicle) => [
    vehicle.plate,
    vehicle.type,
    vehicle.driver,
    vehicle.route,
    vehicle.liters,
    vehicle.distance,
    vehicle.consumption,
    vehicle.standard,
    vehicle.liters * 30500,
  ])
  const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'fleetgreen-bao-cao-thang.csv'
  link.click()
  URL.revokeObjectURL(url)
}
