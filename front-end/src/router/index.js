import Vue from "vue";
import VueRouter from "vue-router";
// footer and header
import header from "@/components/includes/navbar";
import carsoul from "@/components/includes/carsoul";
import footer from "@/components/includes/footer";
// import footer from "@/components/carsoul/footer";
// auth guard
import guardPage from "@/router/guardPage.js";
import adminGuard from "@/router/admin.js";
import onlineGuard from "@/router/onlineUser.js";
import chatGuard from "@/router/chat.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/client/:id",
    name: "client",
    beforeEnter:chatGuard,
    components: {
      default:()=>{ return import("@/components/includes/client")},
      header: header,
      
    },
  },
  {
    path: "/",
    name: "Home",
    components: {
      default:()=>{ return import("../views/Home.vue")},
      header,
      footer,
      carsoul
    },
  },
  {
    path: "/singleExame/:id",
    name: "singleExame",
    // before
    beforeEnter:guardPage,
    components: {
      default:()=>{ return import("@/components/student/singleExame")},
      footer: footer,
    },
  },
  // START ROUTER FOR MY EXAMS AND
  {
    path: "/myExams",
    name: "myExams",
    beforeEnter:guardPage,
    components: {
      default:()=>{ return import("@/components/student/myExams")},
      header: header,
      carsoul,
      footer: footer,
    },
  },
  {
    path: "/exams",
    name: "exams",
    beforeEnter:guardPage,
    components: {
      default:()=>{ return import("@/components/student/exams")},
      header: header,
      
      carsoul,
      footer: footer,
    },
  },
    // START ROUTER FOR MY lectures AND
    {
      path: "/lectures",
      name: "lectures",
     

      components: {
        default:()=>{ return import("@/components/student/lectures")},
        header: header,
        
      carsoul
 ,       footer: footer,
      },
    },
    // START ROUTER FOR MY lectures AND
    {
      path: "/profile",
      name: "profile",
      beforeEnter:guardPage,
      components: {
        default:()=>{ return import("@/components/student/profile")},
        header: header,
        footer: footer,
      },
    },
     // START ROUTER FOR SINGLE LECTUIRE WITH ID 
     {
      path: "/lecture/:id",
      name: "lecture",
      beforeEnter:guardPage,

      components: {
        default:()=>{ return import("@/components/student/lecture")},
        header: header,
        
      carsoul
 ,       footer: footer,
      },
    },
    //  for the pdf page
    {
      path: "/pdf/:id",
      name: "pdf",
      beforeEnter:guardPage,
      components: {
        default:()=>{ return import("@/components/student/pdf-page")},
        header: header,
        
      carsoul
 ,       footer: footer,
      },
    },
    // START ROUTER FOR admin 
    {
      path: "/admin",
      name: "admin",
      beforeEnter:adminGuard,
      components: {
        default:()=>{ return import("@/components/admin/admin.vue")},
      },
      children: [
        {
          path: "",
          name: "dashboard",
          components: {
            default:()=>{ return import("@/components/admin/dashboard.vue")}}
        },
        { path: "online", name: "online",  components: {
          default:()=>{ return import("@/components/admin/online.vue")}}
        },
        { path: "profile", name: "profile",  components: {
          default:()=>{ return import("@/components/admin/profile.vue")}}
        },
        { path: "questions", name: "questions",  components: {
          default:()=>{ return import("@/components/admin/questions.vue")}}
        },
        { path: "search", name: "search",  components: {
          default:()=>{ return import("@/components/admin/search.vue")}}
        },
        { path: "users", name: "users",  components: {
          default:()=>{ return import("@/components/admin/users.vue")}}
        },
        { path: "serialDetails", name: "serialDetails",  components: {
          default:()=>{ return import("@/components/admin/serialDetails.vue")}}
        },
        { path: "lectures", name: "lectures",  components: {
          default:()=>{ return import("@/components/admin/lectures.vue")}}
        },
  
        {
          path: "attendce",
          name: "attendce",
          components: {
            default:()=>{ return import("@/components/admin/attendce.vue")}}
        },
       ],
    },


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

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  
  // scrollBehavior () {
  //       return new Promise((resolve) => {
  //         setTimeout(() => {
  //           resolve(
  //             { x: 0, y: 100 },
  //           )
  //         }, 500)
  //       })
  // }
});

export default router;
