import {axiosInstance} from "boot/axios";

export async function handleLogin({commit}) {
  const useResponse = await axiosInstance
    .get(`${process.env.AUTH_API}/users/me`, {withCredentials: true});
  commit('updateUserData', useResponse.data);
  const rolesResponse = await axiosInstance
    .get(`${process.env.AUTH_API}/users/me/dynamic-roles`, {withCredentials: true});
  commit('updateUserDynamicRoles', rolesResponse.data)
  const sharedInfoTokenResponse = await axiosInstance
    .get(`${process.env.AUTH_API}/users/me/shared-info-token`, {withCredentials: true});
  commit('updateSharedInfoToken', sharedInfoTokenResponse.data)
  commit('setLoggedIn', true)
}
