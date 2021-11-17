<template>
  <div>
    <v-text-field>
      <template #prepend-inner>
        <v-select width="20" :items="countryCodes" dense hide-details v-model="countryCode">
        </v-select>
      </template>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data () {
    return {
      countryCode: '237',
      countryCodes: ['237', '49']
    }
  }
})
</script>
