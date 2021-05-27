<template>
    <v-app-bar  dense clipped-left height="70"
     width="1000" 
     :class="{ 'afterposition':position>530, 'beforeposition':position < 530 }"
    class="mx-auto  rounded-lg"
     style="transition:all 1s ease-in-out;"
     clipped-right  app>
       <!-- <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template> -->

        <!-- <v-img width="10" src="../../assets/pp.png"></v-img> -->
        <v-icon x-large class="yellow--text mr-2">mdi-pen</v-icon>
      <v-toolbar-title style="cursor:pointer" @click="()=>{this.$router.push('/')}" class="headline text-uppercase font-weight-bold">

        Courses
        <!-- <v-icon x-large  class="d-none black--text  d-sm-block">mdi-facebook</v-icon>
        <v-icon large class="d-sm-none" @click="drawer=!drawer">mdi-menu</v-icon> -->
      </v-toolbar-title>
      
       <v-spacer></v-spacer>
       <!--  navbarLinks -->
      <v-toolbar-items class="d-none d-md-inline">
        <v-btn plain text v-for="(item,i) in navbarLinks" :key="i"
         :to="item.link" 
         :v-if="item.condition"
         :class="{ 'white--text':position<530}"
         :title="item.title" 
         class="questrial text-none black--text text-capitalize font-weight-bold ">
          <!-- <v-icon x-large>{{item.icon}}</v-icon> -->
          {{item.title}}
          </v-btn>
      </v-toolbar-items>
      
        <!-- notification -->
      <v-badge v-if="getUser" color="green" class="mr-3" overlap bordered :content="notificationsLength.length">
            <v-menu
              v-if="getUser"
              class="allTHeOne"
              style="overflow: scroll !important; max-height: 500px !important;"
              bottom
              min-width="200px"
              rounded
              transition="slide-y-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn icon small class="d-none d-sm-inline mt-1"  v-on="on">
                  <v-icon class="white--text">mdi-bell-ring</v-icon>
                </v-btn>
              </template>
              <!-- menu for notifications -->
              <v-card max-height="500" style="overflow-y: scroll">
                <v-list-item-content class="justify-center">
                  <div class="mx-auto text-center">
                    <v-btn depressed rounded text>notification {{notifications.length}}</v-btn>
                    <v-divider class="my-3"></v-divider>

                    <div v-for="(item, index) in notifications" :key="index">
                      <v-list three-line class="theListDiv  pt-0 pb-0">
                        <v-list-item
                          :class="{'red':!item.seen ,'green':item.seen}"
                          class="text-left text-capitalize  lighten-3 mb-1"
                          :key="index"
                          nudge-left
                          two-line
                          @click="navegateTolecture(item)"
                        >
                          <v-list-item-avatar>
                            <v-icon large color="green">mdi-facebook</v-icon>
                          </v-list-item-avatar>

                          <v-list-item-content class="pt-0">
                            <v-list-item-title class="font-weight-bold">
                              {{item.title}}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{item.date |moment("LLL")}}
                              </v-list-item-subtitle>

                            <!--  -->
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </div>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
          </v-badge>
      <!-- <v-spacer></v-spacer> -->
      <v-toolbar-items  class="d-none d-sm-block">
        <div  class="pt-3" v-if="getUser">
         <!-- user options  -->
          <v-menu v-if="getUser" bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn small  fab text  v-on="on" class="">
                  <v-avatar  :size="40">
                    <img :src="getUser.img" alt="avatar">
                  </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <router-link to="/profile">
                    <v-avatar>
                      <v-img v-if="getUser.img" :src="getUser.img"></v-img>
                    </v-avatar>
                  </router-link>
                  <h3>{{ getUser.name }}</h3>
                  <p class="caption mt-1">{{ getUser.email }}</p>
                  <v-divider class="my-3"></v-divider>
                 
                  <v-btn depressed rounded @click="logout" text>
                    <v-icon>mdi-logout</v-icon>logout
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </div>
        
        
      </v-toolbar-items>
    
    </v-app-bar>
</template>
<script>
import Functions from "../../../server/api";
import { mapGetters } from "vuex";

export default {
 
  name: "navbar",
  data() {
    return {
      agree:false,
      items: [],
      tab: null,
      test: null,
      on: "",
      
       
    };
  },
 
  methods: {
    async navegateTolecture(item){
      console.log(item);
      try {
        const res =await Functions.notificationSeen({item,userId:this.getUser._id})
        console.log(res);
        this.$store.dispatch('updateNotification',item)
        
        this.$router.push('/lecture/'+item.lectureId)
      } catch (error) {
        console.log(error);
        
      }
    },
  
    async logout() {
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

    openDrawer() {
      this.drawer = !this.drawer;
    },
   
  },
  
  computed: {
    ...mapGetters([
      "getUser",
      "isLoggedIn",
      "position",
      "token",
      "notifications",
    ]),
     notificationsLength(){
      return this.$store.getters.notifications.filter(notification=>{
        return notification.seen ===false
      })
    },
    navbarLinks(){
      if(this.currentUser){
        let navbarLinks = [
        {name:'home',icon:'mdi-home-variant-outline',link:'/',title:'home'},
        {name:'lectures',icon:'mdi-home-variant-outline',link:'/lectures',title:'lectures'},
        {name:'exams',icon:'mdi-home-variant-outline',link:'/exams',title:'exams'},
        {name:'overview',icon:'mdi-home-variant-outline',link:'/overview',title:'overview'},
        {name:'files',icon:'mdi-home-variant-outline',link:'/files',title:'files'},
        {name:'best',icon:'mdi-home-variant-outline',link:'/best',title:'best'},
       
       ]
       if (this.currentUser.role =='admin') {
         navbarLinks.push(
        {name:'client',icon:'mdi-account-clock-outline',link:'/client/444',title:'client'},
         {name:'admin',icon:'mdi-account-clock-outline',link:'/admin',title:'Admin'})
         
       }else if(this.currentUser.role =='guide'){
         navbarLinks.push(
        {name:'client',icon:'mdi-account-clock-outline',link:'/client/444',title:'client'},
         )
       }
       return navbarLinks
      }else{
        let navbarLinks = [
        {name:'home',icon:'mdi-home-variant-outline',link:'/',title:'home'},
        {name:'lectures',icon:'mdi-home-variant-outline',link:'/lectures',title:'lectures'},
        {name:'files',icon:'mdi-home-variant-outline',link:'/files',title:'files'},
        {name:'best',icon:'mdi-home-variant-outline',link:'/best',title:'best'},
        {name:'login',icon:'mdi-account-clock-outline',link:'/login',title:'login'},
        
       ]
       return navbarLinks

      }
    }
 
  },
};
</script>

<style>
.v-text-field.v-text-field--solo .v-input__control{
  min-height: 100px
}
.afterposition{
margin-top: 12px !important;
background:white !important
}
.beforeposition{
margin-top: 16px !important;
background:transparent!important;
color:white !important
}
.v-text-field.v-text-field--solo .v-input__append-inner, .v-text-field.v-text-field--solo .v-input__prepend-inner{
  margin-bottom: 5px
}
</style>
