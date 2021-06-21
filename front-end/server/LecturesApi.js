import axios from './mainApi';

class Lectures {
    //------------------------------------------------------------------------------
static   getAllLectures(){
    return  axios().get(`get-all-lectures`)
}
static   getRemainingTime(data){
    return  axios().post(`get-remaining-time`,{userId:data.userId,lectureId:data.lectureId})
}


static   addExtraTime(data){
    return  axios().post(`add-extra-time`,data)
}
static   editLecture(data){
    return  axios().post(`edit-lecture`,data)
}

static   getSingleLecture(data){
    return  axios().post(`get-single-lecture`,{
        lectureId:data.lectureId, userId:data.userId})
}
static getLectureDetails(data){
    return  axios().post(`get-single-lecture-details`,{lectureId:data.id})

}
static   uploadLecture(d){
//   console.log(find('TokenUser'));

    return  axios().post(`create-lecture`,d)
}
static   deleteLecture(d){
    return  axios().post(`delete-lecture`,{lectureId:d})
}

static   submitPayment(data){
    return  axios().post(`pay-lecture`,data)
}


}
export default Lectures
