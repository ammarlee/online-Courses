<template>
  <div class="text--center grey lighten-3">
    <div>
      <v-navigation-drawer
        app
        disable-resize-watcher
        style="transition: all 0.5s ease-in-out"
        :style="{ 'background-image': 'url(' + imageUrl + ')' }"
        :class="blackgroundColor"
        touchless
        dark
        v-model="adminDrawer"
      >
        <div id="overlay"></div>
        <v-list class="text-center">
          <v-list-item class="px-2">
            <v-list-item-avatar class="mx-auto">
              <v-img :src="currentUser.img"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">{{currentUser.name}}</v-list-item-title>
              <v-list-item-subtitle>{{currentUser.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        
        <router-link
          :active-class="activelink"
          exact
          v-for="(tab,i) in tabs "
          :key="i"
          :to="'/admin'+tab.pageName"
          tag="div"
          style="cursor: pointer"
        >
          <v-list nav dense  class="text-capitalize rounded-lg font-weight-bold pt-0 pb-0 ">
            <template>
              <v-list-item link>
                <v-list-item-avatar>
                  <v-icon medium>mdi-account-multiple-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-body-1"
                    style="font-family: 'Material Design Icons' !important;"
                  >{{tab.name}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </router-link>
        <v-list nav dense>
          <v-list-item link class="text-capitalize" @click="logOut">
            <v-list-item-icon large>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <!-- toolbar -->
    <v-toolbar color="grey lighten-3" dense flat>
      <v-btn text @click="adminDrawer=!adminDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-icon>mdi-ring</v-icon>
      </v-btn>
      <v-btn text>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- the router view  -->
    <div>
      <v-row>
        <v-col cols="9" offset-sm="2" class="d-none d-sm-block rounded-lg">
          <!-- start the setting for deawer -->
          <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="pink" dark fab  right fixed v-bind="attrs" v-on="on">
                <v-icon >mdi-cog-outline</v-icon>
              </v-btn>
            </template>

            <v-card class="mx-auto pa-3">
              <v-subheader class="text-center text-caption">colors</v-subheader>
              <v-btn
                small
                class="mr-1"
                icon
                dark
                v-for="(item ,n) in colors "
                :key="n"
                :class="item.color"
                :data-set="item.color"
                width="30"
                height="30"
                @click="activelink = item.color"
              ></v-btn>
              <v-divider class="mt-3 mb-1"></v-divider>
              <v-subheader class="text-caption text-capitalize">background color</v-subheader>
              <div>
                <v-btn
                  small
                  class="mr-1"
                  icon
                  width="30"
                  height="30"
                  dark
                  v-for="(item ,n) in newbackground "
                  :key="n"
                  :class="item.color"
                  :data-set="item.color"
                  @click="blackgroundColor =item.color"
                ></v-btn>
                <v-divider class="mt-3 mb-0"></v-divider>
                <v-subheader class="text-caption text-capitalize">background image</v-subheader>
                <v-switch
                class="ma-0"
                  v-model="whithImage"
                  :color="whithImage===true ?'green' :'pink'"
                  :label="`with background image`"
                ></v-switch>
                <v-divider class="mt-3 mb-0"></v-divider>
                <v-subheader class="text-caption text-capitalize">choose image</v-subheader>

              </div>

              <v-list>
                <v-list-item>
                  <v-list-item-avatar
                    style="cursor:pointer"
                    v-for="(img,i) in images"
                    :key="i"
                    @click="imageUrl =img.url"
                  >
                    <img class="pa-1" :src="img.url" @click="imageUrl = img.url" />
                  </v-list-item-avatar>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
          <!-- finsihed the setting for deawer -->


          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
          <!-- </v-sheet> -->
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Functions from "../../../server/api";
export default {

  name: "admin",
  data() {
    return {
      newcolors: null,
      whithImage: true,
      adminDrawer: false,
      blackgroundColor: null,
      activelink:'blue',
      fab: true,
      color: "#e91e63",
      image: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      drawer: null,
      imageUrl:
        "https://res.cloudinary.com/ammarleejot/image/upload/v1618235340/p5ohwebt5ou3yh1pa0yb.jpg",
      images: [
        {
          url:
            "https://res.cloudinary.com/ammarleejot/image/upload/v1618235340/p5ohwebt5ou3yh1pa0yb.jpg",
        },
        {
          url:
            "https://res.cloudinary.com/ammarleejot/image/upload/v1617037878/wjwda6qooompjew545hc.jpg",
        },
        {
          url:
            "https://res.cloudinary.com/ammarleejot/image/upload/v1614786068/kg7yfnfab3wneckscql9.jpg",
        },
        {
          url:
            "https://res.cloudinary.com/ammarleejot/image/upload/v1614722531/gauyhmgg4hbkdoz9mlxt.jpg",
        },
      ],
      colors: [
        { label: "red", color: "red" },
        { label: "cyan", color: "cyan" },
        { label: "pink", color: "pink" },
        { label: "green", color: "green" },
        { label: "orange", color: "orange" },
        { label: "yellow", color: "yellow" },
      ],
      newbackground: [
        { label: "green", color: "green" },
        { label: "orange", color: "orange" },
        { label: "yellow", color: "yellow" },
        { label: "black", color: "black" },
        { label: "blue", color: "blue" },
        { label: "pink", color: "pink" },
      ],
      tabs: [
        { id: this.$route.params.id, pageName: "", name: "dashboard" },
        {
          id: this.$route.params.id,
          pageName: "/lectures",
          name: "lectures",
        },
        {
          id: this.$route.params.id,
          pageName: "/profile",
          name: "profile",
        },
        {
          id: this.$route.params.id,
          pageName: "/questions",
          name: "questions",
        },
        {
          id: this.$route.params.id,
          pageName: "/search",
          name: "search",
        },
        {
          id: this.$route.params.id,
          pageName: "/users",
          name: "users",
        },
        {
          id: this.$route.params.id,
          pageName: "/serialDetails",
          name: "serialDetails",
        },
        {
          id: this.$route.params.id,
          pageName: "/online",
          name: "online",
        },
        {
          id: this.$route.params.id,
          pageName: "/attendce",
          name: "attendce",
        },
      ],
    };
  },

  methods: {
    async logOut() {
      try {
        await Functions.logout();
        document.cookie = "TokenUser" + "=; Max-Age=-99999999;";
        document.cookie = "my test" + "=; Max-Age=-99999999;";
        localStorage.removeItem("userToken");
        this.$store.dispatch("setUser", null);
        this.$store.dispatch("setAuth", false);
        this.$store.commit("setNotifications", null);
        this.$store.commit("setAllNotificationsAfterLogin", null);
        this.$store.commit("setUserMessages", null);
        this.$store.dispatch("setToken", null);
        localStorage.setItem("userToken", null);
        this.$router.push("/login");
      } catch (error) {
        this.errors = error;
      }
    },
    changeColor(color) {
      console.log(color);
    },
  },
  watch: {
    whithImage(newValue) {
      if (newValue === true) {
        this.imageUrl =
          "https://res.cloudinary.com/ammarleejot/image/upload/v1617037878/wjwda6qooompjew545hc.jpg";
      } else {
        this.imageUrl = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#overlay {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
  position: absolute;
}
.active{
  background-color:red
}
.active .ativeone {
  background: #e91e63;
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
</style>