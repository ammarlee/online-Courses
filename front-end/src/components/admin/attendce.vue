<template>
  <div class="my-10 text-center text-capitalize pink--text">
    <h2>attendece users</h2>
    <p class="blue--text lighten-3">the user who does not attend the last 3 lectures</p>
    <v-card max-width="900">
      <div v-if="students">
        <div v-if="students.length >0">
          <v-simple-table fixed-header height="300px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    class="text-center text-capitalize text-body-1 font-weight-bold info--text"
                    v-for="(item,i) in listData"
                    :key="i"
                  >{{item}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in students" :key="item._id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.age }}</td>
                  <td>{{ item.city }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.fatherNumber }}</td>
                  <td>{{ item.active }}</td>
                  <td>
                    <v-btn
                      icon
                      text
                      elevation="3"
                      class="red--text"
                      @click.prevent="unactive(item._id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-btn @click="unactiveAll" class="my-3 info--text text-capitalize" text>
            <v-icon>mdi-delete</v-icon>unactive all
          </v-btn>
          <v-btn @click="deleteAll" text class="my-3 ml-3 text-capitalize pink--text">
            <v-icon>mdi-delete</v-icon>delete all
          </v-btn>
        </div>
        <v-alert type="error" class="text-capitalize mt-3" outlined v-else>there is no users</v-alert>
      </div>

      <v-alert type="error" class="text-capitalize mt-3" outlined v-else>there is no users</v-alert>
    </v-card>
  </div>
</template>
<script>
import Functions from "../../../server/StudentsApi";
export default {
  name: "attencde-student",
  data() {
    return {
      students: null,
      toggle: true,
      listData: [
        "name",
        "age",
        "city",
        "phone",
        "fatherNumber",
        "active",
        "actions",
      ],
    };
  },
  async mounted() {
    try {
      const res = await Functions.getAbsentStudent();
      this.students = res.data.student;
    } catch (error) {
      this.dialogNotifyError("there are soemthing wrong ");
      console.log(error);
    }
  },
  methods: {
     unactiveAll() {
      this.$dialog.info({
        text: "are you  sure ?",
        title: "delete",
        persistent: true,
        actions: {
          true: {
            text: "yes",
            color: "green",
            handle: async () => {
              try {
                let list = this.students.map((i) => {
                  {
                    return i._id;
                  }
                });
                await Functions.unactiveAll({ list });
                this.students.forEach((element) => {
                  element.active = false;
                });
                let msg = `deleted succefully`;
                this.dialogNotifySuccess(msg);
              } catch (error) {
                this.dialogNotifyError("there are soemthing wrong ");
              }
            },
          },
          false: {
            text: "cancel",
          },
        },
      });
    },
     deleteAll() {
      this.$dialog.info({
        text: "are you  sure ?",
        title: "delete",
        persistent: true,
        actions: {
          true: {
            text: "yes",
            color: "green",
            handle:async () => {
              try {
                let list = this.students.map((i) => {
                  {
                    return i._id;
                  }
                });
                await Functions.deleteAll({ list });
                this.students.forEach((element) => {
                  element.active = false;
                });
                let msg = `deleted succefully`;
                this.dialogNotifySuccess(msg);
              } catch (error) {
                this.dialogNotifyError("there are soemthing wrong ");
              }
            },
          },
          false: {
            text: "cancel",
          },
        },
      });
    },

     unactive(studentId) {
      this.$dialog.info({
        text: "are you  sure ?",
        title: "delete",
        persistent: true,
        actions: {
          true: {
            text: "yes",
            color: "green",
            handle:async () => {
              try {
                const res = await Functions.unactive({ studentId });
                let itemIndex = this.students.findIndex((i) => {
                  {
                    return i._id == studentId;
                  }
                });

                this.students[itemIndex].active = res.data.user.active;
                let msg = `unactive succefully`;
                this.dialogNotifySuccess(msg);
              } catch (error) {
                this.dialogNotifyError("there are something wrong ");
              }
            },
          },
          false: {
            text: "cancel",
          },
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>