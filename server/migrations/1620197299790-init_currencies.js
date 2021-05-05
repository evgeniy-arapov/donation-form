require('../models/currency')

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
  const initialCurrencies = [
    {
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      rate: 1
    },
    {
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      rate: 0.897597
    },
    {
      name: 'British Pound',
      code: 'GBP',
      symbol: '£',
      rate: 0.81755
    },
    {
      name: 'Russian Ruble',
      code: 'RUB',
      symbol: '₽',
      rate: 63.461993
    }
  ]

  const promises = []
  initialCurrencies.forEach(currency => {
    promises.push(this('Currency').create(currency))
  })

  await Promise.all(promises)
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
  await this('Currency').collection.drop()
}

module.exports = { up, down };
