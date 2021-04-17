const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Index',
        path: '',
        component: () => import('pages/Index.vue'),
      },
      {
        path: 'online-platforms',
        component: () => import('pages/238/Index.vue'),
        meta: {
          roles: ["DEVELOPER", "LECTURER", "SUPER_ADMIN"]
        }
      },
      {
        path: 'online-platforms/admin',
        component: () => import('pages/238/admin/Index.vue'),
        meta: {
          roles: ["DEVELOPER", "OFFICE", "SUPER_ADMIN"],
          allowForUsers: ["60759b050928a277deb73715"]
        }
      },
      {
        path: 'online-platforms/admin/lecturer/:email',
        component: () => import('pages/238/admin/Lecturer.vue'),
        meta: {
          roles: ["DEVELOPER", "OFFICE", "SUPER_ADMIN"],
          allowForUsers: ["60759b050928a277deb73715"]
        }
      },
      {
        path: 'form-create',
        component: () => import('pages/588/CreateForm.vue'),
        meta: {
          roles: ["DEVELOPER", "SUPER_ADMIN"],
        }
      },
      {
        path: 'feedback',
        component: () => import('pages/588/Feedback.vue')
      },
      {
        path: 'diagrams-task/c/:c_id/t/:t_id',
        component: () => import('pages/misc/DiagramsRedirect')
      },
      {
        path: 'ci-cd',
        component: () => import('pages/589/Index.vue'),
        meta: {
          roles: ["DEVELOPER", "SUPER_ADMIN"],
        }
      },
      {
        path: 'solvers',
        component: () => import('pages/19101/Index.vue'),
        meta: {
          roles: ["DEVELOPER", "SUPER_ADMIN"],
        }
      },
      {
        path: 'network-technologies',
        component: () => import('src/pages/562/Index.vue'),
        meta: {
          roles: ["DEVELOPER", "SUPER_ADMIN"],
          allowForUsers: ["60739ae61c79983c32b78b17"]
        }
      },
      {
        path: 'booking',
        component: () => import('src/pages/562/Booking-form.vue'),
        meta: {
          roles: ["DEVELOPER", "SUPER_ADMIN"],
          allowForUsers: ["60739ae61c79983c32b78b17"]
        }
      },
      {
        path: 'review-request',
        component: () => import('src/pages/562/Review-request-form.vue'),
        meta: {
          roles: ["DEVELOPER", "SUPER_ADMIN"],
          allowForUsers: ["60739ae61c79983c32b78b17"]
        }
      },

      {
        path: 'workbook-tasks',
        component: () => import('src/pages/590/Index.vue'),
        meta: {
          roles: ["DEVELOPER", "SUPER_ADMIN"],
          allowForUsers: ["60759b050928a277deb73715"]
        }
      },
      {
        path: 'nvt',
        component: () => import('src/pages/nvt/Index.vue'),
        meta: {
          roles: ["COURSE_NVT", "DEVELOPER", "SUPER_ADMIN"],
          allowForRuzGroups: ["БИВ181", "БИВ182"],
        }
      },
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/AnonymousLayout.vue'),
    children: [
      {
        name: 'Login',
        path: '',
        component: () => import('pages/Login.vue'),
        meta: {
          anonymousOnly: true
        }
      },
    ]
  },
  {
    path: '/global-error',
    component: () => import('layouts/AnonymousLayout.vue'),
    children: [
      {
        name: 'GlobalError',
        path: '',
        component: () => import('pages/GlobalError.vue'),
        meta: {
          ignoreAuth: true
        }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
    meta: {
      ignoreAuth: true
    }
  }
]

export default routes
