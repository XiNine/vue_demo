const route = {
  path: '/classify',
  name: 'classify',
  component: () => import('@/views/classify'),
  mate: {
    requireAuth: true
  }
}

export default route;