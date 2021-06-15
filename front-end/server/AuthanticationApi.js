import axios from './mainApi';

// delete the cooki 

function eraseCookie() {   
    document.cookie = "TokenUser"+'=; Max-Age=-99999999;';  
}
class Authantication {
static   login(data){
    return  axios().post(`login`,
    {email:data.email,password:data.password})
}
static   signup(data){
    console.log(data);
    return  axios().post(`signup`,
    data)
}
static   resetPassword(data){
    return  axios().post(`reset-password`,data)
}

static   forgetPassword(data){
    return  axios().post(`forget`,
    {email:data.email})
}
static   logout(){
    eraseCookie()
    return  axios().post(`logout`)
}
static  getuserToken(token){
    return  axios().get(`user/${token}`)
}
}
export default Authantication
