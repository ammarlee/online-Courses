<template>
  <div>
    <div v-for="(question ,i) in exam.questions " :key="i">
      <!-- START QUESTION -->
      <div class="white--text font-weight-bold pa-6 cyan rounded-lg">
      <h2

        :id="`qu${question.QuestionId._id}`"
      >
        <span class="rounded-circle pink mr-2 px-1 white--text">{{i}}</span>
        {{question.QuestionId.question}} ?
      </h2>
      <div  v-if="question.QuestionId.image" class="px-3 py-1 ">

      <v-img max-height="150" class="rounded-lg"
   :src="[question.QuestionId.image][0]" @click="index2 = 0"></v-img>
      </div>
      </div>

      <CoolLightBox
        :items="[question.QuestionId.image]"
        :fullScreen="true"
        :effect="'fade'"
        :index="index2"
        @close="index2 = null"
      ></CoolLightBox>
      <!-- END QUESTION -->

      <!-- START THE ANSWER CHOISSE -->
      <div class="pl-2">
        <v-radio-group
          hint="choose the one "
          style="background:#070c42"
          class="d-block rounded-lg mb-3 font-weight-bold"
          :id="question.QuestionId._id"
          v-model="question.QuestionId.groupAnswer"
        >
          <v-radio
            v-for="(answer ,n) in question.QuestionId.answers "
            :key="n"
            class="rounded-lg pa-2"
            style="width:100% ; overflow:hidden"
            light
            :readonly="readonly"
            on-icon="mdi-fire"
            color="pink accent-3"
            active-class="yellow darken-2"
            block
            :label="answer.a"
            :value="answer._id"
            :name="answer._id"
          >
            <template v-slot:label>
              <div style="max-width:100px; max-height:100px">
                <strong class="green--text">{{answer.a}}</strong>
                <div v-if="answer.img">
                  <v-img :src="answer.img" class="rounded-lg mb-2" @click="overlay =true" style="width:100%" height="80" ></v-img>
                  <!-- <CoolLightBox
                    :items="[answer.img]"
                    :fullScreen="true"
                    :effect="'fade'"
                    :index="index"
                    @close="index = null"
                  ></CoolLightBox>-->
                </div>
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </div>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  props: ["exam", "readonly"],
  data() {
    return {
      index: null,
      index2: null,
      overlay:false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>