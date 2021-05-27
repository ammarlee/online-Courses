<template>
  <div>
    <h1 class="text-capitalize text-center font-weight-bold mb-16">all exams</h1>
    <div v-if="onlineUsers">
      {{onlineUsers}}
    </div>
    <div>
        <v-container>

      <v-row>
        <v-col cols="12" sm="4" md="4" v-for="(item,i)  in 10"  :key="i" @click="goToExam(item)">
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
import Functions from "../../../server/api";

export default {
  name: "exams",
  data() {
    return {
      exams: null,
    };
  },
  async mounted() {
    const res = await Functions.getAllExams();
    this.getUserLocation()
    this.exams = res.data.exams;
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