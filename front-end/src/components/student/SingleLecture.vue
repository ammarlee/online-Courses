<template>
    <div>
         <v-card
    class="mx-auto mt-15"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="text-capitalize">lecture for chapter 
          <span class="red--text mr-1 ml-1"> {{lecture.chapter}}</span> 
          lesson 
      <span class="red--text mr-1 ml-1">{{lecture.chapter}}</span></v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
     {{lecture.data  | moment('LLL')}}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div> {{lecture.text}}</div>

    </v-card-text>
    <v-card-actions>
      <v-btn
        color="orange"
        @click="navegateTolecture(lecture._id)"
        text
      >
        watch now 
      </v-btn>
    </v-card-actions>
  </v-card>

    </div>
</template>

<script>
import Functions from "../../../server/LecturesApi"
    export default {
        data() {
            return {
                id: null,
                lecture:null,
            }
        },
       async mounted () {
           try {
            const res = await Functions.getLectureDetails({id:this.lectureId})
               console.log(res)
               this.lecture = res.data.lecture
               
           } catch (error) {
               console.log(error);
               
           }
            ;
        },
     computed: {
         lectureId() {
             return this.$route.params.id 
         }
     },
     methods: {
           navegateTolecture(lectureId){
        this.$router.push('/lecture/'+lectureId)
    },
     },
    }
</script>

<style lang="scss" scoped>

</style>