import { ArrowRight, CheckCircle2, Fuel, Leaf, ShieldCheck } from 'lucide-react'
import RoiCalculator from '../components/RoiCalculator.jsx'
import { useFleet } from '../context/FleetContext.jsx'

export default function Landing() {
  const { setActiveView } = useFleet()
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Quản lý nhiên liệu bằng ảnh hóa đơn</div>
          <h1>Từng lít dầu,<br/><em>rõ từng đồng</em></h1>
          <p>Chụp hóa đơn đổ dầu để theo dõi chi phí, tiêu hao nhiên liệu và phát thải CO₂. Không cần lắp đặt thiết bị phần cứng.</p>
          <button className="primary-button" onClick={() => setActiveView('owner')}>Trải nghiệm Demo ngay <ArrowRight size={18}/></button>
        </div>
        <div className="hero-visual">
          <div className="phone-preview">
            <div className="phone-notch"></div>
            <div className="invoice-preview">
              <span>PVOIL</span><strong>82 Lít</strong><small>30.500 đ/Lít</small>
              <b>2.501.000 đ</b>
            </div>
            <div className="scan-line"></div>
          </div>
          <div className="float-stat"><Fuel/><div><b>4.500 Lít</b><span>đội xe/tháng</span></div></div>
        </div>
      </section>
      <RoiCalculator />
      <section className="pricing-section">
        <div className="section-heading"><span>Dịch vụ linh hoạt</span><h2>Bảng giá FleetGreen</h2></div>
        <div className="pricing-grid">
          <article className="price-card card">
            <h3>Gói Cơ bản</h3><div className="price">60.000 đ <small>/xe/tháng</small></div>
            <ul><li><CheckCircle2/>Chụp hóa đơn AI</li><li><CheckCircle2/>Tính tiêu hao</li><li><CheckCircle2/>Cảnh báo bất thường</li><li><CheckCircle2/>Bảng điều khiển</li></ul>
          </article>
          <article className="price-card card featured">
            <div className="popular">Phổ biến</div>
            <h3>Gói Nâng cao</h3><div className="price">100.000 đ <small>/xe/tháng</small></div>
            <ul><li><CheckCircle2/>Đầy đủ tính năng cơ bản</li><li><CheckCircle2/>Phân tích tài xế & tuyến đường</li><li><CheckCircle2/>Gợi ý tiết kiệm</li><li><CheckCircle2/>Báo cáo CO₂ theo QĐ 2626/QĐ-BTNMT</li></ul>
          </article>
        </div>
        <p className="pricing-note"><ShieldCheck size={17}/> Dùng thử 60 ngày. Gói Doanh nghiệp (nhiều đội xe, tích hợp GPS/OBD): thỏa thuận.</p>
      </section>
      <footer>FleetGreen là công cụ đo lường sơ bộ, chưa thay thế kiểm kê khí nhà kính chính thức.</footer>
    </main>
  )
}
