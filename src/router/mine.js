const route = {
  path: '/mine',
  name: 'mine',
  component: () => import('@/views/mine'),
  meta: {
    requireAuth: true
  }
}

export default route;