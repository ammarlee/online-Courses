<template>
  <div>
    <div v-for="(exame ,i) in exams " :key="i">
      {{exame._id}}
      <br />
      {{exame.result}}
      <br />
      {{exame.date}}
      <v-btn @click="gettheExame(exame._id)">exame : {{i}}</v-btn>
    </div>
    <div >
      <pdf src="exame_6060e3a08bee5e0b4cd80021.pdf"></pdf>
    </div>
  </div>
</template>

<script>
import Functions from "../../../server/api";
import pdf from "vue-pdf";

export default {
  components: {
    pdf,
  },
  name: "myExams",

  data() {
    return {
      exams: null,
      link: null,
      te:false,
    };
  },
  async mounted() {
    try {
      let res = await Functions.getStudentData();
      console.log(res.data.student.exams[0]);
      this.exams = res.data.student.exams;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async gettheExame(id) {
      try {
        let res = await Functions.examPdf({
          id,
          userId: "60480ff0d16ae939082dae76",
        });
        console.log(res);
        // this.$router.push('/pdf/' +id)
       
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>