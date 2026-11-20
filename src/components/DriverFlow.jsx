import { useEffect, useRef, useState } from 'react'
import { Camera, Check, ChevronRight, MapPin, ShieldCheck, History, ArrowLeft, Edit3 } from 'lucide-react'
import { useFleet } from '../context/FleetContext.jsx'
import { evaluateSubmission } from '../utils/rules.js'
import { formatMoney } from '../utils/format.js'

const sampleInvoice = { liters: 82, price: 30500, odo: 137250, confidenceLiters: 96, confidencePrice: 98, confidenceOdo: 94 }

function CameraCapture({ step, onCaptured }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [simulated, setSimulated] = useState(false)

  useEffect(() => {
    let active = true
    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia || location.protocol !== 'https:' && location.hostname !== 'localhost') {
        setSimulated(true)
        return
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false })
        if (!active) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
      } catch {
        setSimulated(true)
      }
    }
    startCamera()
    return () => {
      active = false
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [step])

  return (
    <div className="camera-area">
      {simulated ? (
        <div className="simulated-camera">
          <div className="sample-photo"><div className="photo-label">PVOIL</div><strong>{step === 1 ? '82 L' : '137.250 km'}</strong><span>{step === 1 ? 'HÓA ĐƠN ĐỔ DẦU' : 'ĐỒNG HỒ CÔNG-TƠ-MÉT'}</span></div>
          <small>Chế độ giả lập camera</small>
          <button className="capture-button" onClick={onCaptured}><Camera/>Dùng ảnh mẫu</button>
        </div>
      ) : (
        <div className="live-camera">
          <video ref={videoRef} autoPlay playsInline muted/>
          <button className="capture-button" onClick={onCaptured}><Camera/>Chụp ảnh</button>
        </div>
      )}
    </div>
  )
}

export default function DriverFlow() {
  const { vehicles, addSubmission, setActiveView, driverHistory } = useFleet()
  const [step, setStep] = useState(1)
  const [tab, setTab] = useState('flow')
  const [consent, setConsent] = useState(false)
  const [reading, setReading] = useState(false)
  const [values, setValues] = useState(sampleInvoice)
  const [editField, setEditField] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [audit, setAudit] = useState([])
  const vehicle = vehicles[0]

  const goReading = () => {
    setStep(3)
    setReading(true)
    setTimeout(() => setReading(false), 1800)
  }
  const changeValue = (field, nextValue) => {
    setAudit((current) => [...current, { time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }), person: vehicle.driver, action: `Sửa ${field}`, oldValue: values[field], newValue: nextValue }])
    setValues((current) => ({ ...current, [field]: nextValue }))
  }
  const sendSubmission = () => {
    const reasons = evaluateSubmission({
      vehicle,
      aiLiters: sampleInvoice.liters,
      submittedLiters: values.liters,
      captureHour: 9,
      invoiceHour: 9,
      captureProvince: 'Bình Dương',
      invoiceProvince: 'Bình Dương',
    })
    const alert = {
      id: `submission-${Date.now()}`,
      plate: vehicle.plate,
      driver: vehicle.driver,
      route: vehicle.route,
      title: reasons.length ? 'Cần kiểm tra – dữ liệu mới được gắn cờ' : 'Đã gửi dữ liệu',
      detail: reasons.join('. ') || 'Giao dịch đã được gửi và không cần kiểm tra bổ sung.',
      type: 'submission',
      status: 'open',
      ai: { liters: sampleInvoice.liters, price: sampleInvoice.price, amount: sampleInvoice.liters * sampleInvoice.price, odo: sampleInvoice.odo, confidence: sampleInvoice.confidenceLiters, time: '09:10', address: 'Cây xăng Petrolimex, Bình Dương', image: 'invoice' },
      submitted: { liters: values.liters, price: values.price, amount: values.liters * values.price, odo: values.odo, confidence: sampleInvoice.confidenceLiters, time: '09:10', address: 'Bình Dương', gps: '10.9807, 106.8307', captureTime: '09:12' },
      audit: [
        ...audit.map((entry) => ({ ...entry, oldValue: String(entry.oldValue), newValue: String(entry.newValue) })),
        { time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }), person: vehicle.driver, action: 'Gửi giao dịch', oldValue: '—', newValue: reasons.length ? 'Chờ chủ xe kiểm tra' : 'Dữ liệu đã gửi' },
      ],
    }
    addSubmission(alert)
    setSubmitted(true)
  }
  const mismatch = Math.abs(values.liters * values.price - values.liters * values.price) / (values.liters * values.price) > 0.01

  return (
    <main className="driver-shell">
      <div className="phone-frame">
        <div className="driver-header">
          <div><span>{vehicle.plate}</span><b>Xin chào, {vehicle.driver.split(' ').slice(-1)[0]}</b></div>
          <div className="driver-avatar">{vehicle.driver.charAt(0)}</div>
        </div>
        <div className="driver-tabs"><button className={tab === 'flow' ? 'active' : ''} onClick={() => setTab('flow')}>Đổ dầu</button><button className={tab === 'history' ? 'active' : ''} onClick={() => setTab('history')}><History size={15}/> Lịch sử</button></div>
        {tab === 'history' ? (
          <div className="driver-history">
            {driverHistory.length === 0 ? <div className="history-empty">Chưa có giao dịch gần đây</div> : driverHistory.map((item) => (
              <article key={item.id}><div><b>{item.submitted.liters} L</b><span>{item.route}</span></div><small>{item.status === 'open' ? 'Đã gửi · Chờ xem xét' : 'Đã cập nhật'}</small></article>
            ))}
            <article><div><b>78 L</b><span>{vehicle.route}</span></div><small>Hôm qua · Đã xác nhận</small></article>
            <article><div><b>80 L</b><span>{vehicle.route}</span></div><small>3 ngày trước · Đã xác nhận</small></article>
          </div>
        ) : submitted ? (
          <div className="sent-state"><div className="sent-icon"><Check/></div><h2>Đã gửi cho chủ xe</h2><p>Giao dịch đã được lưu vào hệ thống FleetGreen.</p><button className="primary-button" onClick={() => setActiveView('owner')}>Chuyển sang xem Dashboard Chủ xe <ChevronRight size={18}/></button></div>
        ) : (
          <>
            <div className="progress"><div style={{ width: `${step * 25}%` }}/><span>Bước {step}/4</span></div>
            {step === 1 && <div className="flow-step"><h2>Chụp hóa đơn đổ dầu</h2><CameraCapture step={1} onCaptured={() => setStep(2)}/></div>}
            {step === 2 && <div className="flow-step"><h2>Chụp đồng hồ công-tơ-mét</h2><CameraCapture step={2} onCaptured={goReading}/><label className="consent"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}/><span><ShieldCheck size={18}/>Chỉ ghi vị trí và giờ vào lúc bạn chụp ảnh. FleetGreen không theo dõi vị trí liên tục.</span></label><button className="back-button" onClick={() => setStep(1)}><ArrowLeft size={16}/> Quay lại</button></div>}
            {step === 3 && <div className="flow-step"><h2>AI đọc số liệu</h2>{reading ? <div className="ai-reading"><div className="scanner"/></div> : <div className="ai-result">
              {[['Số lít', 'liters', values.liters, 'L'], ['Đơn giá', 'price', values.price, 'đ/L'], ['Thành tiền', 'amount', values.liters * values.price, 'đ'], ['Số km Odo', 'odo', values.odo, 'km']].map(([label, field, value, unit]) => (
                <div className="ai-field" key={field}><div><span>{label}</span><b>{typeof value === 'number' ? value.toLocaleString('vi-VN') : value} {unit}</b></div><small>{field === 'odo' ? sampleInvoice.confidenceOdo : field === 'liters' ? sampleInvoice.confidenceLiters : sampleInvoice.confidencePrice}% tin cậy</small></div>
              ))}
              {mismatch && <div className="mismatch">Số liệu chưa khớp, vui lòng kiểm tra</div>}
              <button className="primary-button" onClick={() => setStep(4)}>Tiếp tục xác nhận <ChevronRight size={18}/></button>
            </div>}</div>}
            {step === 4 && <div className="flow-step"><h2>Xác nhận hoặc sửa</h2><div className="confirm-fields">
              {[['liters', 'Số lít', values.liters, 'L'], ['price', 'Đơn giá', values.price, 'đ/L'], ['odo', 'Số km Odo', values.odo, 'km']].map(([field, label, value, unit]) => (
                <div className="confirm-field" key={field}><div><span>{label}</span>{editField === field ? <input type="number" autoFocus value={value} onChange={(e) => changeValue(field, +e.target.value)} onBlur={() => setEditField(null)}/> : <b>{value.toLocaleString('vi-VN')} {unit}</b>}</div><button onClick={() => setEditField(field)}><Edit3 size={15}/>Sửa</button></div>
              ))}
            </div><p className="audit-note">Mọi lần sửa được ghi vào Audit Log kèm ảnh gốc.</p><button className="primary-button send-button" onClick={sendSubmission}>Gửi <ChevronRight size={18}/></button></div>}
          </>
        )}
      </div>
    </main>
  )
}
