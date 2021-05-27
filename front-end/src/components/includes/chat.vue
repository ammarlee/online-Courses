<template>
  <div hidden>
    <v-btn fab fixed color="cyan " bottom right @click="mainDialog()">
      <v-icon color="white">mdi-chat</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-capitalize text-center info--text">contact with us </v-card-title>
        <v-card-text>
          <v-text-field required v-model="user.name" label=" name"></v-text-field>
          <v-text-field required v-model="user.email" label="email name"></v-text-field>
          <v-text-field required v-model="user.phone" label="phone name"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text class="text-capitalize" color="green" @click="startChat">start</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="msgDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-capitalize text-center info--text"> our support team</v-card-title>
        <hr>
        <v-alert outlined type="success" small  class="ma-9" v-if="alert">{{alertmsg}}</v-alert>
        <v-card-text v-else >
          <div
            v-for="(one,i) in myMsgs"
            :key="i"
            :class="{'cyan':one.sender=='client','success':one.sender=='admin'}"
            class="ma-3 white--text font-weight-bold rounded-lg pa-2"
          >
            <h3>{{one.sender =='admin'? one.name:''}}</h3>

            <h4 class="white-text">{{one.msg}}</h4>
            <small>{{one.date |moment('LT')}}</small>
          </div>
        </v-card-text>
        <v-card-text>
          <v-text-field label="write your message"  outlined hide-details v-model="msg" @keyup.enter="sendtheMsg()"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      msgDialog: false,
      msg: "hello",
      chatdialog: false,
      newusers: [],
      roomId: null,
      user: {
        name: "ahmed",
        email: "m@gmail.com",
        phone: "256565",
      },
    };
  },
  mounted() {
    this.$soketio.on("newUserEntere", (data) => {
      this.newusers.push(data);
    });

  },
  computed: {
    socketId() {
      return this.$store.getters.socketId;
    },
    msgs() {
      return this.$store.getters.msgs;
    },
    
    myMsgs(){
            return this.$store.getters.myMsgs;

    }
  },

  methods: {
    mainDialog(){
      if(this.myMsgs.length > 0){
        this.msgDialog = true;

      }else{
        this.dialog = true;
      }
    },
    sendtheMsg() {
      let data = {
        roomId: this.socketId,
        msg: this.msg,
        name: this.user.name,
        date: new Date(),
        sender: "client",
      };
      this.$soketio.emit("sendTheMsg", data);
        this.$store.commit('myMsgs',data)
      this.msg = "";
    },
    startChat() {
      let data = {
        ...this.user,
        roomId: this.socketId,
      };
      this.$soketio.emit("sendRequest", data);
        this.$store.commit('start',data.roomId)

      this.dialog = false;
      this.msgDialog = true;
      this.alertmsg = "wait we gonna answer you ";

      // io.join()
    },
  },
};
</script>

<style lang="scss" scoped>
</style>