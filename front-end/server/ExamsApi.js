import axios from './mainApi';

class Exams {
    
// EXAMS  ROUTERS
//------------------------------------------------------------------------------
static   getAllExams(){
    return  axios().get(`get-all-exams`)
}

static   createChapterExame(data){
    return  axios().post(`create-exam`,{chapter:data.chapter})
}
static   sendTheExame(data){
    return  axios().post(`send-exame-to-correction`,
    {chapter:data.chapterm,exameId:data._id,questions:data.questions,studentId:data.studentId
    })
}
static   examPdf(data){
    return  axios().post(`exame-pdf`,
    {exameId:data.exameId,userId:data.userId })
}



}
export default Exams
