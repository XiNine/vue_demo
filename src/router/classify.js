const route = {
  path: '/classify',
  name: 'classify',
  component: () => import('@/views/classify'),
  meta: {
    requireAuth: true
  }
}

export default route;