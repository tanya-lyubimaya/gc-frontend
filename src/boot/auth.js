import {boot} from 'quasar/wrappers'
import {hasAuthToken, removeAuthToken} from "src/utils/auth";


export default boot(async ({app, router, Vue, redirect, urlPath, store}) => {
  router.beforeEach(async (to, from, next) => {
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      if (hasAuthToken() && !store.state.user.loggedIn) {
        // If the user is not logged in but has auth token
        try {
          // then we try to get his info
          await store.dispatch('user/handleLogin');
        } catch (e) {
          console.error(e);
          if (e.response) {
            if (e.response.status >= 400 && e.response.status < 500) {
              // removeAuthToken();
              next({
                name: 'Login'
              });
              return;
            }
            if (e.response.status >= 500) {
              next({
                name: 'GlobalError'
              });
              return;
            }
          }
        }
      }

      if (store.state.user.loggedIn) {
        if (to.meta.anonymousOnly) {
          next('/');
          return;
        }

        if (to.meta && to.meta.roles) {
          const hasRole = store.getters['user/dynamicRoles'].some(role => to.meta.roles.includes(role));
          if ((hasRole ^ (to.meta.excludeRoles ? 1 : 0)) ||
            to.meta.allowForUsers?.includes(store.state.user.data.id) ||
            to.meta.allowForRuzGroups?.includes(store.getters["user/ruzGroup"])) {
            next();
          } else {
            next(false);
          }
        } else {
          next();
        }
      } else {
        if (!to.meta.anonymousOnly) {
          // if (hasAuthToken())
          //   removeAuthToken();
          next({name: 'Login'});
          return;
        }
        next();
      }
    }
  )
})
