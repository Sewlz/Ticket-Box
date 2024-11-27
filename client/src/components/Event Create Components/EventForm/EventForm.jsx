import React, { useState } from "react";
import axios from "axios";
import "./EventForm.css";

export function EventForm({ fetchEvents }) {
  const [event, setEvent] = useState({
    title: "",
    image: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    availableSeats: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kiểm tra các trường bắt buộc
      if (
        !event.title ||
        !event.description ||
        !event.date ||
        !event.time ||
        !event.image
      ) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      // Kiểm tra giá trị price và availableSeats là số hợp lệ
      if (isNaN(event.price) || isNaN(event.availableSeats)) {
        alert("Giá vé và số ghế phải là số hợp lệ.");
        return;
      }

      // Kiểm tra định dạng ngày và giờ
      const formattedDate = new Date(event.date);
      if (isNaN(formattedDate)) {
        alert("Ngày không hợp lệ.");
        return;
      }

      const formattedTime = event.time;
      if (!formattedTime) {
        alert("Giờ không hợp lệ.");
        return;
      }

      // Gửi yêu cầu POST đến API để tạo sự kiện
      const response = await axios.post(
        "http://localhost:5000/api/events",
        event
      );

      // Nếu yêu cầu thành công, gọi fetchEvents và hiển thị thông báo thành công
      if (response.status === 201) {
        alert("Sự kiện đã được tạo thành công!");
        fetchEvents(); // Cập nhật danh sách sự kiện từ server
        setEvent({
          title: "",
          image: "",
          description: "",
          date: "",
          time: "",
          location: "",
          price: "",
          availableSeats: "",
          category: "",
        });
      }
    } catch (error) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      console.error("Lỗi khi tạo sự kiện:", error);
      alert("Có lỗi xảy ra khi tạo sự kiện. Vui lòng thử lại.");
      console.log("Error response:", error.response); // Log chi tiết lỗi
    }
  };

  return (
    <div className="event-form-container">
      <div className="event-form-box">
        <h1 className="form-title">Tạo Sự Kiện</h1>
        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Tên sự kiện</label>
            <input
              type="text"
              id="title"
              name="title"
              value={event.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Ngày diễn ra</label>
            <input
              type="date"
              id="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Giờ diễn ra</label>
            <input
              type="time"
              id="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Địa điểm</label>
            <input
              type="text"
              id="location"
              name="location"
              value={event.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Giá vé</label>
            <input
              type="number"
              id="price"
              name="price"
              value={event.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="availableSeats">Số ghế</label>
            <input
              type="number"
              id="availableSeats"
              name="availableSeats"
              value={event.availableSeats}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Thể loại</label>
            <select
              id="category"
              name="category"
              value={event.category}
              onChange={handleChange}
              required
            >
              <option value="">Chọn thể loại</option>
              <option value="Art">Art</option>
              <option value="Music">Music</option>
              <option value="Health">Health</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image">URL hình ảnh</label>
            <input
              type="url"
              id="image"
              name="image"
              value={event.image}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Tạo sự kiện
          </button>
        </form>
      </div>
    </div>
  );
}
