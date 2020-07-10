const route = {
  path: '/shoppingCar',
  name: 'shoppingCar',
  component: () => import('@/views/shoppingCar'),
  meta: {
    requireAuth: true
  }
}

export default route;