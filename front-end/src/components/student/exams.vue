<template>
  <div>
    <h1 class="text-capitalize text-center font-weight-bold mb-16">all exams</h1>
    <div>
        <v-container>

      <v-row>
        <v-col cols="12" sm="4" md="4" v-for="(item,i)  in chapters"  :key="i" @click="goToExam(item)">
          <div 
          style="cursor:pointer ; 
          background-image: linear-gradient(#8A2387, #E94057,#F27121);" class="mx-auto text-center rounded-lg text-h4 text-capitalize success white--text font-weight-bold pa-14 ma-2">chapter: {{item}}</div>
        </v-col>
      </v-row>
        </v-container>

    </div>
  </div>
</template>

<script>
import Functions from "../../../server/ExamsApi";
import LecturesApi from "../../../server/LecturesApi";


export default {
  name: "exams",
  data() {
    return {
      exams: null,
      chapters:[]
    };
  },
  async mounted() {
    const res = await Functions.getAllExams();
    const resp = await LecturesApi.getAllLectures();
    this.getUserLocation()
    this.exams = res.data.exams;
    let lectures = resp.data.lectures;
    let Editchapters = lectures.map((i) => {
      return i.chapter;
    });
    let chapters = new Set(Editchapters);
    chapters.forEach((value) => {
      this.chapters.push(+value);
    });
    this.chapters.sort((a, b) => {
      return a - b;
    });
  },
 
  methods: {
    goToExam(id) {
      this.$router.push("/singleExame/" + id);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>