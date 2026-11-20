export const DIESEL_PRICE = 30500
export const CO2_FACTOR = 2.68

export const vehicles = [
  { plate: '51C-882.19', type: 'Isuzu QKR 270 (2,4 tấn)', driver: 'Nguyễn Văn Hùng', route: 'Bình Dương – Cát Lái', liters: 980, distance: 4900, consumption: 20.0, standard: 17.0, history: [82,84,80,86,83,85,84,82,89,81] },
  { plate: '61H-045.72', type: 'Hyundai N250SL (2,5 tấn)', driver: 'Trần Minh Tâm', route: 'Đồng Nai – Quận 12', liters: 900, distance: 5625, consumption: 16.0, standard: 16.5, history: [76,78,74,80,75,77,79,76,75,78] },
  { plate: '60C-317.45', type: 'Hino XZU730 (5 tấn)', driver: 'Lê Quốc Bảo', route: 'Biên Hòa – Tân Bình', liters: 1000, distance: 5882, consumption: 17.0, standard: 17.0, history: [88,86,92,90,87,89,91,88,85,90] },
  { plate: '51D-129.63', type: 'Isuzu NQR 75M (5,5 tấn)', driver: 'Phạm Thanh Sơn', route: 'Thủ Đức – Long An', liters: 920, distance: 5750, consumption: 16.0, standard: 16.5, history: [82,80,79,84,81,78,83,80,82,79] },
  { plate: '72C-204.38', type: 'Hyundai HD72 (3,5 tấn)', driver: 'Võ Hoàng Nam', route: 'Vũng Tàu – Quận 7', liters: 700, distance: 4629, consumption: 15.1, standard: 15.5, history: [70,72,68,71,69,73,70,68,72,69] },
]

export const defaultAlerts = [
  {
    id: 'alert-1',
    plate: '51C-882.19',
    driver: 'Nguyễn Văn Hùng',
    route: 'Bình Dương – Cát Lái',
    title: 'Cần kiểm tra – số liệu đã chỉnh sửa',
    detail: 'AI đọc hóa đơn gốc là 82 Lít. Tài xế gửi 105 Lít.',
    type: 'edited',
    status: 'open',
    ai: { liters: 82, price: 30500, amount: 2501000, odo: 137250, confidence: 96, time: '09:10', address: 'Cây xăng Petrolimex, Bình Dương', image: 'invoice' },
    submitted: { liters: 105, price: 30500, amount: 3202500, odo: 137250, confidence: 92, time: '09:12', address: 'Bình Dương', gps: '10.9807, 106.8307', captureTime: '09:12' },
    audit: [
      { time: '09:10', person: 'Hệ thống AI', action: 'Trích xuất dữ liệu', oldValue: '—', newValue: '82 Lít · 30.500 đ/Lít' },
      { time: '09:12', person: 'Nguyễn Văn Hùng', action: 'Chỉnh sửa số lít', oldValue: '82 Lít', newValue: '105 Lít' },
      { time: '09:12', person: 'Nguyễn Văn Hùng', action: 'Gửi ảnh & dữ liệu', oldValue: '—', newValue: 'Chờ chủ xe kiểm tra' },
    ],
  },
  {
    id: 'alert-2',
    plate: '61H-045.72',
    driver: 'Trần Minh Tâm',
    route: 'Đồng Nai – Quận 12',
    title: 'Cần kiểm tra – giờ và vị trí chưa khớp hóa đơn',
    detail: 'Ảnh chụp lúc 22:15 tại Quận 12, hóa đơn ghi 14:30 tại Đồng Nai.',
    type: 'location',
    status: 'open',
    ai: { liters: 78, price: 30500, amount: 2379000, odo: 128440, confidence: 94, time: '14:30', address: 'Cây xăng PVOIL, Đồng Nai', image: 'invoice' },
    submitted: { liters: 78, price: 30500, amount: 2379000, odo: 128440, confidence: 94, time: '14:30', address: 'Quận 12, TP. Hồ Chí Minh', gps: '10.8638, 106.6672', captureTime: '22:15' },
    audit: [
      { time: '22:15', person: 'Hệ thống', action: 'Ghi giờ & vị trí lúc chụp', oldValue: '—', newValue: '22:15 · Quận 12' },
      { time: '22:15', person: 'Hệ thống AI', action: 'Trích xuất hóa đơn', oldValue: '—', newValue: '14:30 · Đồng Nai' },
      { time: '22:16', person: 'Trần Minh Tâm', action: 'Gửi dữ liệu', oldValue: '—', newValue: 'Chờ chủ xe kiểm tra' },
    ],
  },
]
