const route = {
  path: '/mine',
  name: 'mine',
  component: () => import('@/views/mine'),
  mate: {
    requireAuth: true
  }
}

export default route;