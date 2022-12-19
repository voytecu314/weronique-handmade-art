const fetch = require("node-fetch");

const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

async function createOrder(value) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value,
            breakdown: {
                item_total: {
                  currency_code: "EUR",
                  value,
                },
              },
          },
          items: [
            {
                name: 'Tedyy Beddy',
                quantity: 1,
                unit_amount: {
                    currency_code: "EUR",
                    value: 3.50
                },
                description: 'Teddy that will rock and roll all night long'
            },
            {
                name: 'Sally Bally',
                quantity: 1,
                unit_amount: {
                    currency_code: "EUR",
                    value: 2.50
                },
                description: 'Very nice doll to play with'
            }
          ]
        },
      ],
    }),
  });

  return handleResponse(response);
}

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}

async function generateAccessToken() {
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_APP_SECRET).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}

module.exports = {createOrder, capturePayment, generateAccessToken};