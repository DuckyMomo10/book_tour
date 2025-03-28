import React from 'react';
import "../styles/about.css"; // Tạo file CSS riêng cho tùy chỉnh thêm


const About = () => {
  return (
    <div className="about-container container my-5">
      {/* Phần đầu trang */}
      <div className="text-center mb-4">
        <h1 className="about-title">Về Chúng Tôi</h1>
        <p className="text-muted">
          Tìm hiểu về sứ mệnh, câu chuyện và những dịch vụ đặc biệt mà chúng tôi mang lại cho bạn.
        </p>
      </div>

      {/* Phần sứ mệnh */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h2 className="about-heading">Sứ Mệnh Của Chúng Tôi</h2>
          <p>
            Tại <strong>Travel World</strong>, chúng tôi nỗ lực để biến việc lên kế hoạch du lịch thành trải nghiệm dễ dàng và thú vị 
            cho mọi người. Sứ mệnh của chúng tôi là kết nối du khách với những trải nghiệm đáng nhớ và cung cấp công cụ hiện đại 
            cho các nhà quản lý tour du lịch.
          </p>
        </div>
        <div className="col-md-6">
          <img 
            src="https://via.placeholder.com/500x300" 
            alt="Sứ mệnh" 
            className="img-fluid"
          />
        </div>
      </div>

      {/* Phần dịch vụ */}
      <div className="mb-5">
        <h2 className="text-center about-heading">Chúng Tôi Cung Cấp</h2>
        <div className="row mt-4">
          <div className="col-md-4 text-center">
            <div className="service-box">
              <h5>Quản Lý Toàn Diện</h5>
              <p>Dễ dàng tạo, chỉnh sửa và quản lý các chuyến đi.</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="service-box">
              <h5>Thanh Toán An Toàn</h5>
              <p>Các phương thức thanh toán đảm bảo an toàn và nhanh chóng.</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="service-box">
              <h5>Phân Tích Thông Minh</h5>
              <p>Theo dõi các chuyến đi với báo cáo chi tiết.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Phần câu chuyện */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 order-md-2">
          <h2 className="about-heading">Câu Chuyện Của Chúng Tôi</h2>
          <p>
            Travel World khởi đầu là một nền tảng nhỏ để đặt tour du lịch. 
            Trải qua nhiều năm, chúng tôi đã mở rộng để phục vụ hàng ngàn du khách và nhà quản lý tour trên toàn thế giới, 
            cung cấp một nền tảng đáng tin cậy và sáng tạo.
          </p>
        </div>
        <div className="col-md-6 order-md-1">
          <img 
            src="https://via.placeholder.com/500x300" 
            alt="Câu chuyện của chúng tôi" 
            className="img-fluid"
          />
        </div>
      </div>

      {/* Phần cảm ơn */}
      <div className="about-footer">
        <p>
          Cảm ơn bạn đã tin tưởng <span className="about-brand">Travel World</span>. 
          Chúng tôi rất vui khi được đồng hành trong những chuyến phiêu lưu của bạn!
        </p>
      </div>
    </div>
  );
};

export default About;
