    
import Functions from "../../../server/LecturesApi";

const state = {
  singleLecture: null,
  lectures: [],
};
const getters = {
  singleLecture(state) {
    return state.singleLecture;
  },
  lectures(state) {
    return state.lectures;
  },
};
const mutations = {
  deleteLecture(state, payload) {
    state.lectures = state.lectures.filter((lecture) => {
      return lecture._id !== payload;
    });
  },
  updateLecture(state, payload) {
    state.lectures[payload.index] = payload.item;
  },

  async getAllLectures(state) {
    try {
      const res = await Functions.getAllLectures();
      state.lectures = res.data.lectures;
    } catch (error) {
      state.errors = error;
    }
  },
  addNewLecture(state, payload) {
    state.lectures.unshift(payload);
  },
  singleLecture(state, payload) {
    state.singleLecture = payload;
  },
};
const actions = {
  addNewLecture({ commit }, payload) {
    commit("addNewLecture", payload);
  },
  deleteLecture({ commit }, payload) {
    commit("deleteLecture", payload);
  },
  updateLecture({ commit }, payload) {
    commit("updateLecture", payload);
  },
  getAllLectures({ commit }) {
    commit("getAllLectures");
  },
  singleLecture({ commit }, payload) {
    commit("singleLecture", payload);
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
