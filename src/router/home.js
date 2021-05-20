const route = {
  path:'/home',
  name:'home',
  component:()=>import('@/views/home'),
  mate:{
    requireAuth:true
  }
}

export default route;