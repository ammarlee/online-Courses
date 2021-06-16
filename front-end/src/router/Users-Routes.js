import header from "@/components/includes/navbar";
import footer from "@/components/includes/footer";
// auth guard
import guardPage from "@/router/guardPage.js";
import chatGuard from "@/router/chat.js";

export default [
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
        path: "/profile",
        name: "profile",
        beforeEnter:guardPage,
        components: {
          default:()=>{ return import("@/components/student/profile")},
          header: header,
          footer: footer,
        },
      },
      {
        path: "/files",
        name: "files",
        beforeEnter:guardPage,
        components: {
          default:()=>{ return import("@/components/student/Files")},
          header: header,
          footer: footer,
        },
      },
      
]