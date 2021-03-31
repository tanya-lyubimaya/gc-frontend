const routes = [
  {
    name: 'Index',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: 'online-platforms', component: () => import('pages/OnlinePlatforms.vue')},
      {path: 'form-create', component: () => import('pages/588/CreateForm.vue')},
      {path: 'feedback', component: () => import('pages/588/Feedback.vue')},
      {path: 'diagrams-task/c/:c_id/t/:t_id', component: () => import('pages/misc/DiagramsRedirect')},
      {path: 'ci-cd', component: () => import('pages/589/Index.vue')},
      {path: 'solvers', component: () => import('pages/19101/Index.vue')},
      {path: 'network-technologies', component: () => import('src/pages/562/Index.vue')},
      {path: 'booking', component: () => import('src/pages/562/Booking-form.vue')},
      {path: 'review-request', component: () => import('src/pages/562/Review-request-form.vue')},
      {path: 'workbook-tasks', component: () => import('src/pages/590/Index.vue')},
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {name: 'Login', path: '', component: () => import('pages/Login.vue')},
    ]
  },
  {
    path: '/global-error',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {name: 'GlobalError', path: '', component: () => import('pages/GlobalError.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
