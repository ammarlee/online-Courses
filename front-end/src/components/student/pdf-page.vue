<template>
  <div>
    <h2>helllo {{id}}</h2>
    <div >
      <pdf src="exame_6060e3a08bee5e0b4cd80021.pdf"></pdf>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  components: {
    pdf,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>