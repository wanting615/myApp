import { Router } from 'vue-router';
import { loginGuard } from "./loginGuard";

export function setRouterGuard(router: Router) {
  loginGuard(router);
}