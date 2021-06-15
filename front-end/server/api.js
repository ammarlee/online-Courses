import axios from './mainApi';
  class Functions{
//------------------------------------------------------------------------------
static   searching(data){
    return  axios().post(`search-details`,data,)
}

static   serailDetails(data){
    return  axios().post(`serial-details`,data,)
}

static   dashboardData(){
    return  axios().get(`dashboardData`)
}

  }

export default Functions
