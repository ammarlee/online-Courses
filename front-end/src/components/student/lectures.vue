<template>
  <div>
    <div class="theslider" hidden>
      <v-sheet class="mx-auto" elevation="8">
        <v-slide-group v-model="model" class="pa-4" mandatory show-arrows>
          <v-slide-item v-for="(item,n) in lectures" :key="n" v-slot="{ active,  }">
            <v-card
              :color="active ? 'primary' : 'grey lighten-1'"
              class="ma-4"
              height="400"
              width="200"
              @click="goToLecture(item._id)"
            >
              <v-row
                class="fill-height"
                style="background-size:cover"
                :style="{ 'background-image': 'url(' + item.img + ')' }"
                align="end"
                justify="space-between"
              >
                <v-col cols="12">
                  <v-chip class="ma-2" color="orange" text-color="white">
                    {{item.free ? "free":"Premium"}}
                    <v-icon right>{{item.free ? "mdi-currency-usd-off":"mdi-star"}}</v-icon>
                  </v-chip>
                </v-col>

                <v-chip
                  class="ma-2 font-weight-bold"
                  color="orange"
                  text-color="white"
                >chapter:{{item.chapter}}</v-chip>
                <v-chip class="ma-2" color="orange" text-color="white">lesson :{{item.lesson}}</v-chip>

                <div></div>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
    <!-- second slide   -->

    <v-sheet class="mx-auto" elevation="8" max-width="800" min-height="200">
      <h1 class="text-center text-capitalize info--text pa-5">lectures</h1>
      <v-slide-group v-model="model2" class="pa-4" show-arrows>
        <v-slide-item v-for="n in chapters" :key="n" v-slot="{ active, toggle }">
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="200"
            width="100"
            style=" 
          background-image: linear-gradient(#642B73, #C6426E);"
            @click="toggle"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-chip class="ma-2" color="orange" text-color="white">{{n}}</v-chip>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model2 != null" height="200" tile>
          <v-carousel cycle height="300" hide-delimiter-background show-arrows-on-hover>
            <div v-if="getData.length >0">
              <v-carousel-item v-for="(one, i) in getData" :key="i">
                <v-sheet height="100%">
                  <v-row class="fill-height fill-width" align="center" justify="center">
                    <v-img :src="one.img" alt="welcome"></v-img>
                    <v-fade-transition>
                      <v-overlay absolute color="rgb(33 33 33)">
                        <div class="text-center text-capitalize">
                          <h1 class="font-weight-bold">{{one.text}}</h1>
                          <v-chip class="ma-2" color="orange" small text-color="white">
                            {{one.free ? "free":"Premium"}}
                            <v-icon right>{{one.free ? "mdi-currency-usd-off":"mdi-star"}}</v-icon>
                          </v-chip>
                          <br />
                          <v-chip class="ma-2" color="orange" text-color="white">{{one.lesson}}</v-chip>
                          <br />

                          <v-btn
                            outlined
                            @click="goToLecture(one._id)"
                            class="d-block mt-3 font-weight-bold success--text mx-auto"
                          >
                            watch now
                            <v-icon>mdi-arrow-right</v-icon>
                          </v-btn>
                        </div>
                      </v-overlay>
                    </v-fade-transition>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </div>
            <div v-else>
              <h1
                class="text-capitalize text-center font-weight-bold pt-5 pink--text"
              >there is no lectures for chapter {{model2+1}}</h1>
            </div>
          </v-carousel>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
    <!-- dialog for payment  -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title
            class="headline text-body-2 yellow black--text text-capitalize text-center lighten-2"
          >enter the card number</v-card-title>
          <div class="ma-2 mt-3">
            <v-text-field
              autocomplete="off"
              hide-details
              class="mb-3"
              dense
              v-model="secretNumber"
              outlined
              label="Enter Secret Code"
            ></v-text-field>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="pink" @click="dialog = false">cancle</v-btn>
            <v-btn text color="success" @click="submitPayment" :disabled="!isValidInput()">confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import Functions from "../../../server/LecturesApi";

export default {
  name: "lectures",
  data() {
    return {
      lectures: null,
      alertError: null,
      model: null,
      model2: null,
      chapters: [],
      dialog: false,
      secretNumber: "",
      lectureId: null,
    };
  },

  async mounted() {
    const res = await Functions.getAllLectures();
    this.lectures = res.data.lectures;
    let Editchapters = this.lectures.map((i) => {
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
    isValidInput() {
      let s;
      if (this.secretNumber.length < 13) {
        s = false;
      } else {
        s = true;
      }
      return s;
    },
    async submitPayment() {
      try {
        let paymentData = {
          serialNumber: this.secretNumber,
          studentId: this.currentUser._id,
          lectureId: this.lectureId,
        };

        const res = await Functions.submitPayment(paymentData);
        console.log(res);
        this.$router.push(`/lecture/${this.lectureId}`);
      } catch (error) {
        this.dialogNotifyError("invalide number");
        console.log(error);
      }
    },
    msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    },
    IsUserAuthanticated() {
      if (!this.currentUser) {
        this.$router.push("/login");
        return;
      }
    },
    isStudentInAttendece(userId, lecture) {
      let student = lecture.StudentAttendance.find((i) => {
        return i.studentId.toString() == userId.toString();
      });
      return student;
    },
    getLectureFinishedTime(student) {
      let StartingTime =
        new Date(student.endTime).getTime() - new Date().getTime();

      let remaind = Math.round(StartingTime);
      if (remaind <= 0) {
        this.dialog = true;
        return;
      } else{
          this.$router.push("/lecture/" + this.lectureId);
          return
      }
    },

    async goToLecture(id) {
      this.IsUserAuthanticated();
      this.lectureId = id;
      const userId = this.currentUser._id;
      let lecture = this.lectures.find((i) => i._id == id);
      if (lecture.free === false) {
        let student = this.isStudentInAttendece(userId, lecture);
        if (!student) {
          this.dialog = true;
          return;
        }
        this.getLectureFinishedTime(student)
      } else {
        let student = this.isStudentInAttendece(userId, lecture);
        if (!student) {
          this.$router.push("/lecture/" + id);
          return;
        }
        this.getLectureFinishedTime(student)
      }
    },
  },

  computed: {
    getData() {
      return this.lectures
        .filter((lecture) => lecture.chapter == this.model2 + 1)
        .sort((a, b) => a.lesson - b.lesson);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>