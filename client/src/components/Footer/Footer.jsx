import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import bocongthuong from "../../assets/bocongthuong.svg";
export default function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4 className="mb-2">ticketbox</h4>
            <p>Hệ thống quản lý và phân phối vé sự kiện hàng đầu Việt Nam</p>
            <p>TicketBox Co. Ltd. © 2016</p>
          </div>
          <div className="col-md-6 text-md-start">
            <h4>Công ty TNHH Ticketbox</h4>
            <p>Đại diện theo pháp luật: Trần Ngọc Thái Sơn</p>
            <p>
              Địa chỉ: Tầng 12, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, Phường
              12, Quận 10, TP. Hồ Chí Minh
            </p>
            <p>Hotline: 1900.6408 - Email: support@ticketbox.vn</p>
            <p>
              Giấy chứng nhận đăng ký doanh nghiệp số: 0313605444, cấp lần đầu
              ngày 07/01/2016 bởi Sở Kế Hoạch và Đầu Tư TP. Hồ Chí Minh
            </p>
          </div>
          <div className="col-md-2">
            <img
              src={bocongthuong}
              alt="Bộ Công Thương"
              className="img-fluid"
              style={{ maxHeight: "50px" }}
            />
          </div>
        </div>
        <div className="col"></div>
      </div>
    </footer>
  );
}
