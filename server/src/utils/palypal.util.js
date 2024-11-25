const axios = require("axios");

const getPayPalAccessToken = async () => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const { data } = await axios.post(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return data.access_token;
};

const createPayPalOrder = async (amount, currency = "USD") => {
  const token = await getPayPalAccessToken();

  const { data } = await axios.post(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
        },
      ],
      application_context: {
        return_url: "http://localhost:5000/api/bookings/capture",
        cancel_url: "http://localhost:5000/api/bookings/cancel",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

const capturePayPalOrder = async (orderId) => {
  const token = await getPayPalAccessToken();

  const { data } = await axios.post(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

module.exports = {
  createPayPalOrder,
  capturePayPalOrder,
};
