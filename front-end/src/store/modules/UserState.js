const state = {
    user: null,
    users: [],
    onlineUsers: [],
    

}
const getters = {
    onlineUsers(state) {
        return state.onlineUsers;
      },
      getUser(state) {
        return state.user;
      },
      
      users(state) {
        return state.users;
      },
      notifications(state) {
        return state.user.notifications;
      },

}
const mutations = {
    updateNotification(state,payload){
        let indexofElement = state.user.notifications.findIndex(i=>{
           return i._id.toString()==payload._id.toString()
         })
         state.user.notifications[indexofElement].seen = true
       },
       pushNewNotification(state,payload){
        state.user.notifications.unshift(payload.lastNotification);
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
        if (userIndex > -1 ) {
          console.log(state.onlineUsers[userIndex].page);
          state.onlineUsers[userIndex].page =payload.page 
          
        } else {
          this.errors = 'there are an error with location '
          
        }
       
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

}
const actions = {
  updateNotification({commit},payload){
    commit('updateNotification',payload)
  },
    setUser({ commit }, user) {
        commit("setUser", user);
      },
      setUsers({ commit }, payload) {
        commit("setUsers", payload);
      },
      setNewUser({commit},user){
        commit('setNewUser',user)
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
      
      },
     
    
}
export default {
    state,
    getters,
    mutations,
    actions
}