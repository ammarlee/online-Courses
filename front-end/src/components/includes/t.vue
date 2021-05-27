<template>
    <div>
     <div v-for="(question ,i) in exam.questions " :key="i">
            <v-divider></v-divider>
            <div>
              <h2 class="text-capitalize pl-3">{{i}} - {{question.QuestionId.question}}</h2>
              <div class="pl-2">
                <v-radio-group row v-model="question.QuestionId.groupAnswer">
                  <v-radio
                    v-for="(answer ,n) in question.QuestionId.answers "
                    :key="n"
                    :label="answer.a"
                    :value="answer._id"
                    :name="answer._id"
                  ></v-radio>
                </v-radio-group>
              </div>
              <h2 class="green--text text-center" :id="'text'+question.QuestionId.groupAnswer"></h2>
            </div>
          </div>
    </div>
</template>

<script>
    export default {
        components: {
            New,
        },
        mounted () {
            ;
        },
        beforeEnter(to, from, next) {
            next();
        },
        beforeEnter(to, from, next) {
            next();
        },
        created () {
            ;
        },
        data() {
            return {
                key: value
            }
        },
        methods: {
            name() {
                
            }
        },
        computed: {
            name() {
                return this.data 
            }
        },
        watch: {
            data(newValue, oldValue) {
                
            }
        },

    }
</script>
<script>
    export default {
        
    }
</script>

<style lang="stylus" scoped>

</style>

<style lang="scss" scoped>

</style>