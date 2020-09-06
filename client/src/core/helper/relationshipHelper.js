import { API } from "../../backend";

export const relationship = (data) => {
  return fetch(`${API}/v1.0/add/relation`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getrelationship = (data) => {
  return fetch(`${API}/v1.0/get/relation`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.json();
    // .then((data) => ({
    //   data: data,
    //   status: response.status,
    // }))
    // .then((res) => {
    //   console.log(res.status, res.data.data);
    // });
  });
};

// console.log("RESPONSE", response.json());
