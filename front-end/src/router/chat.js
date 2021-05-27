import store from "../store";

export default (to, from, next) => {
  if (store.getters.getUser &&store.getters.getUser.role=='guide') {
    next();
  } else {
    next("/");
  }
};
