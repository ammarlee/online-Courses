<template>
  <div >
    <v-container class="pa-15 rounded-lg">
      <h1
        class="text-uppercase text-center mb-3 font-weight-bold"
        style="font-family: 'Material Design Icons' !important;"
      >admin dashboard</h1>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="(item,i) in dashboard"
          :key="i"
          class="rounded-lg ma-5 text-center"

        >
          <v-btn
            :color="item.color"
            
            
            :to="'/admin'+item.path"
            width="230"
            height="120"
            dark
            small
            elevation="3"
            class="rounded-lg "
            left
          >
            <div>
              <v-icon block x-large>{{item.icon}}</v-icon>
            </div>
            <div class="pt-1 ml-3" >
              <span style="font-family: 'Material Design Icons' !important;" class="white--text lighten-3 font-weight-bold text-capitalize text-overline">{{item.title}}</span>
              <br />
              <small class="white--text lighten-2 text-capitalize text-body-1">{{item.data}}</small>
              <v-divider></v-divider>
              <p class="caption">
                <v-icon small class="">mdi-timer</v-icon>
                {{time |moment}}
              </p>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import Functions from "../../../server/api";
export default {
  name: "dashboard",
  data() {
    return {
      time: null,
      dashboard: null,
    };
  },
  async mounted() {
    try {
      const res = await Functions.dashboardData();
      console.log(res);

      let dashData = [
        {
          data: res.data.lectures,
          icon: "mdi-home ",
          color: "info--tex",
          title: "lectures",
          path:'/lectures'
        },
        {
          data: res.data.activeStudents,
          icon: "mdi-account-check-outline ",
          title: "active Students",
          color: "success",
          path:'/users'
        },

        {
          data: res.data.unactiveeStudents,
          title: "unActive Students",
          icon: "mdi-account-alert-outline",
          color: "yellow darken-2",
          path:'/users'

        },
        {
          data: res.data.activeSerials,
          icon: "mdi-lock-check-outline",
          color: "green",
          title: "active Serials",
          path:'/serialDetails'

        },
        {
          data: res.data.unActiveSerials,
          title: "unActive Serials",
          icon: "mdi-lock-open-alert-outline",
          color: "red",
          path:'/serialDetails'

        },
        {
          data: res.data.activeSerials * 50,
          icon: "mdi-cash-multiple",
          title: "revenue",
          color: "cyan",
          path:'/serialDetails'

        },
      ];
      this.time = new Date();
      this.dashboard = dashData;
    } catch (error) {
      console.log(error);
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format("LT");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>