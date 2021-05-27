<template>
  <div>
    <v-container>
        <h2 class="text-center text-capitalize font-weight-bold pink--text">search for exams by date</h2>
      <v-row>
        <v-col cols="12" lg="6" class='grey lighten-3'>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="picker"
                label="Date"
                hint="YYYY/MM/DD "
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="picker" no-title @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" lg="6"  class='grey lighten-3'>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="picker2"
                label="Date"
                hint="YYYY/MM/DD "
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="picker2" no-title @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
    <div>
      <v-btn
        style="display: block; margin: 10px auto;"
        class="pink white--text text-capitalize"
        @click="searching"
      >search
      </v-btn>
      <v-alert type="error" class="text-capitalize" outlined v-if="alert">{{errors}}</v-alert>
    </div>

    <div class="table mt-8" v-if="items ">
      <v-card max-width="1000">
      <v-simple-table fixed-header >
        <template v-slot:default>
          <thead>
            <tr>
              <th
               class="text-center text-capitalize text-body-1 orange--text"
               v-for="(item,i) in ['ID','chapter','date','time','result']"
                :key="i"
              >{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item._id" class="text-center">
              <td>{{ item._id }}</td>
              <td>{{ item.exameModel[0].chapter }}</td>
              <td>{{ item.date | moment("L")}}</td>
              <td>{{ item.date | moment("LT") }}</td>
              <td>{{ item.result }}</td>
              <!-- <td>
                <v-btn icon title="delete Lecture">
                  <v-icon class="pink--text">mdi-delete</v-icon>
                </v-btn>
                 <v-btn icon title="delete Lecture">
                  <v-icon class="pink--text">mdi-delete</v-icon>
                </v-btn>
              </td> -->
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import Functions from "../../../server/api";
export default {
  name: "searching",
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      picker2: new Date().toISOString().substr(0, 10),
      items: null,
      menu1: false,
      menu2: false,
    };
  },
  methods: {
    async searching() {
      try {
        console.log(this.picker);
        let startDate = this.picker;
        let endDate = this.picker2;
        console.log(endDate);
        let userId = "606addb663cfb021ac7375c2";
        const res = await Functions.searching({ startDate, endDate, userId });

        console.log(res.data.user2[0].items);
        this.items = res.data.user2[0].items;
      } catch (error) {
        this.errors = 'you have an error'
        this.alert = true
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>