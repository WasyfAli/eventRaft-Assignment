import { API } from "../../backend";
export const tag = (name) => {
  return fetch(`${API}/v1.0/tag/add`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(name),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
