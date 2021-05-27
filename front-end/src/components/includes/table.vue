<template>
  <div>
    <v-card width="1100">
      <v-card-title class="text-capitalize text-center info--text">
        {{title}}
        <v-spacer></v-spacer>
        <div>
          <slot name="createQuestion"></slot>
        </div>
        <div>
          <slot name="createLecture"></slot>
        </div>
      </v-card-title>
      <v-simple-table fixed-header height="500px" v-if="questions">
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-center text-capitalize text-body-1 orange--text"
                v-for="(item,i) in questionList"
                :key="i"
              >{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in questions" :key="item._id">
              <td>{{ item.chapter }}</td>
              <td>{{ item.lesson }}</td>
              <td>{{ item.time | moment("L") }}</td>
              <td>{{ item.question}}</td>
              <td>
                <v-btn
                  fab
                  elevation="3"
                  icon
                  small
                  @click="deleteQuestion(item._id)"
                  title="delete Lecture"
                >
                  <v-icon class="pink--text">mdi-delete</v-icon>
                </v-btn>
                <v-btn
                  fab
                  elevation="3"
                  icon
                  small
                  class="mx-3"
                  @click="editQuestion(item)"
                  title="edit Lecture"
                >
                  <v-icon class="green--text">mdi-pencil</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div>
        <slot name="questionError"></slot>
      </div>

      <v-simple-table fixed-header height="500px" v-if="lectures">
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-center text-capitalize text-body-1 orange--text"
                v-for="(item,i) in lectureList"
                :key="i"
              >{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in lectures" :key="item._id">
              <td>{{ item.chapter }}</td>
              <td>{{ item.lesson }}</td>
              <td>{{ item.date | moment("L") }}</td>
              <td>{{ item.StudentAttendance.length }}</td>
              <td>
                <v-btn
                  fab
                  elevation="3"
                  icon
                  small
                  @click="deleteLecture(item._id)"
                  title="delete Lecture"
                >
                  <v-icon class="pink--text">mdi-delete</v-icon>
                </v-btn>
                <v-btn
                  fab
                  elevation="3"
                  icon
                  small
                  class="mx-3"
                  @click="editLecture(item._id)"
                  title="edit Lecture"
                >
                  <v-icon class="green--text">mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  fab
                  elevation="3"
                  icon
                  small
                  @click="addExtraTime(item._id)"
                  title="extra time"
                >
                  <v-icon class="info--text">mdi-sort-clock-descending-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div>
        <slot name="questionError"></slot>
      </div>
    </v-card>
  </div>
</template>

<script>
// import Functions from "../../../server/api";
export default {
  props: [
    "questionList",
    "lectureList",
    "lectures",
    "questions",
    "title",
    "deleteQuestion",
    "editQuestion",
    "deleteItemConfirm",
    "deleteLecture",
    "editLecture",
    "refsImg",
    "uploadImg",
    "saveUpdate",
    "addExtraTime",
    "updateTimer",
  ],
  data() {
    return {
      // dialogCreated:false
      // questionList:['chapter','lesson','time','question','actions'],
      // lectureList : ['chapter','lesson','date','attendce','actions']
    };
  },
  mounted() {},
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>