const route = {
  path: '/shoppingCar',
  name: 'shoppingCar',
  component: () => import('@/views/shoppingCar'),
  meta:{
    roles:['2'],
    show:true
   },
}

export default route;