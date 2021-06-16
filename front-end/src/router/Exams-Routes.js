import header from "@/components/includes/navbar";
import carsoul from "@/components/includes/carsoul";
import footer from "@/components/includes/footer";
// auth guard
import guardPage from "@/router/guardPage.js";

export default [
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
  {
    path: "/singleExame/:id",
    name: "singleExame",
    // before
    beforeEnter:guardPage,
    components: {
      default:()=>{ return import("@/components/student/singleExame")},
      // footer: footer,
    },
  },
  {
    path: "/printExam/:id",
    name: "printExam",
    beforeEnter:guardPage,
    components: {
      default:()=>{ return import("@/components/student/Print-Exam")},
    },
  },
 
]