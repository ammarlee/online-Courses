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
import Mixins from './plugins/mixins';
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

// vue photos
Vue.use(CoolLightBox)
Vue.use(VueScreen);
Vue.use(require('vue-moment'));

// Vue.component('app-left-drawer', leftDrawer)
Vue.prototype.$soketio = socktConnect("http://localhost:3000/");
Vue.mixin(Mixins);

Vue.use(VueSweetalert2);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})
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
  created () {
    const findUserToken= function readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }
    axios.interceptors.request.use(
      config => {
       config.headers['authorization'] = `Bearer ${findUserToken('TokenUser')}`
       return config;
     });
    
  },
  

}).$mount("#app");
