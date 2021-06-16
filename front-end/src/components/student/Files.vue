<template>
  <div class="mt-10">
    <v-row class="justify-center">
      <v-col cols="8">
        <v-card>
          <v-card-title class="data-container"> 
           all your exams
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="entities" :search="search">
            <template v-slot:[`item.result`]="{ item }">
              <v-chip color="success" dark>{{ item.result }}</v-chip>
            </template>

            <template v-slot:[`item.date`]="{ item }">{{item.date|moment("LLL")}}</template>
            <template v-slot:[`item.print`]="{ item }">
              <v-icon color="pink" @click="printExam(item)">mdi-printer</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

   
  </div>
</template>

<script>
export default {
  data() {
    return {
      entities: [],
      search: "",
      headers: [
        { text: "ID", align: "center", value: "_id" },
        { text: "Chapter", align: "center", value: "exameModel[0].chapter" },
        { text: "Results", align: "center", value: "result" },
        { text: "Date", align: "center", value: "date" },
        { text: "Print", align: "center", value: "print" },
      ],
      
    };
  },
  async mounted() {
    this.entities = this.currentUser.exams;
  },
  methods: {
    async printExam(item) {
      this.$router.push('/printExam/'+item._id)
    }
}
}
</script>

<style lang="scss" scoped>
.data-container {
  font-weight: bold;
  text-transform: capitalize;
}
</style>