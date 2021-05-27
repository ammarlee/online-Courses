<template>
  <div>
    <app-table
      title="create new question"
      :questions="questions"
      :editQuestion="editQuestion"
      :deleteQuestion="deleteQuestion"
      :questionList="['chapter','lesson','time','question','actions',]"
    >
      <div slot="createQuestion">
        <v-btn @click="dialogCreated =!dialogCreated" fab class="green">
          <v-icon class="white--text">mdi-plus</v-icon>
        </v-btn>
      </div>
      <div slot="questionError" v-if="!questions">
        <v-alert type="error" class="text-capitalize" outlined>you have not any question yet</v-alert>
      </div>
    </app-table>
    <v-dialog v-model="dialogCreated">
      <v-card>
        <h2
          class="headline py-5 text-capitalize text-center info--text"
          style="font-family: 'Material Design Icons' !important;"
        >{{editMode ? 'edit  question': 'create new question'}}</h2>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="question.chapter" outlined label=" chapter"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="question.lesson" outlined label=" lesson"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="question.fullMarks"
                  outlined
                  type="number"
                  label=" fullMarks"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="question.duration" outlined type="number" label=" duration"></v-text-field>
              </v-col>
              <!-- questions -->
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="question.question"
                  append-icon="mdi-camera"
                  @click:append="refsImg"
                  outlined
                  label=" question"
                ></v-text-field>

                <input
                  class="d-none"
                  ref="question"
                  type="file"
                  @change="uploadQuestionImg"
                  multiple
                />
              </v-col>
              <div v-if="editMode"  max-height="60" max-width="100">
                <v-img v-if="question.image" :src='question.image'></v-img>
              </div>
              <!-- answer a -->
              <v-col cols="12" id="btn-a" class="d-flex justify-space-between">
                <v-textarea
                  v-model="question.answers.a.a"
                  append-icon="mdi-camera"
                  @click:append="refsImg"
                  outlined
                  label="answers.a"
                ></v-textarea>
                <div>
                  <v-switch v-model="question.answers.a.correct"></v-switch>
                </div>
                <div class="my-3">
                  <input
                    class="d-none answer-a"
                    id="answer-a"
                    ref="answera"
                    type="file"
                    @change="uploadImg"
                    multiple
                  />
                </div>
              <div v-if="editMode">
                <v-img v-if="question.answers.a.img" height="60" width="100" :src='question.answers.a.img'></v-img>

              </div>
              </v-col>
              <!-- answer b-->
              <v-col cols="12" id="btn-b" class="d-flex justify-space-between">
                <v-textarea
                  append-icon="mdi-camera"
                  @click:append="refsImg"
                  v-model="question.answers.b.a"
                  outlined
                  label="answers.b"
                ></v-textarea>
                <div>
                  <v-switch v-model="question.answers.b.correct"></v-switch>
                </div>
                <div class="my-3">
                  <input
                    id="answer-b"
                    class="d-none"
                    ref="answerb"
                    type="file"
                    @change="uploadImg"
                    multiple
                  />
                 </div>
                <div v-if="editMode">
                <v-img  height="60" width="100" v-if="question.answers.b.img" :src='question.answers.b.img'></v-img>
              </div> 
              </v-col>
              <!-- answer c-->
              <v-col cols="12" id="btn-c" class="d-flex justify-space-between">
                <v-textarea
                  append-icon="mdi-camera"
                  @click:append="refsImg"
                  v-model="question.answers.c.a"
                  outlined
                  label="answers.c"
                ></v-textarea>
                <div>
                  <v-switch v-model="question.answers.c.correct"></v-switch>
                </div>
                <div class="my-3">
                  <input
                    id="answer-c"
                    class="d-none"
                    ref="answerc"
                    type="file"
                    @change="uploadImg"
                    multiple
                  />
                </div>
                <div v-if="editMode">
                <v-img  height="60" width="100" v-if="question.answers.c.img" :src='question.answers.c.img'></v-img>
              </div>
              </v-col>
              <!-- answer d-->
              <v-col cols="12" id="btn-d" class="d-flex justify-space-between">
                <v-textarea
                  append-icon="mdi-camera"
                  @click:append="refsImg"
                  v-model="question.answers.d.a"
                  outlined
                  label="answers.d"
                ></v-textarea>
                <div>
                  <v-switch v-model="question.answers.d.correct"></v-switch>
                </div>
                <div class="my-3">
                  <input
                    id="answer-d"
                    class="d-none"
                    ref="answerd"
                    type="file"
                    @change="uploadImg"
                    multiple
                  />
                </div>
                <div  v-if="editMode">
                <v-img  height="60" width="100" v-if="question.answers.d.img" :src='question.answers.d.img'></v-img>
              </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn color="red darken-1" text @click="dialogCreated=false">Cancel</v-btn>
          <v-btn color="green darken-1" text :disabled="disabled" @click="createQuestion" v-if="!editMode">Save</v-btn>
           <v-btn color="green darken-1" text @click="submitEditQuestion" v-else >edit</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Functions from "../../../server/api";
import table from "../includes/table";
export default {
  components: {
    "app-table": table,
  },
  data() {
    return {
      editMode:false,
      disabled:false,
      testing: false,
      questions: null,
      editId :null,
      dialogCreated: false,
      question: {
        lesson: null,
        question: null,
        duration: null,
        image: null,
        chapter: null,
        fullMarks: null,
        answers: {
          a: { a: null, correct: true, img: null },
          b: { a: null, correct: false, img: null },
          c: { a: null, correct: false, img: null },
          d: { a: null, correct: false, img: null },
        },
      },
    };
  },
  methods: {
    async deleteQuestion(id) {
      let conf = confirm("are you sure tha you want to delete it ");
      if (conf) {
        try {
          await Functions.deleteQuestion({ questionId: id });
          this.questions = this.questions.filter((i) => {
            return i._id.toString() !== id.toString();
          });
          let msg = "you have delete the question ";
          let m = msg.toUpperCase();
          this.sweetAlert("success", m, 3000, "bottom-right");
        } catch (error) {
          console.log(error);
        }
      }
    },
    editQuestion(item) {
      this.editMode = true
      this.editId = item._id
      console.log(item);
      console.log(item.answers.forEach(i=>{console.log(i.img);}));
      // console.log(this.question.answers222);
      console.log(item.answers[0].a);
      this.question = {
         lesson: item.lesson,
         _id:item._id,
        question: item.question,
        duration: item.duration,
        image: item.image,
        chapter: item.chapter,
        fullMarks: item.fullMarks,
        answers: {
          a: { a: item.answers[0].a, correct:  item.answers[0].correct, img: item.answers[0].img, },
          b: { a: item.answers[1].a, correct: item.answers[1].correct, img: item.answers[1].img, },
          c: { a: item.answers[2].a, correct: item.answers[2].correct, img: item.answers[2].img, },
          d: { a: item.answers[3].a, correct: item.answers[3].correct, img: item.answers[3].img, },
        },
        
      }
      
      this.dialogCreated=true

    },
    async submitEditQuestion(){
      try {
        let s =this.formData()
        const res = await Functions.updateQuestion(s)
        console.log(res);
      } catch (error) {
        console.log(error);
      }

    },
    refsImg(e) {
      // console.log(e.target.id);
      console.log(e.path[6].id);
      let target = e.path[6].id

      if (target === "btn-a") {
        this.$refs.answera.click();
      } else if (target === "btn-b") {
        this.$refs.answerb.click();
      } else if (target === "btn-c") {
        this.$refs.answerc.click();
      } else if (target === "btn-d") {
        this.$refs.answerd.click();
      } else {
        this.$refs.question.click();
      }
    },
    uploadImg(e) {
      let character = e.target.id.charAt(e.target.id.length - 1);
      this.question.answers[character].img = e.target.files[0];
      console.log(this.question.answers[character].img);
    },
    uploadQuestionImg(e) {
      this.question.image = e.target.files[0];
    },
    formData(){
      const formData = new FormData();
        // for (const i of Object.keys(this.lecture.content.img)) {
        //   formData.append("files", this.editData.vedio);
        
        // }

        formData.append("question", this.question.image);
        formData.append("answera", this.question.answers.a.img);
        formData.append("answerb", this.question.answers.b.img);
        formData.append("answerc", this.question.answers.c.img);
        formData.append("answerd", this.question.answers.d.img);
        formData.append("data", JSON.stringify(this.question));
        return formData
    },
    async createQuestion() {
      console.log(this.question);
      this.disabled = true
      try {
        let s =this.formData()
        
        const res = await Functions.createQuestion(s);
        console.log(res);
      this.disabled = false

      } catch (error) {
      this.disabled = false

        console.log(error);
      }
    },
  },
  async mounted() {
    try {
      let res = await Functions.getallQuestions();
      console.log(res.data.questions);
      this.questions = res.data.questions;
    } catch (error) {
      
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>