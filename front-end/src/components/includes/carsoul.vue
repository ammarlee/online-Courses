<template>
  <v-carousel cycle height="600" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(slide, i) in imgs" :key="i">
      <v-sheet height="100%">
        <v-row class="fill-height fill-width" align="center" justify="center">
          <v-img :src="slide.link" alt="welcome"></v-img>
          <v-fade-transition>
            <v-overlay absolute color="rgb(33 33 33)">
              <div>
                <h1 class="text-capitalize font-weight-bold text-center">{{slide.title}}</h1>
                <p
                  class="text-body-2"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Et numquam tempore reiciendis, sit accusantium quisquam.</p>
                <div class="text-center">
                <v-btn outlined class=" mr-2 font-weight-bold white--text mx-auto" to="/vedio">
                  <v-icon left>mdi-youtube</v-icon>
                  watch
                </v-btn>
                <v-btn outlined class=" font-weight-bold white--text " to="/login">
                  start
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
                </div>
              </div>
            </v-overlay>
          </v-fade-transition>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return{
        imgs: [
        {
          title: "your bright future is our mission ",
          link:require('@/assets/one.jpg'),
        },
        {
          title: "the new way to learn properly with us  ",
          link:require('@/assets/two.jpg'),
        },
        {
          title: "online learning platform ",
          link:require('@/assets/six.jpg'),
        },
      ],
    }
  }
};
</script>

<style lang="scss" scoped>
</style>