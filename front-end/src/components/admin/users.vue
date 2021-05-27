<template>
  <div class=" text-center text-capitalize pink--text">
    <v-card  v-if="students">
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
      v-if="students"
      :headers="headers" 
      :items="students" 
      :search="search"
      :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
      >
 <template v-slot:[`item.active`]="{ item }">
      <v-chip
        :color="getColor(item.active)"
        dark
      >
        {{ item.active }}
      </v-chip>
    </template>
      <template v-slot:[`item.actions`]="{ item }">
        
      <v-icon
        meduiem
        
        class="mr-2 success--text"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        meduiem
        @click="deleteItem(item)"
        class="red--text"
      >
        mdi-delete
      </v-icon>
    </template>
     <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length" class="pa-3">

           <v-row class='mx-auto'>
             <v-col cols="12">
 <v-img :src="item.img" width="100" height="100" class='rounded-circle mx-auto'></v-img>
 <h2>{{item.name}}</h2>
             </v-col>

             <v-col cols="4" class="ma-1 purple darken-4 white--text rounded-lg ">
               <span class="yellow--text mr-5">id:</span>
               <span>{{item._id }}</span>


             </v-col>
             <v-col cols="4" class="ma-1 purple darken-4 white--text rounded-lg ">
               <span class="yellow--text mr-5">role</span>
               <span>{{item.role =='1' ?'admin':"student" }}</span>


             </v-col>
               <v-col cols="3" class="ma-1 purple darken-4 white--text rounded-lg ">
               <span class="yellow--text mr-5">email:</span>
               <span>{{item.email }}</span>


             </v-col>
             <v-col cols="4" class="ma-1 purple darken-4 white--text rounded-lg ">
               <span class="yellow--text mr-5">phone:</span>
               <span>{{item.phone }}</span>
             </v-col>
               <v-col cols="4" class="ma-1 purple darken-4 white--text rounded-lg ">
               <span class="yellow--text mr-5">fatherNumber:</span>
               <span>{{item.fatherNumber }}</span>
             </v-col>
               <v-col cols="3" class="ma-1 purple darken-4 white--text rounded-lg ">
               <span class="yellow--text mr-5">city:</span>
               <span>{{item.city }}</span>


             </v-col>
               
               <v-col cols="4" class="ma-1 purple darken-4 white--text rounded-lg ">
               <span class="yellow--text mr-5">address:</span>
               <span>{{item.addres }}</span>


             </v-col>
             <v-col cols="4" class="ma-1 purple darken-4 white--text rounded-lg ">
               <span class="yellow--text mr-5">signupDate:</span>
               <span>{{item.signupDate |moment('LLL') }}</span>


             </v-col>
             <v-col cols="3" class="ma-1 purple darken-4 white--text rounded-lg ">
               <span class="yellow--text mr-5">gender:</span>
               <span>{{item.gender }}</span>


             </v-col>
           </v-row>
        <!-- </v-card> -->
      </td>
    </template>
  
      </v-data-table>
      <v-alert type="error" class="text-capitalize" outlined v-else>you have not any users yet</v-alert>
    </v-card>


    <v-divider></v-divider>
  </div>
</template>

<script>
import Functions from "../../../server/api";
export default {
  name: "all-users",
  data() {
    return {
      students: null,
      search: "",
        expanded: [],
        singleExpand: false,
       editedIndex: -1,
      editedItem: {
        name: '',
        age: null,
        city: null,
        address: null,
        role: null,
        phone:null,
        active:null,
        date:null,
      },

      headers: [
        {
          text: "name ",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "city", value: "city" },
        { text: "date ", value: "date" },
        { text: "role ", value: "role" },
        { text: "active ", value: "active" },
        { text: "phone ", value: "phone" },
         { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  async mounted() {
    try {
      const res = await Functions.getallStudents();
      console.log(res.data);
      this.students = res.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
      getColor (active) {
        if (active === true) return 'green'
        else if (active === false) return 'red'
        else return 'pink'
      },

     async  deleteItem (item) {
         console.log(item);
         const sure = confirm('are you sure you want to delete')
         try {
             if (sure) {
           const res = await Functions.deleteStudent({id:item._id})
           console.log(res.data);
           
         }
         } catch (error) {
           console.log(error);
         }
       
       
      },
       editItem (item) {
         console.log(item);
       
      },

      deleteItemConfirm () {
       
      },
  }
};
</script>

<style lang="scss" scoped>
</style>