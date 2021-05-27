<template>
  <div class="text-center pt-15 pb-15" id="setImg">
    <div id="overlay"></div>
    <template>
      <div>
        <router-link to="/" tag="span">
          <v-icon style="cursor: pointer;font-size: 68px;" color="white">mdi-facebook</v-icon>
        </router-link>
        <v-card class="mx-auto" style="max-width: 500px;background:transparent ">
          <v-toolbar
            style="background:transparent !important;opacity"
            class="teal lighten-1 mt-4"
            cards
            dark
            flat
          >
            <v-card-title class="title text-h4 text-capitalize white--text font-weight-regular">
              <h5>log in</h5>
            </v-card-title>
          </v-toolbar>
          <v-form ref="form" @submit.prevent="login" v-model="form" class="pa-4 pt-6">
            <v-alert
              v-if="errors"
              dense
              outlined
              type="error"
              class="text-capitalize mx-auto"
              style="max-width: 500px;"
            >{{errors}}</v-alert>
            <v-text-field
              v-model="user.email"
              :rules="[rules.email]"
              filled
              autofocus
              dark
              color="white"
              label="Email address"
              type="email"
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              :rules="[rules.required, rules.length(6)]"
              filled
              dark
              color="white"
              counter="6"
              label="Password"
              style="min-height: 96px"
            ></v-text-field>
            <v-divider class="mt-3"></v-divider>
            <v-card-actions class="mt-2">
              <v-btn
                :disabled="!form"
                :loading="loading"
                outlined
                dark
                class="white--text lighten-1"
                depressed
                type="submit"
                block
              >Submit</v-btn>
              <!-- <v-btn color="red" @click="op ensearch">detect</v-btn> -->
            </v-card-actions>
          </v-form>
          <div class="pt-2 pb-5 text-capitalize">
            <p>
              <router-link to="/signup" class="mr-2 white--text">signup new account ?</router-link>
              <router-link class="white--text" to="/forgetPassword">forget password ?</router-link>
            </p>
          </div>
        </v-card>
      </div>
    </template>
  </div>
</template>
<script>
import Functions from "../../../server/api";

export default {
  name: "login",

  data() {
    return {
      user: {
        email: "ammar@gmail.com",
        password: "123123Aa!",
      },
      show2: false,
      form: false,
      errors: null,
      loading: false,
      loader: null,
      rules: {
        email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
        length: (len) => (v) =>
          (v || "").length >= len ||
          `Invalid character length, required ${len}`,
        password: (v) =>
          !!(v || "").match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
          ) ||
          "Password must contain an upper case letter, a numeric character, and a special character",
        required: (v) => !!v || "This field is required",
      },
    };
  },

  methods: {
  async  opensearch(){
    
      // var isMobile = {
      //       Android: function () {
      //           return navigator.userAgent.match(/Android/i);
      //       },
      //       BlackBerry: function () {
      //           return navigator.userAgent.match(/BlackBerry/i);
      //       },
      //       iOS: function () {
      //           return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      //       },
      //       Opera: function () {
      //           return navigator.userAgent.match(/Opera Mini/i);
      //       },
      //       Windows: function () {
      //           return navigator.userAgent.match(/IEMobile/i);
      //       },
      //       any: function () {
      //           return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      //       }
      //   };

      //   if (isMobile.any()) {
      //     console.log(" mobile");
          

      //   }
      //   else {
      //     console.log("not mobile");
             
      //   }
       var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log( this.responseText);
    }
  };
  xhttp.open("GET", "//api.ipify.org?format=json", true);
  xhttp.send();
      console.log(navigator.userAgent);
         alert(navigator.userAgent);
    },
    async login() {
      try {
        this.loading = true;
        const currentUser = await Functions.login(this.user);
        this.loading = false;
        if (currentUser.status == "200") {
          this.sweetAlert(
            "success",
            `hello ${currentUser.data.user.name}`,
            2000,
            "top"
          );
          // console.log(currentUser.data);
          this.$soketio.emit("firstRoom", currentUser.data.user.name);
          this.$soketio.on("onlineInTheRoom", (data) => {
            console.log(data);
            this.$store.commit("setallOnlineClients", data.onlineClients);
          });
          this.$store.dispatch("setUserData", currentUser);

          // this.$store.dispatch("setUser", currentUser.data.user);
          // this.$socketio.emit('goOnline',currentUser.data.user)
          let onlineData = {
            _id: currentUser.data.user._id,
            name: currentUser.data.user.name,
            age: currentUser.data.user.age,
            img: currentUser.data.user.img,
            page: "/home",
            phone: currentUser.data.user.phone,
            date: new Date(),
          };
          // console.log(onlineData);
          this.$soketio.emit("online", onlineData);
        if (currentUser.data.user.role =='admin') {
          this.$router.push("/admin");
          
        }else{

          this.$router.push("/");
        }
        }
      } catch (error) {
        console.log(error);
        const er = error.response.data.errors;
        // const er = error.response.data.errors;
        this.loading = false;
        this.errors = error.response.data.error;
        this.sweetAlert("error", er, 4000, "top");
      }
    },
  },
};
</script>

<style lang="scss" scoped >
#setImg {
  background-image: url(../../assets/five.jpg);
  background-size: cover;
}
#overlay {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 0;
  position: absolute;
}
.about {
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>