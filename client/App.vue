<template>
  <div id="app">
    <b-container>
      <DonationForm />
    </b-container>
  </div>
</template>

<script>
import Vue from 'vue'
import DonationForm from '@/modules/DonationForm/index.vue'

export default Vue.extend({
  components: {
    DonationForm
  }
})
</script>

<style lang="scss">
  body, #app {
    min-height: 100vh;
  }

  #app {
    display: flex;
    flex-direction: column;
  }
</style>
