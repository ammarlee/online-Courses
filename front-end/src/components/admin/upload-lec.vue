<template>
  <div class="text-center text-capitalize">
    <h2
      class="headline pa-5 text-capitalize text-center success--text"
      style="font-family: 'Material Design Icons' !important;"
    >upload new lecture</h2>

    <v-row>
      <v-col cols="12">
        <div>
          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-text-field label="text" persistent-hint outlined v-model="lecture.text"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                label="chapter"
                persistent-hint
                type="number"
                outlined
                v-model="lecture.chapter"
              ></v-text-field>
            </v-col>
            <!--  -->
            <v-col cols="12" sm="4" md="4">
              <v-text-field
                label="lesson"
                type="number"
                persistent-hint
                outlined
                v-model="lecture.lesson"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="duration"
                persistent-hint
                outlined
                type="number"
                v-model="lecture.duration"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <div class="my-3">
                <v-btn @click="refsImg" fab class="text-capitalize">
                  <v-icon large class="ml-2 blue--text">mdi-movie-open-play</v-icon>
                </v-btn>
                <input class="d-none" ref="uploadingImg" type="file" @change="uploadImg" multiple />
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-switch v-model="lecture.free" :label="`free: ${lecture.free.toString()}`"></v-switch>
            </v-col>
          
          </v-row>

            <slot name="cancelbtn"></slot>
          <v-btn text class="white text-capitalize pink--text d-inline-block" @click="uploadLecture">upload lecture</v-btn>
          <!-- <div class='d-inline'> -->
          <!-- </div> -->
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Functions from "../../../server/api";
export default {
  name: "upload-lecture",
  data() {
    return {
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
    };
  },
  mounted() {
    console.log("admin page ");
  },
  methods: {
    refs() {
      this.$refs.uploadingVedio.click();
    },
    uploadVedio(e) {
      this.lecture.content.vedio = e.target.files[0];
    },
    refsImg() {
      this.$refs.uploadingImg.click();
    },
    uploadImg(e) {
      e.target.files.forEach((i) => {
        this.lecture.content.img.push(i);
      });
    },
    async uploadLecture() {
      const formData = new FormData();
      for (const i of Object.keys(this.lecture.content.img)) {
        formData.append("files", this.lecture.content.img[i]);
      }
      formData.append("data", JSON.stringify(this.lecture));
      try {
        const res = await Functions.uploadLecture(formData);
        this.$store.dispatch('addNewLecture',res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>