import Vue from "vue";
import Vuex from "vuex";
import UserState from "./modules/UserState"
import LectureState from "./modules/LectureState"
import DrawerState from "./modules/DrawerState"
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    onlineClients:[],
    socketId:null,
    scrollPosition:null,
    remainingTime:null,
    timer:null,
    isAuthanticated: false,
    token: null,
    msgs:{},
    errors: null,
    allNotifications: [],
    searching: null,
    alert:false,
    myMsgs:[],
    
  },
  // GETTERS TO SEND DATA ANOTHER PLACE
  getters: {
    alert(state) {
      return state.alert;
    },
   
    myMsgs(state) {
      return state.myMsgs;
    },
    msgs(state) {
      return state.msgs;
    },
    singleChat(state){
      return (roomId)=>{ 
        return state.msgs[roomId]
      }

    },
    onlineClients(state) {
      return state.onlineClients;
    },
    socketId(state) {
      return state.socketId;
    },
    timer(state) {
      return state.timer;
    },
   
    allNotifications(state) {
      return state.allNotifications;
    },
    
    position(state) {
      return state.scrollPosition;
    },

    isLoggedIn(state) {
      return state.isAuthanticated;
    },
    token(state) {
      return state.token;
    },
    
    getSearching(state) {
      return state.searching;
    },
    remainingTime(state){
      return state.remainingTime
    },
   

  },
  mutations: {
    closeAlert(state,payload){
      state.alert = payload
    },
    updateNotification(state,payload){
      let indexofElement = state.user.notifications.findIndex(i=>{
         return i._id.toString()==payload._id.toString()
       })
       state.user.notifications[indexofElement].seen = true
     },
    myMsgs(state,payload){
      state.myMsgs.push(payload)
        },
    removeClient(state,payload){
      state.onlineClients = state.onlineClients.filter((i) => {
        return i.roomId !== payload;
      });
    },
    start(state,payload){
        state.msgs[`${payload}`] =[]
     },
    pushMsg(state,payload){
      if (state.msgs[`${payload.roomId}`]) {
        state.msgs[`${payload.roomId}`].push(payload)
      }else{
        state.msgs[`${payload.roomId}`] =[payload]
      }
     },
     socketId(state,payload){
      state.socketId=payload
     },
     onlineClients(state,payload){
       let checkUser=state.onlineClients.find(i=>{
         return i.roomId ==payload.roomId
       })
       if (checkUser) {
         return 
       }else{
         state.onlineClients.push(payload)

       }
     },
     setallOnlineClients(state,payload) {
       state.onlineClients = payload

     },
   
   
    setTimer(state, payload) {
      state.timer = payload;
    },
    scrollPosition(state,payload){
      state.scrollPosition = payload
    },
    remainingTime(state,payload){
      state.remainingTime = payload
    },
   
    setAllNotifications(state, payload) {
      state.allNotifications.unshift(payload);
    },
   
    setAllNotificationsAfterLogin(state, payload) {
      state.allNotifications = payload;
    },
   
    setSearchingResult(state, payload) {
      state.searching = payload;
    },
   
    token(state, token) {
      state.token = token;
    },
    isAuthanticated(state, payload) {
      state.isAuthanticated = payload;
    },

    logoutUser(state) {
      state.isAuthanticated = false;
    },

    setErros(state, payload) {
      state.errors = payload;
    },

  
  },
  // THE ALL ACTIONS
  actions: {
  
    updateNotification({commit},payload){
      commit('updateNotification',payload)
    },
   
    remainingTime({commit},payload){
      commit('remainingTime',payload)
    },
    
    setToken({ commit }, token) {
      commit("token", token);
    },
    setAuth({ commit }, isauth) {
      commit("isAuthanticated", isauth);
    },
    pushNewNotification({ commit }, payload) {
      commit("pushNewNotification", payload);
    },
    
  },
  modules: {
    DrawerState,
    UserState,
    LectureState
  },
});
