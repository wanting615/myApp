import { useStore } from '@/store';
import { Router } from 'vue-router';

export function loginGuard(router: Router) {
  const store = useStore();
  router.beforeEach(async (to, from, next) => {
    if (to.meta && to.meta.needLogin) {
      if (store.state.user.loginToken) next();
      next({
        path: '/login'
      })
    } else {
      next();
    }
  })
}