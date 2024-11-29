import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./style/Swiper.css";
import { useNavigate } from "react-router-dom";

import { useFetch } from "../../hooks/UseFetch";
const apiUrl = "http://localhost:5000/api/";

export function HomeBanner() {
  const navigate = useNavigate();
  const {
    data: events,
    loading,
    error,
  } = useFetch(`${apiUrl}events/latest`, []);

  const handleNavigate = (eventId) => {
    navigate(`/event-detail/${eventId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading events: {error.message}</div>;
  if (!events || events.length === 0) return <div>No events found.</div>;

  return (
    <div className="mb-4">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        breakpoints={{
          300: { slidesPerView: 1, spaceBetween: 30 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 2, spaceBetween: 30 },
        }}
        loop={true}
        className="mySwiper"
      >
        {events.map((event) => (
          <SwiperSlide key={event._id}>
            <div
              className="banner-card"
              onClick={() => handleNavigate(event._id)}
            >
              <div className="image-container">
                <img src={event.image} alt="" className="ticket-img" />
                <div className="overlay"></div>
              </div>
              <div className="banner-info">
                <h1>{event.title}</h1>
                <div>
                  <span
                    style={{ color: "rgb(45, 194, 117)", marginRight: "10px" }}
                  >
                    <i className="fa-solid fa-circle"></i> Từ {`${event.price}`}{" "}
                    đ
                  </span>
                  <span>
                    <i className="fa-solid fa-circle"></i>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <button
                  className="btn btn-light mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(event._id);
                  }}
                >
                  View Detail
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function TicketSection(data) {
  const navigate = useNavigate();
  const {
    data: events,
    loading,
    error,
  } = useFetch(`${apiUrl}events${data.param}`, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const resp = await axios.get(`${apiUrl}events${data.param}`);
        setEvents(resp.data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleNavigate = (eventId) => {
    navigate(`/event-detail/${eventId}`);
  };
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between">
        <h4 className="text-light mb-3">{data.title}</h4>
        <a
          className="text-light"
          onClick={() => navigate(`/view-all?query=${data.param}`)}
        >
          View All
        </a>
      </div>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
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
          {events.map((event) => (
            <SwiperSlide
              key={event.id}
              onClick={() => handleNavigate(event._id)}
            >
              <div className="ticket-card">
                <img
                  src={event.image}
                  alt={event.title}
                  className="ticket-img"
                />
                <div className="ticket-info">
                  <h7 className="text-light">{event.title}</h7>
                  <div>
                    <span
                      style={{
                        color: "rgb(45, 194, 117)",
                        marginRight: "10px",
                      }}
                    >
                      <i className="fa-solid fa-circle"></i> Từ {event.price}đ
                    </span>
                  </div>
                  <span className="mt-2 text-light">
                    <i className="fa-regular fa-calendar"></i>{" "}
                    {new Date(event.date).toLocaleDateString()} -{" "}
                    {new Date(event.date).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
