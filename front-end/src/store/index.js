import Vue from "vue";
import Vuex from "vuex";
import Functions from "../../server/api";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    singleLecture:null,
    lectures:[],
    onlineClients:[],
    socketId:null,
    scrollPosition:null,
    remainingTime:null,
    timer:null,
    onlineUsers: [],
    isAuthanticated: false,
    token: null,
    msgs:{},
    errors: null,
    allNotifications: [],
    searching: null,
    alert:false,
    myMsgs:[],
    drawer: false,
    rightDrawer: false,
  },
  // GETTERS TO SEND DATA ANOTHER PLACE
  getters: {
    alert(state) {
      return state.alert;
    },
    drawer(state) {
      return state.drawer;
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
    
    rightDrawer(state) {
      return state.rightDrawer;
    },
   
    onlineUsers(state) {
      return state.onlineUsers;
    },
    allNotifications(state) {
      return state.allNotifications;
    },

    getUser(state) {
      return state.user;
    },
    position(state) {
      return state.scrollPosition;
    },
    
    users(state) {
      return state.users;
    },

    isLoggedIn(state) {
      return state.isAuthanticated;
    },
    token(state) {
      return state.token;
    },
    notifications(state) {
      return state.user.notifications;
    },
    getSearching(state) {
      return state.searching;
    },
    remainingTime(state){
      return state.remainingTime
    },
    singleLecture(state){
      return state.singleLecture
    },
    lectures(state){
      return state.lectures
    }


  },
  mutations: {
    closeAlert(state,payload){
      state.alert = payload
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
      console.log(payload);
        state.msgs[`${payload}`] =[]

      
     },
    pushMsg(state,payload){
      console.log(payload);
      // let field =  state.msgs.payload.roomId =[payload]
      // state.msgs.payload.roomId =
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
       console.log(payload);
       state.onlineClients = payload

     },
    updateNotification(state,payload){
     let indexofElement = state.user.notifications.findIndex(i=>{
        return i._id.toString()==payload._id.toString()
      })
      state.user.notifications[indexofElement].seen = true
    },
    deleteLecture(state,payload){
      state.lectures = state.lectures.filter((lecture) => {
        return lecture._id !== payload;
      });
     },
     updateLecture(state,payload){
      state.lectures[payload.index] = payload.item;
     },
     
   async getAllLectures(state){
     try {
      const res = await Functions.getAllLectures();
      state.lectures = res.data.lectures;
       
     } catch (error) {
       state.errors = error

       
     }
      
     },
    addNewLecture(state,payload){
      state.lectures.unshift(payload)
     },
    singleLecture(state,payload){
      state.singleLecture = payload
    },
    pushNewNotification(state,payload){
      console.log(payload.lastNotification);
       state.user.notifications.unshift(payload.lastNotification);
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
    setNewUser(state, value) {
      state.users.push(value) ;
    },
    updateUser(state, value) {
      state.user = value.user;
    },
    updateUserCover(state, payload){
      state.user.coverImg=payload.newImage

    },
    toggleDrawer(state, value) {
      state.drawer = value;
    },
    
    toggleRightDrawer(state, value) {
      state.rightDrawer = value;
    },
    setAllNotifications(state, payload) {
      state.allNotifications.unshift(payload);
    },
   
    pushNewOnlineUser(state, payload) {
      let checkingIt = state.onlineUsers.some((p) => {
        return p._id.toString() == payload._id.toString();
      });
      checkingIt ? true : state.onlineUsers.unshift(payload);
    },
    removeUserOffline(state, payload) {
      state.onlineUsers = state.onlineUsers.filter((i) => {
        return i._id.toString() !== payload._id.toString()
      });
    },
    userLocation(state, payload) {
      let userIndex=state.onlineUsers.findIndex(i=>{
        return i._id.toString() == payload._id.toString()
      })
      console.log(userIndex);
      if (userIndex > -1 ) {
        console.log(state.onlineUsers[userIndex].page);
        state.onlineUsers[userIndex].page =payload.page 
        
      } else {
        this.errors = 'there are an error with location '
        
      }
     
    },
    setAllNotificationsAfterLogin(state, payload) {
      state.allNotifications = payload;
    },
   
    setSearchingResult(state, payload) {
      state.searching = payload;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
    onlinUsers(state, users) {
      state.onlinUsers = users;
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
    addNewLecture({commit},payload){
      commit('addNewLecture',payload)
    },
    deleteLecture({commit},payload){
      commit('deleteLecture',payload)
    },
    updateLecture({commit},payload){
      commit('updateLecture',payload)
    },
    getAllLectures({commit}){
      commit('getAllLectures')
    },
    updateNotification({commit},payload){
      commit('updateNotification',payload)
    },
    singleLecture({commit},payload){
      commit('singleLecture',payload)
    },
    remainingTime({commit},payload){
      commit('remainingTime',payload)
    },
    onlinUsers({commit},payload){
      commit('onlinUsers',payload)
    },
    pushNewOnlineUser({commit},payload){
      commit('pushNewOnlineUser',payload)
    },
    removeUserOffline({commit},payload){
      commit('removeUserOffline',payload)
    },
    userLocation({commit},payload){
      commit('userLocation',payload)
    },
    setUserData({ commit, dispatch }, currentUser) {
      const token = currentUser.data.token;
      let d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 7 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = "TokenUser=" + token + ";" + expires + ";path=/";
      dispatch("setUser", currentUser.data.user);
      dispatch("setAuth", currentUser.data.authanticated);
      dispatch("setToken", token);
      commit('')
      localStorage.setItem("userToken", token);
      // commit("setNotifications", currentUser.data.user.friendsNotifications);
      // commit(
      //   "setAllNotificationsAfterLogin",
      //   currentUser.data.user.AllNotifications
      // );
      // commit("setUserMessages", currentUser.data.user.messageNotifications);
      
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setToken({ commit }, token) {
      commit("token", token);
    },
   
    setUsers({ commit }, payload) {
      commit("setUsers", payload);
    },
   
    toggleDrawer({ commit }, value) {
      commit("toggleDrawer", value);
    },
    toggleRightDrawer({ commit }, value) {
      commit("toggleRightDrawer", value);
    },
    // SET THE DATA OF THE USER IN STATE
    
    setNewUser({commit},user){
      commit('setNewUser',user)
    },
    // SET THE SATAE OF THE USER
    setAuth({ commit }, isauth) {
      commit("isAuthanticated", isauth);
    },
    pushNewNotification({ commit }, payload) {
      commit("pushNewNotification", payload);
    },
    
  },
  modules: {},
});
