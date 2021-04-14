import {axiosInstance} from "boot/axios";

export async function handleLogin({commit}) {
  const user_response = await axiosInstance
    .get(`${process.env.AUTH_API}/users/me`, {withCredentials: true});
  commit('updateUserData', user_response.data);
  const roles_response = await axiosInstance
    .get(`${process.env.AUTH_API}/users/me/dynamic-roles`, {withCredentials: true});
  commit('updateUserDynamicRoles', roles_response.data)
  commit('setLoggedIn', true)
}
