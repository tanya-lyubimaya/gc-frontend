import {boot} from 'quasar/wrappers'
import {axiosInstance} from "boot/axios";
import {SessionStorage} from "quasar";

export default boot(async ({app, router, Vue, redirect, urlPath}) => {
  router.beforeEach(async (to, from, next) => {

    if (to.name === 'GlobalError') {
      next()
      return
    }

    let loggedIn = false;

    try {
      const response = await axiosInstance
        .get(`${process.env.AUTH_API}/users/me`, {withCredentials: true});

      if (response.status === 200 && response.data) {
        loggedIn = true;

        try {
          SessionStorage.set('full_name', response.data['name']['full_name']);
          SessionStorage.set('hse_email', response.data['hse_email']);
          SessionStorage.set('google_email', response.data['google_email']);
          SessionStorage.set('is_teacher', response.data['is_teacher']);
          SessionStorage.set('is_student', response.data['is_student']);
          SessionStorage.set('name_abbr', response.data['name']['first_name'][0] + response.data['name']['last_name'][0]);
          SessionStorage.set('auth_token', response.data['auth_token']);
        } catch (e) {
          console.error(e);
        }
      }
      else if (![401, 403].includes(response.status)) {
        next({
          name: 'GlobalError'
        })
        return
      }
    } catch (error) {
      next({
        name: 'GlobalError'
      })
      return
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
