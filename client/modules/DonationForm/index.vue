<template>
  <b-card class="donation-form" body-class="p-2">
    <template v-if="!error">
      <b-row no-gutters>
        <b-col
          cols="4"
          v-for="preset in presetsForSelectedCurrency"
          :key="preset"
          class="mb-2 p-1 donation-form__button-group"
        >
          <b-btn
            @click="onPresetClick(preset)"
            :variant="preset === suggestion ? 'primary' : 'outline-primary'"
            class="w-100"
          >
            {{ selectedCurrency.symbol }} {{ preset | formatNumber }}
          </b-btn>
        </b-col>
      </b-row>

      <b-form class="w-100 p-1" @submit.prevent="onFormSubmit">
        <div class="mb-3 donation-form__input">
          <b-input-group>
            <template #prepend>
              <b-input-group-text>{{ selectedCurrency.symbol }}</b-input-group-text>
            </template>

            <b-form-input
              v-model="suggestion"
              type="number"
              number
              @keypress="suggestionPrevent"
            />

            <template #append>
              <b-dropdown :text="selectedCurrency.code || 'Currency'" variant="outline-secondary">
                <b-dropdown-item
                  v-for="currency in currencies"
                  :key="currency.code"
                  :disabled="currency === selectedCurrency"
                  @click="changeCurrency(currency)"
                >
                  {{ currency.code }}
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-input-group>
        </div>

        <div class="donation-form__actions">
          <b-btn
            class="text-uppercase w-100"
            variant="primary"
            type="submit"
          >
            Donate
          </b-btn>
        </div>
      </b-form>
    </template>

    <template v-else>
      Something went wrong. No data to display.
    </template>

    <b-overlay :show="isLoading" no-wrap/>
  </b-card>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import store from './store'

export default Vue.extend({
  store,

  filters: {
    formatNumber (number) {
      return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0
      }).format(number)
    }
  },

  data: () => ({
    presets: [40, 100, 200, 1000, 2500, 5000],
    suggestion: 40,

    selectedCurrency: {
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      rate: 1
    },

    isLoading: true,
    error: false
  }),

  async created () {
    try {
      this.isLoading = true
      await this.getCurrencies()
      this.selectedCurrency = this.currencies[0]
    } catch (err) {
      this.error = err
      console.error(err)
      this.$bvToast.toast('Something went wrong.', {
        variant: 'danger'
      })
    } finally {
      this.isLoading = false
    }
  },

  computed: {
    ...mapState(['currencies']),

    presetsForSelectedCurrency () {
      if (!this.selectedCurrency) return this.presets

      return this.presets.map(el => {
        const convertedPreset = Math.round(el * this.selectedCurrency.rate)

        const prettyRound = num => {
          if (num > 1000) {
            return Math.round(num / 500) * 500
          }

          if (num > 500) {
            return Math.round(num / 100) * 100
          }

          if (num > 150) {
            return Math.round(num / 50) * 50
          }

          if (num > 10) {
            return Math.round(num / 10) * 10
          }

          return Math.round(num)
        }

        if (convertedPreset < 10000) {
          return prettyRound(convertedPreset)
        } else {
          const numberOfDigits = convertedPreset.toString().length
          const highClassLength = numberOfDigits % 3 || 3
          const highClass = convertedPreset.toString().slice(0, highClassLength)
          return prettyRound(highClass) * (10 ** (numberOfDigits - highClassLength))
        }
      })
    }
  },

  methods: {
    ...mapActions(['getCurrencies', 'donate']),

    onPresetClick (preset) {
      this.suggestion = preset
    },

    changeCurrency (currency) {
      const indexOfPreset = this.presetsForSelectedCurrency.findIndex(el => el === this.suggestion)

      if (indexOfPreset === -1) {
        const usd = Math.round(this.suggestion / this.selectedCurrency.rate)
        this.suggestion = Math.round(usd * currency.rate)
        this.selectedCurrency = currency
      } else {
        this.selectedCurrency = currency
        this.suggestion = this.presetsForSelectedCurrency[indexOfPreset]
      }
    },

    suggestionPrevent (event) {
      if (Number.isInteger(+event.key)) return true
      event.preventDefault()
      return false
    },

    async onFormSubmit() {
      try {
        this.isLoading = true
        await this.donate({
          amount: this.suggestion,
          currencyCode: this.selectedCurrency.code
        })
        this.$bvToast.toast('Thank you for your donation!', {
          title: 'Success',
          variant: 'success'
        })
      } catch (err) {
        console.error(err)
        this.$bvToast.toast('Something went wrong.', {
          variant: 'danger'
        })
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.donation-form {
  width: 320px;
}

.donation-form__button-group {
  .btn {
    font-size: 0.8em;
  }
}
</style>
