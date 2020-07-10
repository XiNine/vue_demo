const route = {
  path:'/home',
  name:'home',
  component:()=>import('@/views/home'),
  meta:{
    requireAuth:true
  }
}

export default route;