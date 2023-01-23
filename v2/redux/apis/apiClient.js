import axios from "axios";


//This is where you define where the backend is hosted. For testing, it's hosted locally. For deployment, it's on the deployment variable.
const local = 'http://localhost:8000/';
const deploy = 'https://backend-maglab.ue.r.appspot.com/'

export default axios.create({
  baseURL: local,
//   withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "x-csrftoken",
  validateStatus: () => true,
//   headers: {
//     Accept: "application/json",
//   },
});