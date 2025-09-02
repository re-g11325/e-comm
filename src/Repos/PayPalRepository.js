let baseUrl = "https://api-m.sandbox.paypal.com";
//let baseUrl = "https://api-m.paypal.com";

//const base64 = require("base-64");
// import base64 from "react-native-base64";

const getOrderDetails = (
  itemName,
  itemDescription,
  itemQty,
  itemPrice,
  itemCurrency
) => {
  let orderDetail = {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: [
          {
            name: itemName,
            description: itemDescription,
            quantity: itemQty,
            unit_amount: {
              currency_code: itemCurrency,
              value: itemPrice,
            },
          },
        ],
        amount: {
          currency_code: itemCurrency,
          value: itemPrice,
          breakdown: {
            item_total: {
              currency_code: itemCurrency,
              value: itemPrice,
            },
          },
        },
      },
    ],
    application_context: {
      return_url: "https://example.com/return",
      cancel_url: "https://example.com/cancel",
    },
  };
  return orderDetail;
};

const generateToken = (_cliId, _key) => {
  var headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", "Basic " + btoa(`${_cliId}:${_key}`));

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: "grant_type=client_credentials",
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v1/oauth2/token", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(" generateToken result print", result);
        const { access_token } = JSON.parse(result);
        resolve(access_token);
      })
      .catch((error) => {
        console.log("error raised", error);
        reject(error);
      });
  });
};

const createOrder = (orderDetail, token = "") => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v2/checkout/orders", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("createOrder result print", result);
        const res = JSON.parse(result);
        resolve(res);
      })
      .catch((error) => {
        console.log("error raised", error);
        reject(error);
      });
  });
};

const capturePayment = (id, token = "") => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log("result print", result);
        const res = JSON.parse(result);
        resolve(res);
      })
      .catch((error) => {
        console.log("error raised", error);
        reject(error);
      });
  });
};

export default {
  getOrderDetails,
  generateToken,
  createOrder,
  capturePayment,
};
