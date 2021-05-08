import Vue from "vue";
import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

Vue.prototype.$axios = axiosInstance;

export { axiosInstance };
