import { ActionTree, GetterTree, MutationTree } from "vuex";
import { Transaction, Wallet } from "~/types/interfaces";
import Vue from "vue";
import { Decimal } from "decimal.js";
import { Coin } from "~/types/coingecko";
import moment from "moment";


export const state = () => ({
  wallet: {} as Wallet,
  transactions: [] as Transaction[],
  fetching: false
});

export const initialStateValue = state();
export type State = typeof initialStateValue

export const getters: GetterTree<State, State> = {
  wallet: (state: State): Wallet => state.wallet,
  transactions: (state: State): Transaction[] => state.transactions
};

export const mutations: MutationTree<State> = {
  setWallet(state: State, newWallet: Wallet) {
    Vue.set(state, "wallet", newWallet);
  },
  setTransactions(state: State, transactions: Transaction[]) {
    Vue.set(state, "transactions", transactions);
  }
};

function addIfMissing(wallet: Wallet, transaction: Transaction, coin_in: Coin, coin_out: Coin) {
  if (!wallet[transaction.currency_in]) {
    wallet[transaction.currency_in] = {
      amount: new Decimal(transaction.amount_in).neg(),
      coin: coin_in
    };
  } else {
    wallet[transaction.currency_in].amount =
      wallet[transaction.currency_in].amount.sub(new Decimal(transaction.amount_in));
  }

  if (!wallet[transaction.currency_out]) {
    wallet[transaction.currency_out] = {
      amount: new Decimal(transaction.amount_out),
      coin: coin_out
    };
  } else {
    wallet[transaction.currency_out].amount =
      wallet[transaction.currency_out].amount.add(new Decimal(transaction.amount_out));
  }
}

export const actions: ActionTree<State, State> = {
  updateWallet(context): Promise<Wallet> {
    context.commit("addFetching", "updateWallet", { root: true });
    return new Promise<Wallet>((resolve, reject) => {
      this.$axios.get("/wallet/transaction/")
        .then(({ data }: { data: Transaction[] }) => {
          const transactions = data.map((element: Transaction) => {
            element.timestamp = moment(element.timestamp);
            element.amount_out = new Decimal(element.amount_out);
            element.amount_in = new Decimal(element.amount_in);
            element.fees = new Decimal(element.fees);
            return element;
          });
          context.commit("setTransactions", transactions);

          let wallet = {} as Wallet;
          transactions.filter((transaction: Transaction) => transaction.status == "COMPLETED").forEach((transaction: Transaction) => {
            addIfMissing(wallet,
              transaction,
              context.rootGetters["coins/coins"].find((coin: Coin) => coin.id === transaction.currency_in),
              context.rootGetters["coins/coins"].find((coin: Coin) => coin.id === transaction.currency_out)
            );

            // if (!!wallet[transaction.currency_in]) {
            //   wallet[transaction.currency_in].amount.add(new Decimal(transaction.amount_in));
            // } else {
            //   wallet[transaction.currency_in] = {
            //     amount: new Decimal(transaction.amount_in),
            //     coin: context.rootGetters["coins/coins"].find((coin: Coin) => coin.id === transaction.currency_in)
            //   };
            // }
            // if (!!wallet[transaction.currency_out]) {
            //   wallet[transaction.currency_out].amount.add(new Decimal(transaction.amount_out));
            // } else {
            //   wallet[transaction.currency_out] = {
            //     amount: new Decimal(transaction.amount_out),
            //     coin: context.rootGetters["coins/coins"].find((coin: Coin) => coin.id === transaction.currency_out)
            //   };
            // }
          });
          context.commit("setWallet", wallet);
          return resolve(wallet);
        })
        .catch(e => reject(e))
        .finally(() => context.commit("removeFetching", "updateWallet", { root: true }));
    });
  }
};
