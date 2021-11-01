<template>
  <v-container>
    <h2 class="text-2xl mb-2">Fiat</h2>
    <v-card v-for="item in wallets.fiat" :key="item.currency">
      <v-card-title>
        {{ item.description }}
      </v-card-title>
      <v-card-text> Amount: {{ item.amount }} </v-card-text>
    </v-card>
    <h2 class="text-2xl my-2">Crypto</h2>
    <v-card v-for="item in wallets.crypto" :key="item.currency">
      <v-card-title>
        {{ item.description }}
      </v-card-title>
      <v-card-text> Amount: {{ item.amount }} </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    wallets: {
      crypto: [
        {
          currency: 'BTC',
          description: 'Bitcoin',
          amount: 0.003123,
        },
      ],
      fiat: [
        {
          currency: 'EUR',
          description: 'Euro',
          amount: 113.31,
        },
      ],
    },
  }),
}
</script>
