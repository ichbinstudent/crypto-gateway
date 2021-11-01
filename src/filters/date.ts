import Vue from 'vue'
import moment, { Moment } from 'moment'

export default () => {
  Vue.filter('date', (value: Moment) => {
    // if (value.isSame(moment(), 'day')) {
    //   return 'today'
    // } else
    if (value.isBefore(moment().weeks(-1))) {
      return value.format('L')
    } else {
      return value.fromNow()
    }
  })
}
