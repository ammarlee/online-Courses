<template>
  <div>
     <v-row class="justify-center">
      <v-col cols="10">
        <v-card v-if="exam">
          <v-card-title>
            <v-row>
               <v-col cols="12" sm="4" class='text-center data-container'>
                date
                <br />
                <v-chip color="success" dark>{{exam.date | moment("LLL")}}</v-chip>
              </v-col>


              <v-col cols="12" sm="4" class='text-center data-container'>
                chapter
                <br />
                <v-chip color="success" dark>{{exam.exameModel[0].chapter}}</v-chip>
              </v-col>
              <v-col cols="12" sm="4" class='text-center data-container'>
                result
                <br />
                <v-chip color="success" dark>{{exam.result}}</v-chip>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-row dense>
            <v-col class cols="12" v-for="(item,n)  in exam.exameModel[0].questions" :key="n">
              <div class>
                <div class="rounded-lg pa-6">
                  <h2 class="data-container">{{n+1}}-{{item.QuestionId.question}} ?</h2>
                </div>
                <div v-for="(answer,s)  in item.QuestionId.answers" :key="s">
                  <p
                    class="ml-6 data-container"
                    :class="item.QuestionId.rightAnswer ==answer._id ? 'success--text':'warning--text'"
                  >
                    <v-icon
                      :class="item.QuestionId.rightAnswer ==answer._id ? 'success--text':'warning--text'"
                    >mdi-fire</v-icon>
                    {{answer.a}}
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    
  </div>
</template>

<script>
import Functions from "../../../server/ExamsApi";

export default {
 
  data() {
    return {
      exam: null,
    };
  },
  async mounted () {
    try {

      let data = {
        exameId: this.examId,
        userId: this.currentUser._id,
      };
      const res = await Functions.examPdf(data);
      this.exam = res.data.exam[0];
    } catch (error) {
      console.log(error);
      
    }
   
    
  },
  computed: {
    examId() {
      return this.$route.params.id
    }
  },
};
</script>

<style lang="scss" scoped>
.data-container {
 font-weight: bold;
 text-transform: capitalize;
}
</style>