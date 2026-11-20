import { X, Clock3 } from 'lucide-react'
import { formatMoney } from '../utils/format.js'

function InvoiceVisual({ compact = false }) {
  return (
    <div className={`invoice-visual ${compact ? 'compact' : ''}`}>
      <div className="invoice-top">PVOIL <span>HÓA ĐƠN ĐỔ DẦU</span></div>
      <div className="invoice-grid"><span>Dầu diesel 0,05S</span><b>82 L</b><span>Đơn giá</span><b>30.500 đ</b></div>
      <div className="invoice-total">Thành tiền 2.501.000 đ</div>
    </div>
  )
}

export default function AuditModal({ alert, onClose }) {
  const ai = alert.ai
  const submitted = alert.submitted
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal audit-modal">
        <div className="modal-header"><div><span>Đối chiếu dữ liệu</span><h2>{alert.plate}</h2></div><button onClick={onClose}><X/></button></div>
        <div className="compare-grid">
          <div className="compare-col">
            <h3>Dữ liệu AI trích xuất từ ảnh gốc</h3>
            <InvoiceVisual/>
            <dl>
              <div><dt>Số lít</dt><dd>{ai.liters} L</dd></div>
              <div><dt>Đơn giá</dt><dd>{formatMoney(ai.price)}</dd></div>
              <div><dt>Thành tiền</dt><dd>{formatMoney(ai.amount)}</dd></div>
              <div><dt>Số km Odo</dt><dd>{ai.odo.toLocaleString('vi-VN')} km</dd></div>
              <div><dt>Độ tin cậy</dt><dd>{ai.confidence}%</dd></div>
              <div><dt>Giờ in</dt><dd>{ai.time}</dd></div>
              <div><dt>Địa chỉ in</dt><dd>{ai.address}</dd></div>
            </dl>
          </div>
          <div className="compare-col submitted">
            <h3>Dữ liệu tài xế gửi/sửa</h3>
            <InvoiceVisual compact/>
            <dl>
              <div><dt>Số lít</dt><dd>{submitted.liters} L</dd></div>
              <div><dt>Đơn giá</dt><dd>{formatMoney(submitted.price)}</dd></div>
              <div><dt>Thành tiền</dt><dd>{formatMoney(submitted.amount)}</dd></div>
              <div><dt>Số km Odo</dt><dd>{submitted.odo.toLocaleString('vi-VN')} km</dd></div>
              <div><dt>Tọa độ GPS</dt><dd>{submitted.gps}</dd></div>
              <div><dt>Giờ thực tế lúc chụp</dt><dd>{submitted.captureTime}</dd></div>
              <div><dt>Vị trí lúc chụp</dt><dd>{submitted.address}</dd></div>
            </dl>
            <p className="gps-note">Chỉ ghi vị trí và giờ vào lúc chụp ảnh.</p>
          </div>
        </div>
        <div className="audit-log">
          <h3>Audit Log</h3>
          {alert.audit.map((entry, index) => (
            <div className="timeline-row" key={index}>
              <Clock3 size={15}/><b>{entry.time}</b><span>{entry.person}</span>
              <p>{entry.action}: <del>{entry.oldValue}</del> → <strong>{entry.newValue}</strong></p>
            </div>
          ))}
        </div>
        <p className="audit-disclaimer">Cảnh báo chỉ mang tính gợi ý kiểm tra, không kết luận.</p>
      </div>
    </div>
  )
}
