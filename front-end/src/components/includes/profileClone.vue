<template>
  <div>
    <v-container>
      <h2 class="text-capitalize text-center font-weight-bold">profile</h2>
      <div>
        <v-row class="mx-auto text-capitalize">
          <v-col cols="12">
            <v-img :src="user.img" width="300" height="300" class="rounded-circle mx-auto"></v-img>
            <h1 class="text-center my-5 text-capitalize font-weight-bold">
              {{user.name}}
              <v-btn icon class="d-inline-block" fab @click="openDialoge">
                <v-icon color="green" large>mdi-pencil</v-icon>
              </v-btn>
            </h1>
          </v-col>

          <v-col cols="12" sm="5" md="5" class="ma-1 purple darken-4 white--text rounded-lg">
            <span class="yellow--text mr-5">email:</span>
            <span>{{user.email }}</span>
          </v-col>

          <v-col cols="12" sm="5" md="5" class="ma-1 purple darken-4 white--text rounded-lg">
            <span class="yellow--text mr-5">id:</span>
            <span>{{user._id }}</span>
          </v-col>

          <v-col cols="12" sm="5" md="5" class="ma-1 purple darken-4 white--text rounded-lg">
            <span class="yellow--text mr-5">phone:</span>
            <span>{{user.phone }}</span>
          </v-col>
          <v-col cols="12" sm="5" md="5" class="ma-1 purple darken-4 white--text rounded-lg">
            <span class="yellow--text mr-5">fatherNumber:</span>
            <span>{{user.fatherNumber }}</span>
          </v-col>

          <v-col cols="12" sm="5" md="5" class="ma-1 purple darken-4 white--text rounded-lg">
            <span class="yellow--text mr-5">city:</span>
            <span>{{user.city }}</span>
          </v-col>

          <v-col cols="12" sm="5" md="5" class="ma-1 purple darken-4 white--text rounded-lg">
            <span class="yellow--text mr-5">address:</span>
            <span>{{user.addres }}</span>
          </v-col>
          <v-col cols="12" sm="5" md="5" class="ma-1 purple darken-4 white--text rounded-lg">
            <span class="yellow--text mr-5">role</span>
            <span>{{user.role =='1' ?'admin':"student" }}</span>
          </v-col>
          <v-col cols="12" sm="5" md="5" class="ma-1 purple darken-4 white--text rounded-lg">
            <span class="yellow--text mr-5">signupDate:</span>
            <span>{{user.signupDate |moment('LLL') }}</span>
          </v-col>
          <v-col cols="12" sm="5" md="5" class="ma-1 purple darken-4 white--text rounded-lg">
            <span class="yellow--text mr-5">gender:</span>
            <span>{{user.gender }}</span>
          </v-col>
        </v-row>
      </div>
      <!-- dialog -->
      <div>
        <v-dialog v-model="dialog" width="800" v-if="newData">
          <v-card class=" text-center text-capitalize">
            <v-card-title class="grey lighten-3">edit profile</v-card-title>
            <div>
              <v-row class="pa-5">
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="newData.name" hide-details dense outlined  label="name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="newData.email" dense outlined hide-details label="email"></v-text-field>
                </v-col>
                
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="newData.phone" hide-details dense outlined label="phone"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="newData.fatherNumber" hide-details dense outlined label="fatherNumber"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="newData.addres" hide-details dense outlined label="address"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="newData.city" hide-details dense outlined label="city"></v-text-field>
                </v-col>
               
              </v-row>
            </div>
            <v-card-actions>
                <v-btn text color='pink' @click="dialog =false">
                    cancle
                </v-btn>
                <v-btn text color='green' @click="updateData">
                    save
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
import Functions from "../../../server/api";
export default {
  data() {
    return {
      key: "value",
      dialog: false,
      newData:null,
    };
  },
  mounted() {},
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    openDialoge() {
        this.newData =null;
        this.newData =this.user
      this.dialog = true;
    },
   async updateData(){
        console.log('update data');
        console.log(this.newData);
        try {
            const res = await Functions.updateProfile(this.newData)
            console.log(res);
            this.$store.commit('setUser',res.data.user);
            
        } catch (error) {
            console.log(error);
            this.errors = error
        }
        
    }
  },
};
</script>


<style lang="scss" scoped>
</style>