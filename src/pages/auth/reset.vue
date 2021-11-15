<template>
  <v-container class="py-4">
    <h2 class="text-center text-h4 text-lg-h2 mb-2">Reset your password</h2>
    <v-card class="pa-2 mx-auto rounded-lg" flat max-width="600">

      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="resetPassword"
        >
          <v-text-field
            v-model="username"
            type="email"
            name="username"
            label="Phone"
            outlined
            aria-label="Phone"
            :rules="[rules.required, rules.emailMatch]"
          />
          <v-btn
            type="submit"
            :loading="loading"
            :disabled="!valid"
            block
            large
          >
            Reset Password
          </v-btn>
        </v-form>

        <v-responsive class="text-center mt-2 text-body-2">
          <nuxt-link :to="localeLocation({name: 'auth'})">
            Go back to login
          </nuxt-link>
        </v-responsive>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import rules from "~/pages/auth/rules";

export default Vue.extend({
  name: "ResetPassword",
  auth: "guest",
  data() {
    return {
      valid: false,
      username: "",
      loading: false,
      rules
    };
  },
  head: {
    title: "Reset Password"
  },
  methods: {
    resetPassword() {
      this.loading = true;
      this.$axios.post("/user/reset/", { username: this.username })
        .then(() => {
          this.$store.commit("snackbar/setSnack", {
            message: "E-mail with instructions to reset the password sent."
          });
          this.$router.push(({ name: "auth-login" }));
        })
        .catch(() =>
          this.$store.commit("snackbar/setSnack", {
            message: "Invalid email or password.",
            color: "error",
            icon: "error"
          })
        ).finally(() => this.loading = false);
    }
  }
});
</script>
