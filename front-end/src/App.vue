<template>
  <v-app style="overflow: hidden;" v-scroll="handleScroll">
    <!-- <app-left-drawer></app-left-drawer> -->
    <router-view name="header"></router-view>
    <v-container id="inspire" fluid class="pa-0 py-0">
    <router-view name="carsoul"></router-view>
    </v-container>
    <app-chat></app-chat>
    <v-main class="mb-15  " >
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <router-view name="footer" class="mt-10"></router-view>
  </v-app>
</template>
<script>
import chat from './components/includes/chat'
export default {
  components: {
    'app-chat':chat
  },
  data() {
    return {
      thePosition: "",
      handleDebouncedScroll: null,
      isUserScrolling: null,
    
    };
  },
  methods: {
    handleScroll() {
      this.postion = window.scrollY;
      this.$store.commit('scrollPosition',this.postion);
    },
  },
   created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
<style scoped lang="scss">
#thenavbar {
  background: #0f1111;
  padding: 10px 10px 2px 3px;
  .col {
    background: #0f1111;
  }
}
.beforename {
  flex-grow: 0.5 !important;
}
.slide-enter {
  opacity: 0;
}
.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
  transition: opacity 0.5s;
}
.slide-leave {
}
.slide-leave-active {
  animation: slide-out 0.5s ease-in reverse;
  transition: opacity 0.5s;
  opacity: 0;
}
@keyframes slide-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes slide-out {
  to {
    transform: translateY(0);
  }
  from {
    transform: translateY(20px);
  }
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  #thenavbar {
    padding: 20px;
  }
  #shop {
    display: none;
  }
  .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    height: 37px;
    width: 60px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
}
</style>
