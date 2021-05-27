<template >
  <div class="home "  id="theMainHome">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-app>
      <v-main class="pt-0">
        <v-container>
          <div class="second">
            <div class="text-capitalize text-center black--text">
              <div class="skills py-10">
                <h1 class="skills mb-3">our skills</h1>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <div
                      elevation="12"
                      outlined
                      class="text-center outlined text-capitalze rounded-lg"
                    >
                      <v-icon x-large>mdi-account</v-icon>
                      <h4>heading</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, hic?</p>
                      <v-chip class="ma-2" color="success" outlined>
                        view details
                        <v-icon>mdi-arrow-right</v-icon>
                      </v-chip>
                     
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div
                      elevation="12"
                      outlined
                      class="text-center outlined text-capitalze rounded-lg"
                    >
                      <v-icon x-large>mdi-account</v-icon>
                      <h4>heading</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, hic?</p>
                     <v-chip class="ma-2" color="success" outlined>
                        view details
                        <v-icon>mdi-arrow-right</v-icon>
                      </v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div
                      elevation="12"
                      outlined
                      class="text-center outlined text-capitalze rounded-lg"
                    >
                      <v-icon class="pink--text" x-large>mdi-account</v-icon>
                      <h4>heading</h4>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, hic?</p>
                    <v-chip class="ma-2" color="success" outlined>
                        view details
                        <v-icon>mdi-arrow-right</v-icon>
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
              </div>
              <div class="lectures">
                <app-lectures></app-lectures>
              </div>
                <!-- routes 
                <div class="ma-10">
                  <app-exams></app-exams>
                </div> -->
              
            </div>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
// import exams from "@/components/student/exams";
import lectures from "@/components/student/lectures";
export default {
  name: "Home",
  components: {
    // "app-exams": exams,
    "app-lectures": lectures,
  },
  data() {
    return {
      socket: "",
      overlay: false,
      thePosition: "",
      handleDebouncedScroll:null,
      isUserScrolling:null,
      postion:null,
   
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
    };
  },
  mounted() {
    this.getUserLocation()

    
  },
};
</script>
<style lang="scss" scoped>
#theChatBox {
  position: fixed;
  left: 80px;
  min-height: 220px;
  max-height: 221px;
  width: 320px;
}
</style>
