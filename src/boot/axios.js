import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.PROD ? 'https://constructor.auditory.ru' : 'https://constructor.auditory.ru',
  withCredentials: !!process.env.DEV
})

Vue.prototype.$axios = axiosInstance;

export {axiosInstance};
