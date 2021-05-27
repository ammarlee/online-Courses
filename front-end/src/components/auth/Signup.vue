<template>
  <div class="text-center pt-15 pb-16 info--text" id="setImg">
    <div id="overlay"></div>
    <router-link to="/login" tag="span">
      <v-icon style="cursor: pointer;font-size: 68px;" color="white">mdi-facebook</v-icon>
    </router-link>

    <v-card class="mx-auto mt-0" max-width="500"  style="background:transparent ">
      <v-card-title class="title white--text font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
      </v-card-title>
      <v-form ref="form" v-model="form" class="pa-4 pt-6">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field   dark filled label="Name" v-model="user.name" color="deep-purple" type="text"></v-text-field>
              <v-text-field filled
              dark
                label="Email"
                :rules="[rules.email]"
                type="email"
                color="deep-purple"
                v-model="user.email"
              ></v-text-field>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field filled
                  dark
                    v-model="user.birthDay"
                    label="Birthday day"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="user.birthDay"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="saveDate"
                ></v-date-picker>
              </v-menu>

              <span class="caption text-capitalize white--text text--darken-1">
                have an account?
                <router-link tag="a" to="/login">login</router-link>
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field filled  dark label="phone" type="number" color="deep-purple" v-model="user.phone"></v-text-field>
              <v-textarea filled
                v-model="user.fatherNumber"
                auto-grow
                dark
                color="deep-purple"
                label="Father Number"
                rows="1"
              ></v-textarea>
              <v-textarea filled
                v-model="user.address"
                auto-grow
                dark
                color="deep-purple"
                label="Address"
                rows="1"
              ></v-textarea>
              <span class="caption green--text text--darken-1">Please enter your information</span>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text>
              <v-text-field filled dark label="City" color="deep-purple" v-model="user.city"></v-text-field>
              <v-radio-group v-model="user.gender" row>
                <v-radio label="male" dark value="male"></v-radio>
                <v-radio label="female" dark value="female"></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="4">
            <v-card-text>
              <v-text-field filled
               dark
                label="Password"
                type="password"
                
                :rules="[rules.password, rules.length(8)]"
                v-model="user.password"
              ></v-text-field>

              <span
                class="caption red--text text--darken-1"
              >Please enter a password for your account</span>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1" text @click="step--" class="red white--text">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === 4" color="primary" depressed v-if="step <4" @click="step++">Next</v-btn>
        <v-btn
          v-else
          :disabled="!form"
          :loading="isLoading"
          type="submit"
          @click="addNewUser"
          depressed
          class="green"
        >signup</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import Functions from "../../../server/api";
export default {
  data() {
    return {
      step: 1,
      id: null,
      pass: null,
      date: null,
      menu: false,
      user: {
        name: "ammar",
        email: "ammar@gmail.com",
        password: "123123Aa!",
        phone: "001023695405",
        fatherNumber: "001025452455",
        address: "24 st giza cairo",
        gender: "male",
        city: "cairo",
        birthDay: "2019-05-10",
        img: null,
      },
      loading: false,
      items: [],
      errors: null,
      search: null,
      form: false,
      isLoading: false,
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
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Please your information";
        case 3:
          return "Please your information";
        default:
          return "Create a password ";
      }
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    saveDate(date) {
      this.$refs.menu.save(date);
    },
    async addNewUser() {
      try {
        this.isLoading = true;
        let res = await Functions.signup({ ...this.user });
        this.isLoading = false;
        if (res.status == "200") {
          this.sweetAlert(
            "success",
            `hello ${res.data.user.name}`,
            2000,
            "top"
          );
          this.$store.dispatch("setUserData", res);
          this.$router.push("/");
        }
      } catch (error) {
        this.sweetAlert(
          "error",
          "your email and name should be unique",
          "4000",
          "center"
        );
        this.errors = error.response.data.msg;
        this.isLoading = false;
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss"  scoped>
#setImg{
  background-image: url(../../assets/one.jpg);
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
</style>