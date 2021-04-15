import Vue from "vue";
import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

Vue.prototype.$axios = axiosInstance;

export { axiosInstance };
