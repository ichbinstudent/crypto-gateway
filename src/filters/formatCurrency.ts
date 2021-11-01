import Vue from 'vue'

export default () => {
  Vue.filter('formatCurrency', (value: number | string, symbol: string) => {
    if (typeof value == 'string') {
      value = Number.parseFloat(value)
    }
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: symbol,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })

    if (value === 0) {
      return '0'
    }

    return formatter.format(value)
  })
}
