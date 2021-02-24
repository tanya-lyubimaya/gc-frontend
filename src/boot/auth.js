import {boot} from 'quasar/wrappers'
import {axiosInstance} from "boot/axios";
import {SessionStorage} from "quasar";

export default boot(async ({app, router, Vue, redirect, urlPath}) => {
  router.beforeEach(async (to, from, next) => {
    let loggedIn = false;

    try {
      const response = await axiosInstance
        .get('/auth/api/v1/users/me', {withCredentials: true});

      if (response.data && response.data['auth_status'] === 'OK') {
        loggedIn = true;

        try {
          SessionStorage.set('full_name', response.data['name']['full_name']);
          SessionStorage.set('hse_email', response.data['hse_email']);
          SessionStorage.set('is_teacher', response.data['is_teacher']);
          SessionStorage.set('is_student', response.data['is_student']);
          SessionStorage.set('name_abbr', response.data['name']['first_name'][0] + response.data['name']['last_name'][0]);
          SessionStorage.set('auth_token', response.data['auth_token']);
        } catch (e) {
          console.error(e);
        }

      }
    } catch (error) {
      loggedIn = false;
    }
    if (!loggedIn && to.name !== 'Login') {
      next({
        name: 'Login',
        // TODO: Redirect back?
        // query: {'redirect_url': encodeURIComponent(location.origin + (router.baseURL ? ) + (router.mode === "hash" ? '#' : '') + to.fullPath)}
      })
    } else if (loggedIn && to.name === 'Login') {
      next({name: 'Index'})
    } else {
      next()
    }
  })
})
