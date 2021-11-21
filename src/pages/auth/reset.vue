<template>
  <v-container class="py-4">
    <h2 class="text-center text-h4 text-lg-h2 mb-2">{{ $t('auth.reset.resetYourPassword') }}</h2>
    <v-card class="pa-2 mx-auto rounded-lg" flat max-width="600">

      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="resetPassword"
        >
          <VueTelInputVuetify
            outlined
            :rules="[rules.required]"
            :label="$t('auth.phone')"
            :aria-label="$t('auth.phone')"
            select-classes="rounded-lg mr-1"
            text-field-classes="rounded-lg"
            :preferred-countries="['cm', 'de', 'fr']"
            :valid-characters-only="true"
            @input="onNumberInput"
          />
          <v-btn
            type="submit"
            :loading="loading"
            :disabled="!valid"
            color="primary"
            block
            large
            v-text="$t('auth.reset.reset')"
          />
        </v-form>

        <v-responsive class="text-center mt-2 text-body-2">
          <nuxt-link :to="localeLocation({name: 'auth'})">
            {{ $t('auth.reset.backToLogin') }}
          </nuxt-link>
        </v-responsive>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import rules from "~/pages/auth/rules";
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";

export default Vue.extend({
  components: { VueTelInputVuetify },
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
    onNumberInput (_: string, { number }: any) {
      this.username = number.international
    },
    resetPassword() {
      this.loading = true;
      this.$axios.post("/user/reset/", { username: this.username })
        .then(() => {
          this.$store.commit("snackbar/setSnack", {
            message: "E-mail with instructions to reset the password sent."
          });
          this.$router.push(this.localePath({ name: "auth-login" }));
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
