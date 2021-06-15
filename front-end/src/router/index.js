import Vue from "vue";
import VueRouter from "vue-router";
// footer and header
// import footer from "@/components/carsoul/footer";
import header from "@/components/includes/navbar";
import carsoul from "@/components/includes/carsoul";
import footer from "@/components/includes/footer";
// ALL ROUTES 
import AdminRoutes from "./Admin-Routes"
import AuthanticationRoutes from "./Authantication-Routes"
import lectureRoutes from "./Lectures-Routes"
import ExamsRoutes from "./Exams-Routes"
import UsersRoutes from "./Users-Routes"
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
