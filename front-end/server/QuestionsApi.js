import axios from './mainApi';

class Questions {
         //   question routes 
//------------------------------------------------------------------------------

static   createQuestion(data){
    return  axios().post(`create-questions`,data)
}

static   updateQuestion(data){
    return  axios().post(`update-question`,data)
}
static   getallQuestions(){
    return  axios().get(`get-questions`)
}
static   deleteQuestion(data){
    return  axios().post(`delete-question`,data)
}

}
export default Questions