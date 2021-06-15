import header from "@/components/includes/navbar";
import carsoul from "@/components/includes/carsoul";
import footer from "@/components/includes/footer";
// auth guard
import guardPage from "@/router/guardPage.js";

export default [
     // START ROUTER FOR SINGLE LECTUIRE WITH ID 
     {
        path: "/lecture/:id",
        name: "lecture",
        beforeEnter:guardPage,
        components: {
          default:()=>{ return import("@/components/student/lecture")},
          header: header,
         footer: footer,
        },
      },
      {
        path: "/LectureDetails/:id",
        name: "LectureDetails",
        beforeEnter:guardPage,
        components: {
          default:()=>{ return import("@/components/student/SingleLecture")},
          header: header,
          footer: footer,
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
      {
        path: "/lectures",
        name: "allLectures",
        components: {
          default:()=>{ return import("@/components/student/lectures")},
          header: header,
          carsoul
   ,       footer: footer,
        },
      },  
]