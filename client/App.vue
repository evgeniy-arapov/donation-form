<template>
  <div id="app">
    <b-container>
      <div class="donation-wrapper">
        <DonationForm />
      </div>
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

    .container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  }

  .donation-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
</style>
