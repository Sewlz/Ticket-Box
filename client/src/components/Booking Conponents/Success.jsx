import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";
export function ResultPage() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    const orderID = searchParams.get("token");

    if (!orderID) {
      setMessage("Missing order ID or booking ID.");
      return;
    }

    const capturePayment = async () => {
      try {
        const payload = { orderID };

        const response = await axios.post(
          "http://localhost:5000/api/bookings/capture",
          payload
        );

        if (response.data.message === "Payment captured successfully") {
          setMessage("Payment was successful!");
        } else {
          setMessage(response.data.message || "Payment failed.");
        }
      } catch (error) {
        setMessage("An error occurred during payment processing.");
      }
    };

    capturePayment();
  }, [searchParams]);

  return (
    <Container>
      <Alert
        variant="success"
        className="text-white mt-3"
        style={{ backgroundColor: "#28a745" }}
      >
        {message}
      </Alert>
    </Container>
  );
}
