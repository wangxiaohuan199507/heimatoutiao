// 专门处理路由拦截器 导航守卫
import router from '../router'

// 全局前置守卫 当路由发生变化 时，这个方法里的回调函数就会执行
router.beforeEach(function (to, from, next) {
  // 权限拦截 认为有token让过去，没token不让过
  if (to.path.startsWith('/home')) {
    // 确定要检查的范围
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 放过
    } else {
      next('/login') // 跳转到登录页
    }
  } else {
    next() // 直接放过
  }
})
