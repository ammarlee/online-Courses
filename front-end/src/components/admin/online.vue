<template>
    <div class=" text-center text-capitalize pink--text">
    <v-card  v-if="onlineUsers">
      <h2 class="headline  pt-10 text-capitalize info--text text-center " style="font-family: 'Material Design Icons' !important;">
      all  student 
      </h2>
      
      <v-card-title class="  text-capitalize text-center info--text">
        search for user

        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table 
      v-if="onlineUsers"
      :headers="headers" 
      :items="onlineUsers" 
      :search="search"
    item-key="name"
      >
      <template v-slot:[`item.img`]="{ item }">
        <v-avatar>
            <v-img :src="item.img"></v-img>
        </v-avatar>
    </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-icon :class="item" color="success">mdi-checkbox-marked-circle-outline</v-icon>
    </template>
    <template v-slot:[`item.date`]="{ item }">
        {{item.date|moment('LTS')}}
    </template>
      </v-data-table>
      <v-alert type="error" class="text-capitalize" outlined v-else>you have not any users yet</v-alert>
    </v-card>
    <v-divider></v-divider>
  </div>
</template>

<script>
    export default {
        data() {
            return {
      search: "",
headers: [
        {
          text: "name ",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "img ", value: "img" },
        { text: "phone ", value: "phone" },
        { text: "date ", value: "date" },
        { text: "page ", value: "page" },
        { text: "status ", value: "status" },
      ],
            }
        },
       
        
    }
</script>

<style lang="scss" scoped>

</style>