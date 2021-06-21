<template>
  <div>
    <v-row class="pr-5 pb-3 mt-3">
      <v-col class="d-flex justify-content-right" cols="4">
        <v-btn color="success" @click="add">
          add lecture
          <i class="fa fa-plus mr-2"></i>
        </v-btn>
      </v-col>
    </v-row>
    <v-card width="99%" class="mx-auto mr-5">
      <v-data-table
        :headers="headers"
        :items="lectures"
        :items-per-page="15"
         :search="search"
        :loading="loadingStates.table"
        class="elevation-1"
      >
      <template v-slot:top>
        <v-text-field
          v-model="search"

          label="Search "
          class="mx-4"
        ></v-text-field>
      </template>
       <template v-slot:[`item.date`]="{ item }">
         {{item.date |moment("L")}}
       </template>
        <template v-slot:[`item.free`]="{ item }">
          <v-chip
  :color="item.free ? 'success':'pink'"
  link
>
         {{item.free }}
</v-chip>
       </template>
        <template v-slot:[`item.attendce`]="{ item }">
         {{item.StudentAttendance.length }}
       </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-btn color="red" class="ml-2" icon elevation="2" outlined @click="del(item._id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn color="success " class="mx-1" elevation="2" outlined icon @click="edit(item._id)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
                <v-btn
                  elevation="3"
                  icon
                  color="orange"
                  outlined
                  @click="addExtraTime(item._id)"
                  title="extra time"
                >
                  <v-icon class="orange--text">mdi-sort-clock-descending-outline</v-icon>
                </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add Modal -->
    <v-dialog v-model="dialog" width="600" persistent>
      <v-card>
          <v-card-title class="headline">
            <i class="fa fa-pen ml-2"></i> add/edit
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field label="text" dense persistent-hint outlined v-model="lecture.text"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  
                  <v-autocomplete
                        auto-select-first
                        clearable
                        outlined
                        :items="items"
                        label="chapter"
                        item-text="name"
                                          item-value="id"
                        v-model="lecture.chapter"
                        dense
                        solo
                    ></v-autocomplete>
                </v-col>
                <!--  -->
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    dense
                    label="lesson"
                    type="number"
                    persistent-hint
                    outlined
                    v-model="lecture.lesson"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    dense
                    label="duration"
                    persistent-hint
                    outlined
                    type="number"
                    v-model="lecture.duration"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <div class="">
                    <v-btn @click="refsImg" fab icon class="text-capitalize">
                      <v-icon large class="ml-2 blue--text">mdi-movie-open-play</v-icon>
                    </v-btn>
                    <input
                      class="d-none"
                      ref="uploadingImg"
                      type="file"
                      @change="uploadImg"
                      multiple
                    />
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-switch v-model="lecture.free" :label="`free`"></v-switch>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>


            <v-btn color="red darken-1" text @click="cancelEdit()">cancel</v-btn>
            <v-btn color="primary" text @click="editConfirmed()">save</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Add Modal -->
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
</template>

<script>
import Functions from "../../../server/LecturesApi";
export default {
  data() {
    return {
        index:null,
      selected: {},
      search:'',
      entities: [],
      dialog: false,
      loadingStates: {
        table: false,
      },
      headers: [
        {
          text: "chapter",
          align: "center",
          value: "chapter",
          class:"orange--text text-capitalize"
        },
        { text: "lesson", value: "lesson" ,align: "center",class:"orange--text text-capitalize"},
        { text: "date", value: "date" ,align: "center",class:"orange--text text-capitalize"},
        { text: "free", value: "free" ,align: "center",class:"orange--text text-capitalize"},
        { text: "attendce", value: "attendce" ,align: "center",class:"orange--text text-capitalize"},
        { text: "Actions", value: "action", sortable: false ,align: "center",class:"orange--text text-capitalize"},
      ],
      lecture: {
        chapter: 1,
        text: "this is the text",
        price: 100,
        lesson: 1,
        free: false,
        duration: 4,
        content: {
          img: [],
          vedio: null,
        },
      },
      defaultLecture :{
        chapter: 1,
        text: "this is the text",
        price: 100,
        lesson: 1,
        free: false,
        duration: 4,
        content: {
          img: [],
          vedio: null,
        },
      },
      lectureId:null,
      editTimeDialog:false,
      items:[{name:'chapter 1',id:'1'},{name:'chapter 2',id:'2'},{name:'chapter 3',id:'3'},{name:'chapter 4',id:'4'}]


    };
  },
  async mounted() {
    this.loadingStates.table = true;
    this.$store.dispatch("getAllLectures");
    console.log(this.lectures);
    this.loadingStates.table = false;
  },

  methods: {
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
       refsImg() {
      this.$refs.uploadingImg.click();
    },
    uploadImg(e) {
      e.target.files.forEach((i) => {
        this.lecture.vedio = i;
      });
    },
   async editConfirmed() {
        if (this.lecture._id) {
             try {
          
        const formData = new FormData();
        // for (const i of Object.keys(this.lecture.content.img)) {
        //   formData.append("files", this.editData.vedio);
        // }
        formData.append("vedio", this.lecture.vedio);
        formData.append("data", JSON.stringify(this.lecture));
        formData.append("userId", JSON.stringify(this.currentUser._id));
        const res = await Functions.editLecture(formData);
        this.$store.dispatch("updateLecture", {
          item: res.data.lecture,
          index: this.index,
        });
        this.index = null;
        this.dialog = false;
        let msg = `updated succefully`;
        this.dialogNotifySuccess(msg);

      } catch (error) {
        this.dialogNotifyError("there are soemthing wrong ");
        console.log(error);
      }
         
         } else {
               this.lecture.userId = this.currentUser._id
      const formData = new FormData();
      for (const i of Object.keys(this.lecture.content.img)) {
        formData.append("files", this.lecture.content.img[i]);
      }
      formData.append("data", JSON.stringify(this.lecture));
      try {
        const res = await Functions.uploadLecture(formData);
        this.$store.dispatch('addNewLecture',res.data);
      let msg = ` uploaded successuflly`;
        this.dialogNotifySuccess(msg);
      } catch (error) {
        this.dialogNotifyError("someth wrong ");
        console.log(error);
      }

             
         }
    },

    cancelEdit() {
      this.dialog = false;
      this.lecture = {...this.defaultLecture};
    },
    add() {
      this.lecture = {...this.defaultLecture};
      this.dialog = true;
    },
    edit(id) {
    let lectureinx = this.lectures.findIndex((i) => {
        return i._id == id;
      });
      this.index = lectureinx;
      this.lecture = this.lectures[lectureinx];
      this.dialog = true;

      
    },
    del(id) {
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
                this.dialogNotifyError("there are something wrong ");
              }
            },
          },
          false: {
            text: "cancel",
          },
        },
      });
    },
   
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
};
</script>
<style lang="scss" scoped>
</style>