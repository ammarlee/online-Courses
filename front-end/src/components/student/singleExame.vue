<template>
  <div class="ml-auto pt-10 text-capitalize">
    <!-- HEADERS  -->
    <div v-if="examingMode" class="text-center">
      <h1>
        exams for chapter
        <br />
        <span class="rounded-lg py-2 px-4 white--text success">
        {{$route.params.id}}

        </span>
      </h1>
      <v-btn class="pink ma-6 white--text pa-6" @click="startExam">
        <v-icon class large>mdi-clock-start</v-icon>start exam
      </v-btn>
      <v-divider class="mb-5"></v-divider>
    </div>

    <div>
      <div v-if="timer" class="mb-10 text-center pink--text text-capitalize font-weight-bold">
        <h1 class="rounded-lg px-6 py-3 d-inline-block  grey lighten-3 orange--text">{{timer}}</h1>
        <v-divider></v-divider>
      </div>

      <div v-if="timer">
        <v-row>
          <v-col cols="6" class="ml-1 round-lg" v-if="exam">
           
            <examsModel :exam="exam" :readonly="sendfalse"></examsModel>
          </v-col>
          <v-col hidden cols="6" class="black white--text">right one</v-col>
        </v-row>
        <!-- send the answer -->
        <div v-if="timer">
          <v-btn class="pink ma-3 white--text" @click="sendTheExame()">finish exame</v-btn>
        </div>
      </div>
      <!-- dialog for answers  -->
      <v-dialog v-model="dialog" width="800">
        <v-card v-if="!showResult">
          <v-card-title class="headline grey pink--text text-capitalize lighten-2">
            your answers
          </v-card-title>
          <v-row>
            <v-col cols="12" class="ml-1 round-lg" v-if="exam">
            <examsModel :exam="exam" readonly='true'></examsModel>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn class="pink white--text" text @click="showtheResult">result</v-btn>
          </v-card-actions>
          <!-- the old dialog  -->
        </v-card>
        <v-card v-else>
          <div class="pa-5">
            <h2 class="text-center  text-capitalize font-weight-bold green--text">result</h2>
            <div class="text-center my-5">
              <v-progress-circular
                :rotate="360"
                :size="150"
                :width="15"
                :value="result *10"
                :color="result > 30? 'pink':'green'"
              >{{result * 10}}</v-progress-circular>
            </div>

            <v-card-actions >
              <v-btn class="info mx-auto d-block "  text @click="repeat">repeat</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
      <!-- finish dialog  answers -->
    </div>
  </div>
</template>

<script>
import Functions from "../../../server/api";
import examsModel from '../includes/examClone';
export default {
  name: "singleExame",
  components: {
    examsModel,
  },
  data() {
    return {
      timer: false,
      sendfalse:false,
      examingMode: true,
      showResult: false,
      fullMarks: null,
      exam: null,
      corrQ: null,
      errorQ: null,
      result: null,
      rightAnswer: null,
      dialog: false,
    };
  },
  mounted() {
    this.getUserLocation()
    console.log(this.$route.path);
    this.reload()},
  computed: {
    mainTimer() {
      return this.$store.getters.timer;
    },
  },
  methods: {
    showtheResult (){
      this.showResult = true;
      setTimeout(() => {
        this.$router.push('/exams')
      }, 3000);
    },
    async reload() {
      try {
        let chapter = this.$route.params.id;
        const res = await Functions.createChapterExame({ chapter });
        this.exam = res.data.exam[0];
        console.log(this.exam.questions);
        this.soultionModel = res.data.exam[0];
      } catch (error) {
        console.log(error);
      }
    },
    repeat() {
    this.$router.push('/')   
    },
    async getdata() {
      try {
        let res = await Functions.getStudentData();
        console.log(res.data.student.exams);
      } catch (error) {
        console.log(error);
      }
    },
    startExam() {
      this.timer = true;
      this.examingMode = false;
      let date = new Date();
      let exameTime = new Date(date.setHours(date.getHours() + 1));
      this.$store.commit("setTimer", exameTime);
      this.setTimer();
    },
    async sendTheExame() {
      try {
        this.timer = false;
        this.$store.commit("setTimer", null);
        let res = await Functions.sendTheExame(this.exam);
        this.corrQ = res.data.corrQ;
        this.errorQ = res.data.errorQ;
        this.result = res.data.result;
        this.fullMarks = res.data.fullMarks;
        this.dialog = true;
        // this.showResult =true

        this.exam.questions.forEach((question) => {
          this.errorQ.forEach((a) => {
            if (a._id.toString() == question.QuestionId._id.toString()) {
              setTimeout(() => {
                let ele = document.getElementById(question.QuestionId._id);
                let ele2 = document.getElementById(
                  "qu" + question.QuestionId._id
                );
                ele2.classList.add("pink--text");
                ele2.innerHTML += `X`;
                const div = document.createElement("p");
                div.innerHTML = a.le;

                // ele2.classList.add("pink");
                ele.append(div);
                ele.lastChild.classList.add(
                  "pa-5",
                  "green",
                  "font-weight-bold",
                  "white--text",
                  "text-capitalize"
                );
              }, 500);
            } else {
              return;
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    setTimer() {
      setTimeout(() => {
        this.$store.commit("setTimer", null);
        this.sendTheExame();
        clearInterval(counter);
        this.timer = false;
      }, new Date(this.mainTimer).getTime() - new Date().getTime()); // 1min

      let counter = setInterval(() => {
        if (this.mainTimer == null) {
          return;
        }
        const time = Math.ceil(
          new Date(this.mainTimer).getTime() - new Date().getTime()
        );

        var hour = Math.floor(
          (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((time % (1000 * 60)) / 1000);

        this.timer = `${hour}:${minutes}:${seconds}`;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>