<template>
  <div class="text-center">
    <h2
      class="headline pa-10 text-capitalize text-center info--text"
      style="font-family: 'Material Design Icons' !important;"
    >all uploaded lectures</h2>
    <v-btn @click="testpro">test</v-btn>
    <div>
      <app-table
        title="create new lecturess"
        :lectures="lectures"
        :lectureList=" ['chapter','lesson','date','attendce','actions']"
        :deleteLecture="deleteLecture"
        :editLecture="editLecture"
        :refsImg="refsImg"
        :uploadImg="uploadImg"
        :saveUpdate="saveUpdate"
        :addExtraTime="addExtraTime"
        :updateTimer="updateTimer"
      >
        <div slot="createLecture">
          <v-btn @click="dialogCreated =!dialogCreated" fab class="green">
            <v-icon class="white--text">mdi-plus</v-icon>
          </v-btn>
        </div>
        <div slot="lectureError" v-if="!lectures">
          <v-alert type="error" class="text-capitalize" outlined>you have not any lectures yet</v-alert>
        </div>
      </app-table>

      <v-dialog v-model="dialogCreated" max-width="800px">
        <v-card class="pa-3">
          <createLecture>
            <template v-slot:cancelbtn class="d-inline-bolck">
              <v-btn
                text
                class="white text-capitalize orange--text"
                @click="dialogCreated=false"
              >cancel</v-btn>
            </template>
          </createLecture>
        </v-card>
      </v-dialog>

      <!--  END THE DELETING LECTURE -->
      <!--  START EDITING LECTURE -->
      <v-dialog v-model="editDialog" max-width="500px" v-if="editDialog">
        <v-card>
          <v-card-title>
            <span class="headline">edit lecture</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editData.text" dense outlined label=" text"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editData.chapter"  dense outlined label=" chapter"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editData.lesson" dense outlined label="lesson"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-switch v-model="editData.free" :label="`free: ${editData.free.toString()}`"></v-switch>
                </v-col>

                <v-col cols="12">
                  <v-btn @click="refsImg" icon class="text-capitalize">
                    <v-icon large class="ml-2 blue--text">mdi-camera</v-icon>
                  </v-btn>
                  <input class="d-none" ref="uploadingImg" type="file" @change="uploadImg" multiple />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="editDialog=false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveUpdate">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- start dialog for editing time  -->
      <v-dialog v-model="editTimeDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <h4 class="headline text-capitalize info--text">edit lecture</h4>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row dense class="pb-0">
                <v-col cols="12"   >
                  <v-text-field v-model="lectureId"  outlined dense required label=" lectureId" readonly></v-text-field>
                </v-col>
                <v-col cols="12"  sm="6">
                  <v-text-field
                    v-model="studentId"
                    outlined dense
                    :rules="userIdRules"
                    label=" studentId"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" >
                  <v-text-field
                  outlined dense
                    v-model="newTimer"
                    :rules="timeRules"
                    type="number"
                    label=" newTimer"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="editTimeDialog=false">Cancel</v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="updateTimer"
              :disabled="checkingInput==false"
            >Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import Functions from "../../../server/LecturesApi";
import createLecture from "./upload-lec";
import table from "../includes/table";

export default {
  components: {
    createLecture,
    "app-table": table,
  },
  data() {
    return {
      alert: false,
      te: false,
      editDialog: false,
      editData: null,
      editTimeDialog: false,
      lectureId: null,
      studentId: null,
      newTimer: null,
      dialogCreated: false,
      id: null,
      msg: null,
      index: null,
      userIdRules: [(v) => !!v || "userId is required"],
      timeRules: [(v) => !!v || "time is required"],
    };
  },
  computed: {
    checkingInput() {
      return (
        this.lectureId !== null &&
        this.studentId !== null &&
        this.newTimer !== null &&
        this.lectureId !== "" &&
        this.studentId !== "" &&
        this.newTimer !== ""
      );
    },
    lectures() {
      return this.$store.getters.lectures;
    },
  },
  async mounted() {
    this.$store.dispatch("getAllLectures");
  },
  methods: {
    async testpro() {
      console.log("re");
      let res = await this.$dialog.prompt({
        title: "Password balidation",
        text: "Enter your password",
        rules: [
          (v) => v.length >= 6 || "Password must be at least 6 characters long",
        ], // vuetify's v-text-field rules prop
        textField: {
          // Any addtional props/attrs that will be binded to v-text-field component
          type: "password",
        },
      });
      console.log(res);
    },
    deleteLecture(id) {
      this.$dialog.warning({
        text: "are you  sure ?",
        title: "delete",
        persistent: true,
        actions: {
          true: {
            text: "yes",
            color: "green",
            handle: async () => {
              try {
                await Functions.deleteLecture(id);
                this.$store.dispatch("deleteLecture", id);
                let msg = `deleted succefully`;
                this.dialogNotifySuccess(msg);
              } catch (error) {
                this.dialogNotifyError("there are soemthing wrong ");
              }
            },
          },
          false: {
            text: "cancel",
          },
        },
      });
    },

    editLecture(id) {
      let lectureinx = this.lectures.findIndex((i) => {
        return i._id == id;
      });
      this.index = lectureinx;
      this.editData = this.lectures[lectureinx];
      this.editDialog = true;
    },
    refsImg() {
      this.$refs.uploadingImg.click();
    },
    uploadImg(e) {
      e.target.files.forEach((i) => {
        this.editData.vedio = i;
      });
    },
    async saveUpdate() {
      try {
        const formData = new FormData();
        // for (const i of Object.keys(this.lecture.content.img)) {
        //   formData.append("files", this.editData.vedio);
        // }
        formData.append("vedio", this.editData.vedio);
        formData.append("data", JSON.stringify(this.editData));
        formData.append("userId", JSON.stringify(this.currentUser._id));
        const res = await Functions.editLecture(formData);
        this.$store.dispatch("updateLecture", {
          item: res.data.lecture,
          index: this.index,
        });
        // this.lectures[this.index] = res.data.lecture;
        this.index = null;
        this.editDialog = false;
        let msg = `updated succefully`;
        this.dialogNotifySuccess(msg);

        // console.log(res);
      } catch (error) {
        this.dialogNotifyError("there are soemthing wrong ");

        console.log(error);
      }
    },
    addExtraTime(lecturId) {
      this.editTimeDialog = true;
      this.lectureId = lecturId;
      this.msg = null;
    },
    async updateTimer() {
      let lectureData = {
        lectureId: this.lectureId,
        userId: this.studentId,
        time: this.newTimer,
      };
      try {
        const res = await Functions.addExtraTime(lectureData);
        this.msg = res.data.msg;
        this.editTimeDialog = false;
        this.dialogNotifySuccess(this.msg);
      } catch (error) {
        this.dialogNotifyError("there are soemthing wrong ");

        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div[aria-required="true"].v-input .v-label::after {
  content: " *";
  color: red;
}
</style>