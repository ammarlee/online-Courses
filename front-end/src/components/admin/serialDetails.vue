<template>
  <div>
    <h2 class="headline pa-10 text-capitalize text-center info--text">serial details</h2>
    <v-row>
      <v-col cols="8" offset-sm="2">
        <v-select :items="items" v-model="meen" label="search options " solo></v-select>
        <v-text-field
          :label="meen =='serialId' ?'serial ID':'cardId'"
          persistent-hint
          outlined
          v-model="serialId"
        ></v-text-field>
        <v-btn class="pink white--text" text @click="serialDetails">
          <v-icon>mdi-account</v-icon>search
        </v-btn>
        <v-alert type="error" class="text-capitalize mt-3" outlined v-if="errors">{{errors}}</v-alert>
      </v-col>
      <v-dialog v-model="dialog" width="600" >
        <v-card width="600" min-height="450" max-height="800">
          <div class="detai" style="width:100%">
            <div class="text-capitalize text-center" v-if="details">
              <h3 class=" pa-5 ma-3 mb-1 mx-auto  d-inline-block rounded-lg black yellow--text "><span class="yellow--text mr-5">serialNumber:</span>{{details.serialNumber}}</h3>
              <br>
              <h3 class=" pa-5 ma-3  mx-auto  d-inline-block rounded-lg black yellow--text "  > <span class="yellow--text mr-1">valid:</span> {{details.valid}}</h3>
            </div>
          </div>
          <div class="text-capitalize mt-10 mb-10 text-center ma-auto" v-if="details">
            <v-row justify="center">
              <v-expansion-panels inset>
                
                <v-expansion-panel v-if="details.lectureDetails">
                  <v-expansion-panel-header>
                    <h3 class="text-capitalize info--text  text-center  font-weight-bold">lecture Details</h3>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="5" class="ma-1 purple darken-4 white--text rounded-lg">
                        <span class="yellow--text mr-5">lectgureId:</span>
                        <span>{{details.lectureDetails[0].lectureId._id}}</span>
                      </v-col>
                      <v-col cols="5" class="ma-1 purple darken-4 white--text rounded-lg">
                        <span class="yellow--text mr-5">chapter:</span>
                        <span>{{details.lectureDetails[0].lectureId.chapter}}</span>
                      </v-col>
                      <v-col cols="5" class="ma-1 purple darken-4 white--text rounded-lg">
                        <span class="yellow--text mr-5">lesson:</span>
                        <span>{{details.lectureDetails[0].lectureId.lesson}}</span>
                      </v-col>
                      <v-col cols="5" class="ma-1 purple darken-4 white--text rounded-lg">
                        <span class="yellow--text mr-5">date:</span>
                        <span>{{details.lectureDetails[0].date | moment("L")}}</span>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header >
                    <h3 class="text-capitalize info--text  text-center  font-weight-bold">user Details</h3>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="5" class="ma-1 purple darken-4 white--text rounded-lg">
                        <span class="yellow--text mr-5">name:</span>
                        <span>{{details.lectureDetails[0].studentId.name}}</span>
                      </v-col>
                      <v-col cols="5" class="ma-1 purple darken-4 white--text rounded-lg">
                        <span class="yellow--text mr-5">phone:</span>
                        <span>{{details.lectureDetails[0].studentId.phone}}</span>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Functions from "../../../server/api";
export default {
  name: "setailDetails",
  data() {
    return {
      serialId: "3223.9224361257325",
      details: null,
      dialog: false,
      meen: "serialId",
      items: ["serialId", "CardId"],
    };
  },
  async mounted() {},
  methods: {
    async serialDetails() {
      try {
        let data;

        if (this.meen == "serialId") {
          data = {
            serialId: this.serialId,
          };
        } else {
          data = {
            cardId: this.serialId,
          };
        }
        const res = await Functions.serailDetails(data);
        console.log(res);
        this.details = res.data.serial;
        this.dialog = true;
        console.log(this.details);
      } catch (error) {
        this.errors = 'your details is wrong '
          this.alert= true
        setTimeout(() => {
          this.alert= false
          this.errors = null;
        }, 5000);
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>