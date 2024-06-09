import axios from "axios";
const instance = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export default instance;
