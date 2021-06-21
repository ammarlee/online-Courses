
import onlineGuard from "@/router/onlineUser.js";

export default [
    // START  ROUTER FOR AUTHANTICATIONS 
  {
    path: "/login",
    name: "login",
    beforeEnter:onlineGuard,

    components: {
      default:()=>{ return import("@/components/auth/Login.vue")},
    }
  },
  {
    path: "/signup",
    name: "signup",
    // component: signup,
    beforeEnter:onlineGuard,

    components: {
      default:()=>{ return import("@/components/auth/Signup.vue")}
    }
  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    beforeEnter:onlineGuard,

    components: {
      default:()=>{ return import("@/components/auth/forgetPassword.vue")}
    }
  },
  {
    path: "/reset/:token",
    name: "resetPassword",
    beforeEnter:onlineGuard,

    components: {
      default:()=>{ return import("@/components/auth/resetPassword.vue")}
    }
  },

]