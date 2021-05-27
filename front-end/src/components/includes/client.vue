<template>
  <div class="text-center text-capitalize ma-10">
    <h2>support team page</h2>
    <v-divider></v-divider>
    <div v-if="onlineClients">
      <div  width="300" height="200" class="ma-3 pa-5">
        <v-row class="grey lighten-3">
          <v-col cols="12" sm="3" md="3" 
           v-for="(one,i) in onlineClients"
              :key="i"
              class="ml-1"
              style="cursor:pointer"
               :id="one.roomId"
              @click="submitChat(one)">
           <v-list class="ma-1 pa-1 rounded-lg   pink font-weight-bold"
               >
            <v-list-item  >
              <v-list-item-avatar>
                <v-icon color='white'>
                  mdi-account
                </v-icon>
              </v-list-item-avatar>
 
              <v-list-item-content>
                <v-list-item-title v-text="one.name" class="white--text"></v-list-item-title>
              </v-list-item-content>

              <v-btn @click="submitChat(one)" icon>
                <v-icon color="deep-purple accent-4'">mdi-message-outline</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
          </v-col>
        </v-row>
      </div>
    </div>
    
   
    <v-dialog v-model="msgDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-capitalize text-center info--text">msg from others</v-card-title>
        <v-card-text v-if="singleChat">
          <div
            v-for="(one,i) in singleChat"
            :key="i"
            :class="{'cyan':one.sender=='client','red':one.sender=='admin'}"
            class="ma-3 white--text font-weight-bold rounded-lg pa-2"
          >
            <h3>{{one.sender =='client'? one.name:''}}</h3>
            <h4 class="white-text">{{one.msg}}</h4>
            <small>{{one.date |moment('LT')}}</small>
          </div>
        </v-card-text>
        <v-card-text>
          <v-text-field label="write your message"  outlined hide-details v-model="msg" @keyup.enter.exact="sendtheMsg()"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accepted: false,
      msgDialog: false,
      msg: null,
      singleChat: null,
      roomId: null,
    };
  },
  mounted() {
    console.log('mounted in the clientroom');
    this.$soketio.on("deleteUser", (data) => {
      this.$store.commit("removeClient", data);
    });
    
    this.$soketio.on("onlineInTheRoom", (data) => {
          this.$store.commit('setallOnlineClients',data.onlineClients)
    });
   
  },
  computed: {
    onlineClients() {
      return this.$store.getters.onlineClients;
    },
    msgs() {
      return this.$store.getters.msgs;
    },

    // singleChat() {
    //   return this.$store.getters.singleChat(this.roomId)
    // },
  },
  // watch: {
  //   singleChat(newValue, oldValue) {
  //     console.log(newValue);
  //     console.log('///////');
  //     console.log(oldValue);

  //   }
  // },
  methods: {
    submitChat(one) {
      let element = document.getElementById(one.roomId);
      console.log(element);
      element.classList.add("cyan");
      // element.disabled = "disabled";
      // this.$store.commit('removeClient',one.data.socketId);
      // this.roomId = null;
      this.roomId = one.roomId;
      this.singleChat = this.msgs[`${this.roomId}`];
      this.$soketio.emit("acceptClient", one);
      this.$soketio.emit("Disableduser", one.roomId);
      this.roomId = one.roomId;
      this.msgDialog = true;
    },
    sendtheMsg() {
      let data = {
        roomId: this.roomId,
        msg: this.msg,
        date: new Date(),
        sender: "admin",
        name: this.currentUser.name,
      };
      this.$soketio.emit("sendTheMsg", data);
      this.$store.commit("pushMsg", data);
      this.singleChat = this.msgs[`${this.roomId}`];
      // this.roomId = data.roomId;

      this.msg = "";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>