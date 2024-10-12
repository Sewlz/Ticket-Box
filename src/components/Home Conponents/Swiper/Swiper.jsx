import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./Swiper.css";
import HoverVideoPlayer from "../HoverVideo/HoverVideo";
export function HomeBanner() {
  return (
    <div className="mb-4">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          430: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="banner-card">
            <HoverVideoPlayer />
            <div className="banner-info">
              <div>
                <span
                  style={{ color: "rgb(45, 194, 117)", marginRight: "10px" }}
                >
                  <i class="fa-solid fa-circle"></i> Từ 500.000đ
                </span>
                <span>
                  <i class="fa-solid fa-circle"></i> 12 Tháng 10, 2024
                </span>
              </div>
              <button className="btn btn-light mt-2">View Detail</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-card">
            <HoverVideoPlayer />
            <div className="banner-info">
              <div>
                <span
                  style={{ color: "rgb(45, 194, 117)", marginRight: "10px" }}
                >
                  <i class="fa-solid fa-circle"></i> Từ 500.000đ
                </span>
                <span>
                  <i class="fa-solid fa-circle"></i> 12 Tháng 10, 2024
                </span>
              </div>
              <button className="btn btn-light mt-2">View Detail</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="banner-card">
            <HoverVideoPlayer />
            <div className="banner-info">
              <div>
                <span
                  style={{ color: "rgb(45, 194, 117)", marginRight: "10px" }}
                >
                  <i class="fa-solid fa-circle"></i> Từ 500.000đ
                </span>
                <span>
                  <i class="fa-solid fa-circle"></i> 12 Tháng 10, 2024
                </span>
              </div>
              <button className="btn btn-light mt-2">View Detail</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export function TicketSection() {
  return (
    <div className="mb-4">
      <h4 className="text-light mb-3">Sự kiện xu hướng</h4>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          430: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="ticket-card">
            <img
              src="https://images.tkbcdn.com/2/608/332/ts/ds/62/08/f8/80eadd37d65c9fe07a4c60f4ce843cdc.jpg"
              alt=""
              className="ticket-img"
            />
            <div className="ticket-info">
              <h7 className="text-light">
                [BẾN THÀNH] Đêm nhạc Thanh Duy - Myra Trần
              </h7>
              <div>
                <span
                  style={{ color: "rgb(45, 194, 117)", marginRight: "10px" }}
                >
                  <i class="fa-solid fa-circle"></i> Từ 500.000đ
                </span>
              </div>
              <span className="mt-2 text-light">
                <i class="fa-regular fa-calendar"></i> 12 tháng 10, 2024
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="ticket-card">
            <img
              src="https://images.tkbcdn.com/2/608/332/ts/ds/62/08/f8/80eadd37d65c9fe07a4c60f4ce843cdc.jpg"
              alt=""
              className="ticket-img"
            />
            <div className="ticket-info">
              <h7 className="text-light">
                [BẾN THÀNH] Đêm nhạc Thanh Duy - Myra Trần
              </h7>
              <div>
                <span
                  style={{ color: "rgb(45, 194, 117)", marginRight: "10px" }}
                >
                  <i class="fa-solid fa-circle"></i> Từ 500.000đ
                </span>
              </div>
              <span className="mt-2 text-light">
                <i class="fa-regular fa-calendar"></i> 12 tháng 10, 2024
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="ticket-card">
            <img
              src="https://images.tkbcdn.com/2/608/332/ts/ds/62/08/f8/80eadd37d65c9fe07a4c60f4ce843cdc.jpg"
              alt=""
              className="ticket-img"
            />
            <div className="ticket-info">
              <h7 className="text-light">
                [BẾN THÀNH] Đêm nhạc Thanh Duy - Myra Trần
              </h7>
              <div>
                <span
                  style={{ color: "rgb(45, 194, 117)", marginRight: "10px" }}
                >
                  <i class="fa-solid fa-circle"></i> Từ 500.000đ
                </span>
              </div>
              <span className="mt-2 text-light">
                <i class="fa-regular fa-calendar"></i> 12 tháng 10, 2024
              </span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="ticket-card">
            <img
              src="https://images.tkbcdn.com/2/608/332/ts/ds/62/08/f8/80eadd37d65c9fe07a4c60f4ce843cdc.jpg"
              alt=""
              className="ticket-img"
            />
            <div className="ticket-info">
              <h7 className="text-light">
                [BẾN THÀNH] Đêm nhạc Thanh Duy - Myra Trần
              </h7>
              <div>
                <span
                  style={{ color: "rgb(45, 194, 117)", marginRight: "10px" }}
                >
                  <i class="fa-solid fa-circle"></i> Từ 500.000đ
                </span>
              </div>
              <span className="mt-2 text-light">
                <i class="fa-regular fa-calendar"></i> 12 tháng 10, 2024
              </span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
