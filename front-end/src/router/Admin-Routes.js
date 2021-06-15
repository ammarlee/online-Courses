import adminGuard from "@/router/admin.js";
export default [
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
]