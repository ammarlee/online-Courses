import axios from './mainApi';

class Students {
     //   students 
//------------------------------------------------------------------------------
static   updateProfile(data){
    return  axios().post(`update-profile`,data)
}
static   notificationSeen(data){
    console.log(data);
    return  axios().post(`notification-seen`,data)
}
static   unactive(data){
    return  axios().post(`active-student`,{studentId:data.studentId})
}
static   unactiveAll(data){
    console.log(data);
    return  axios().post(`active-all-student`,{students:data.list})
}
static   deleteAll(data){
    console.log(data);
    return  axios().post(`delete-all-student`,{students:data.list})
}
static   deleteStudent(data){
    console.log(data);
    return  axios().post(`delete-student`,{id:data.id})
}

static   getallStudents(){
    return  axios().get(`fetch-students`)
}
static   getAbsentStudent(){
    return  axios().get(`absent-student`)
}
static   getStudentData(){
    return  axios().get(`get-student-data/sadasd5`)
}
}
export default Students
