import store from "../store/index";
import getToken from "@/plugins/wApi/lib/getToken";

// Local Storage 혹은 SessionStorage에 저장될 Token KeyName
// Account 개발시 사용 개발용
const useAuth = ["production", "dev"].includes(process.env.NODE_ENV) || true;

export default async (to, from, next) => {
  // console.log(from, "=>", to);
  if (!useAuth) {
    if (!store.getters.loaded) store.commit("set", ["loaded", true]);
    return next();
  }
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);
  const requireNoAuth = to.matched.some((record) => record.meta.requireNoAuth);
  let user = store.getters.user;

  if (!store.getters.loaded) {
    try {
      if (getToken().Authorization) {
        // const user = getToken().Authorization;
        user = await store.dispatch("getMe");
      }
      store.commit("set", ["loaded", true]);
    } catch (error) {
      store.commit("set", ["loaded", true]);
    }
  }
  if (requireAuth) {
    // 사용자만 접근 가능
    if (user) {
      // 사용자가 있는 경우
      next();
    } else {
      // 사용자가 없는 경우
      next("/account/login");
    }
  } else if (requireNoAuth) {
    if (user) {
      next(from);
    } else {
      next();
    }
  } else {
    next();
  }
};
