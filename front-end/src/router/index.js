import Vue from "vue";
import VueRouter from "vue-router";
// footer and header
// import footer from "@/components/carsoul/footer";
import header from "@/components/includes/navbar";
import carsoul from "@/components/includes/carsoul";
import footer from "@/components/includes/footer";
// ALL ROUTES 
import AdminRoutes from "./Admin-Routers"
import AuthanticationRoutes from "./Authantication-Routers"
import lectureRoutes from "./Lectures-Routers"
import ExamsRoutes from "./Exams-Routers"
import UsersRoutes from "./Users-Routers"
Vue.use(VueRouter);

const routes = [
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
  
  ...AdminRoutes,
  ...AuthanticationRoutes,
  ...ExamsRoutes,
  ...UsersRoutes,
  ...lectureRoutes,
   

  

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
