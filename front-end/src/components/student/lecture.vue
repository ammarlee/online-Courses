<template>
  <div class="text-center text-capitalize ma-10">
   
    <v-alert type="error" v-if="lectureAlert">
      your time is over
    </v-alert>
    <div v-if="remainingTime">
      <h1>{{singleLecture.text}}</h1>
      <h3>{{singleLecture.chapter}}</h3>
    <div class="text-center ma-2">
      <span class="pink pa-3 font-weight-bold text-h5 d-inline-block rounded-lg">{{timer}}</span>
      </div>
       <video width="520" height="340" controls>
          <source :src="singleLecture.vedio" type="video/mp4"/>
        </video>

    </div>
  </div>
</template>

<script>
import Functions from "../../../server/api"
export default {
  name: "single-lecture",
  data() {
    return {
      timer: null,
      remainingTime:null,
      lectureAlert:false,
      singleLecture:null,
    };
  },
  async mounted() {
    this.getUserLocation()
    try {

      let data = { 
           userId: this.currentUser._id,
          lectureId: this.$route.params.id,
        }
      const res = await Functions.getRemainingTime(data)
      this.remainingTime = res.data.remaind
      this.singleLecture = res.data.lecture
      
    } catch (error) {
      this.lectureAlert = true
      setTimeout(() => {
        this.$router.push('/lectures')
        
      }, 3000);
      console.log(error);
    }
      setTimeout(() => {
        this.timer = null
         this.remainingTime=null
        this.$store.dispatch('remainingTime',null)
        this.$store.dispatch('singleLecture',null)
        this.lectureAlert = true
        setTimeout( () => {
          this.$router.push('/')

        },3000)

        clearInterval(counter);
      }, new Date(this.remainingTime).getTime() - new Date().getTime()); // 1min

    let counter = setInterval(() => {
      const time = Math.ceil(
        new Date(this.remainingTime).getTime() -
          new Date().getTime()
      );
       this.msToTime(time)

    }, 1000);
    counter;
  },
 
  methods: {
    msToTime(duration) {
      // var milliseconds = parseInt((duration % 1000) / 100),
       var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.timer = hours + ":" + minutes + ":" + seconds ;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>