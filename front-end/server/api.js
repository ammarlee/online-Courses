import axios from 'axios';
import store from "../src/store/index"

const url = "http://localhost:3000/"
//  find the cooki name
const find= function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// delete the cooki 
function eraseCookie() {   
    document.cookie = "TokenUser"+'=; Max-Age=-99999999;';  
}
// send the JTW with headers
let axiosConfig1 = {
    headers: {
        'authorization':`Bearer ${find('TokenUser')}`
    }
  };
// 2- get it from the store instead of the cooki 
  let axiosConfig = {
    headers: {
        'authorization':`Bearer ${store.getters.token}`
    }
  };
//   console.log(store.getters.token);

  class Functions{

    // serailDetails
     //   serailDetails 
//------------------------------------------------------------------------------
static async  serailDetails(data){
    return await axios.post(`${url}serial-details`,data,axiosConfig1)
}
static async  searching(data){
    return await axios.post(`${url}search-details`,data,axiosConfig1)
}

static async  notificationSeen(data){
    console.log(data);
    return await axios.post(`${url}notification-seen`,data)
}

static async  dashboardData(){
    return await axios.get(`${url}dashboardData`)
}

static async  updateProfile(data){
    return await axios.post(`${url}update-profile`,data)
}
     //   question routes 
//------------------------------------------------------------------------------

static async  createQuestion(data){
    return await axios.post(`${url}create-questions`,data)
}

static async  updateQuestion(data){
    return await axios.post(`${url}update-question`,data)
}
static async  getallQuestions(){
    return await axios.get(`${url}get-questions`)
}
static async  deleteQuestion(data){
    return await axios.post(`${url}delete-question`,data)
}


      //   students 
//------------------------------------------------------------------------------

static async  unactive(data){
    return await axios.post(`${url}active-student`,{studentId:data.studentId})
}
static async  unactiveAll(data){
    console.log(data);
    return await axios.post(`${url}active-all-student`,{students:data.list})
}
static async  deleteAll(data){
    console.log(data);
    return await axios.post(`${url}delete-all-student`,{students:data.list})
}
static async  deleteStudent(data){
    console.log(data);
    return await axios.post(`${url}delete-student`,{id:data.id})
}

static async  getallStudents(){
    return await axios.get(`${url}fetch-students`)
}
static async  getAbsentStudent(){
    return await axios.get(`${url}absent-student`)
}
static async  getStudentData(){
    return await axios.get(`${url}get-student-data/sadasd5`)
}

    // lectures  ROUTERS
//------------------------------------------------------------------------------
static async  getAllLectures(){
    return await axios.get(`${url}get-all-lectures`)
}
static async  getRemainingTime(data){
    return await axios.post(`${url}get-remaining-time`,{userId:data.userId,lectureId:data.lectureId})
}


static async  addExtraTime(data){
    return await axios.post(`${url}add-extra-time`,data)
}
static async  editLecture(data){
    return await axios.post(`${url}edit-lecture`,data)
}

static async  getSingleLecture(data){
    return await axios.post(`${url}get-single-lecture`,{lectureId:data.lectureId, userId:data.userId})
}
static async  uploadLecture(d){
//   console.log(find('TokenUser'));

    return await axios.post(`${url}create-lecture`,d)
}
static async  deleteLecture(d){
    return await axios.post(`${url}delete-lecture`,{lectureId:d})
}

static async  submitPayment(data){
    return await axios.post(`${url}pay-lecture`,data)
}


// EXAMS  ROUTERS
//------------------------------------------------------------------------------
static async  getAllExams(){
    return await axios.get(`${url}get-all-exams`)
}

static async  createChapterExame(data){
    return await axios.post(`${url}create-exam`,{chapter:data.chapter})
}
static async  sendTheExame(data){
    return await axios.post(`${url}send-exame-to-correction`,
    {chapter:data.chapterm,exameId:data._id,questions:data.questions
    })
}
static async  examPdf(data){
    return await axios.post(`${url}exame-pdf`,
    {exameId:data.id,userId:data.userId })
}






      // AUTHANTICATION ROUTERS
//------------------------------------------------------------------------------

static async  login(data){
    return await axios.post(`${url}login`,
    {email:data.email,password:data.password})
}
static async  signup(data){
    console.log(data);
    return await axios.post(`${url}signup`,
    data)
}
static async  resetPassword(data){
    return await axios.post(`${url}reset-password`,data)
}

static async  forgetPassword(data){
    return await axios.post(`${url}forget`,
    {email:data.email})
}
static async  logout(){
    eraseCookie()
    return await axios.post(`${url}logout`)
}
static async getuserToken(token){
    return await axios.get(`${url}user/${token}`,axiosConfig)
}
  }

export default Functions
