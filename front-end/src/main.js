import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import socktConnect from "socket.io-client";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueScreen from 'vue-screen';
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
// import Tawk from 'vue-echo'
  
// Vue.use(Tawk, {
//     tawkSrc: 'YOU_TAWK_SRC'
// })
// import Functions from "../server/api";

// import leftDrawer from '@/user/includesComponent/leftDrawer.vue'
// vue photos
Vue.use(CoolLightBox)
Vue.use(VueScreen);
Vue.use(require('vue-moment'));

// Vue.component('app-left-drawer', leftDrawer)
Vue.prototype.$soketio = socktConnect("http://localhost:3000/");

Vue.mixin({
  
  data() {
    return {
      errors: null,
      overlay: false,
      socket: "",
      alertmsg:null,
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(value) {
        this.$store.dispatch("toggleDrawer", value);
      },
    },
    currentUser(){
      return this.$store.getters.getUser
    },
    onlineUsers(){
      return this.$store.getters.onlineUsers
    },
    alert(){
      return this.$store.getters.alert
    },
  
  
  },
  methods: {
    getUserLocation(){
      let data= {
        _id:this.$store.getters.getUser._id,
        time:new Date(),
        page:this.$route.path
      }
      this.$soketio.emit('userLocation',data)
    },
    sweetAlert(icon, msg, time,position) {
      const Toast = this.$swal.mixin({
        toast: true,
        position:position ,
        showConfirmButton: false,
        timer: time,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: icon,
        title: msg,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    },
    sweetAlertwithImage( title, text,imageUrl,imageWidth,imageHeight,position,time) {
      const Toast = this.$swal.mixin({
        toast: true,
        position:position ,
        showConfirmButton: false,
        timer: time,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });

      Toast.fire({
        html:`
        <img src='${imageUrl}'
         style='border-radius: 50%;
        height: ${imageWidth}px;
        width: ${imageHeight}px;
        display: inline-block;'/>
        <p ><b>${title}</b>${text}</p>

        `,
        imageAlt: 'Custom image',
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    },
   
  },
});

const base = axios.create({
  baseURL: "http://localhost:3000/",
});
Vue.prototype.$http = base;

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  mounted () {
    this.socket = this.$soketio;
      this.socket.emit("hello", {name:'ahmed'});
      this.socket.on("userLocation", data=>{
        this.$store.dispatch('userLocation',data)
      });
      
      this.socket.on("myId", data=>{
        console.log('here is my id');
        console.log(data);
        this.$store.commit('socketId',data.socketId)
      });
      
      this.socket.on("removeUserfromChat", data=>{
        console.log('removeUserfromChat');
        console.log(data);
      this.$store.commit('removeClient',data);
      });
      this.socket.on("allDone", data=>{
        console.log('allDone');
        console.log(data);
        this.alertmsg='we have accept ur chat'
        
        setTimeout(() => {
          // this.alert = false
          this.$store.commit('closeAlert',false)
        }, 4000);
        // this.$store.commit('socketId',data.socketId)
      });
      
      
      this.socket.on("reciveMsg", data=>{
        console.log('reciveMsg');
        if (data.data.sender =='admin') {
        this.$store.commit('myMsgs',data.data)
          
        }else{  
          this.$store.commit('pushMsg',data.data)
        }

      });
      
      this.socket.on("enter", data=>{
        if (data.action ==='admin') {
          
          console.log('( main page is enter admin room) :');
          console.log(data);
          
        }else if(data.action ==='client'){
          console.log('client enter');
          console.log(data);
          this.$store.commit('onlineClients',data.data)

        }
      });
      
      this.socket.on('wlcome',()=>{console.log('welcome >>>>>>>>>>>>>>>>');})
      this.socket.on('onlineUsers',(user)=>{
        this.$store.dispatch('pushNewOnlineUser',user)
      })
      this.socket.on('offline',(user)=>{
        this.$store.dispatch('removeUserOffline',user)
      })
      this.socket.on('notification',(data)=>{
        this.$store.dispatch('pushNewNotification',data)
        this.$store.dispatch('addNewLecture',data.lecture)
        
      })
      
      
      

  },
  

}).$mount("#app");
