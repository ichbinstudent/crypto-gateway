<template>
  <div class="py-4 px-0">
    <v-card class="px-0 sm:px-2 py-2 mx-auto rounded-lg" flat max-width="600">
      <v-card-title class="mb-4">
        <v-btn-toggle color="primary" class="mx-auto" v-model="view" mandatory denseq rounded>
          <v-btn value="signin" v-text="$t('auth.signInBtn')"/>
          <v-btn value="signup" v-text="$t('auth.signUpBtn')"/>
        </v-btn-toggle>
      </v-card-title>
      <v-card-text v-if="view === 'signin'">
        <v-form @submit.prevent="signIn" v-model="signin_valid">
          <VueTelInputVuetify
            outlined
            :label="$t('auth.phone')"
            :rules="[rules.required]"
            v-model="credentials.phone"
            text-field-classes="rounded-lg"
            select-classes="rounded-lg mr-1"
            :preferred-countries="['cm', 'de', 'fr']"
            :valid-characters-only="true"
            @input="onNumberSignInInput"
          />
          <v-text-field
            v-model="credentials.password"
            :label="$t('auth.password')"
            type="password"
            outlined
            class="rounded-lg"
            :rules="[rules.required]"
          />

          <v-btn block
                 color="primary"
                 large
                 type="submit"
                 :disabled="!signin_valid"
                 :loading="loading"
                 v-text="$t('auth.signInBtn')"
          />
          <v-btn block
                 color="accent"
                 large
                 @click="signInUsingDemoAccount"
                 :loading="loading"
                 v-text="$t('auth.signInUsingDemoAccountBtn')"
                 class="mt-2"
          />

          <div class="text-overline text-uppercase mt-3 text-center">
            <v-responsive max-width="280" class="mx-auto">
              <span v-html="$t('auth.termsAndPrivacySignIn')"/>
            </v-responsive>
          </div>
        </v-form>
      </v-card-text>

      <v-card-text v-else-if="view === 'signup'">
        <v-form @submit.prevent="signUp" v-model="signup_valid" v-if="signupStep === 0">
          <v-text-field
            type="text"
            v-model="new_credentials.first_name"
            :rules="[rules.required]"
            outlined
            class="rounded-lg"
            :label="$t('auth.firstName')"
            :aria-label="$t('auth.firstName')"
          />
          <v-text-field
            type="text"
            v-model="new_credentials.last_name"
            :rules="[rules.required]"
            aria-label="Last Name"
            outlined
            class="rounded-lg"
            :label="$t('auth.lastName')"
            :aria-label="$t('auth.lastName')"
          />
          <VueTelInputVuetify
            outlined
            :rules="[rules.required]"
            :label="$t('auth.phone')"
            :aria-label="$t('auth.phone')"
            v-model="new_credentials.phone"
            select-classes="rounded-lg mr-1"
            text-field-classes="rounded-lg"
            :preferred-countries="['cm', 'de', 'fr']"
            :valid-characters-only="true"
            @input="onNumberSignUpInput"
          />
          <v-text-field
            v-model="new_credentials.password"
            :label="$t('auth.password')"
            :aria-label="$t('auth.password')"
            type="password"
            outlined
            class="rounded-lg"
            :rules="[rules.required, rules.min]"
          />
          <v-text-field
            v-model="new_credentials.password2"
            :label="$t('auth.repeatPassword')"
            :aria-label="$t('auth.repeatPassword')"
            type="password"
            outlined
            class="rounded-lg"
            :rules="[rules.required, rules.min, same_password_rule]"
          />
          <v-checkbox v-model="new_credentials.terms_and_privacy" dense aria-required="true">
            <template #label>
              <div v-html="$t('auth.termsAndPrivacySignUp')"/>
            </template>
          </v-checkbox>
          <v-btn block class="primary" large type="submit" :disabled="!signup_valid" v-text="$t('auth.signUpBtn')"/>
        </v-form>
        <v-form @submit.prevent="smsVerification" v-model="signup2_valid" v-else-if="signupStep === 1">
          <v-text-field
            v-model="smsCode"
            label="SMS verification code"
            outlined
            class="rounded-lg"
            :rules="[rules.required]"
          />
          <v-btn block color="primary" class="mb-2" large type="submit" :disabled="!signup2_valid" :loading="loading">
            Verify
          </v-btn>
          <v-btn block text color="error" @click="cancelVerification">Cancel</v-btn>
        </v-form>
      </v-card-text>

      <div class="text-center mt-2 text-body-2">
        <nuxt-link :to="localeLocation({name: 'auth-reset'})">
          {{ $t("auth.forgotPassword") }}
        </nuxt-link>
      </div>

    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Snack} from "~/types/interfaces";
import rules from "./rules";
import {mapGetters} from "vuex";
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue";
import {MetaInfo} from "vue-meta/types";

interface Phone {
  number: any;
  valid: boolean;
  country: any;
}

export default Vue.extend({
  components: {VueTelInputVuetify},
  auth: "guest",
  data() {
    return {
      rules,
      loading: false,
      view: "signin",
      signup_valid: false,
      signup2_valid: false,
      signin_valid: false,
      smsCode: "",
      new_credentials: {
        first_name: "",
        last_name: "",
        phone: "",
        password: "",
        password2: "",
        terms_and_privacy: false,
        phone_valid: false
      },
      credentials: {
        phone: "",
        password: "",
        phone_valid: false
      }
    };
  },
  head(): MetaInfo {
    return {
      title: (this as any).view === "signin" ? this.$t("auth.signInBtn") : this.$t("auth.signUpBtn")
    } as MetaInfo;
  },
  computed: {
    ...mapGetters({
      signupPhone: "settings/signupPhone",
      signupStep: "settings/signupStep"
    })
  },
  methods: {
    onNumberSignInInput(_: string, {number}: Phone): void {
      this.credentials.phone = number.international;
    },
    onNumberSignUpInput(_: string, {number}: Phone): void {
      this.new_credentials.phone = number.international;
    },
    same_password_rule(v: String): string | boolean {
      return v === this.new_credentials.password ?? "Passwords have to match";
    },
    signIn(): void {
      const credentials = {
        username: this.credentials.phone.replaceAll(" ", ""),
        password: this.credentials.password
      };
      this.loading = true;
      this.$auth.loginWith("custom", {data: credentials})
        .then(() => {
          this.$store.dispatch("wallet/updateWallet")
          this.$router.push(this.localePath({name: 'wallet'}))
        })
        .catch(() => {
          this.$store.commit("snackbar/setSnack", {message: "Invalid credentials", color: "error", icon: "error"});
        })
        .finally(() => this.loading = false);
    },
    smsVerification(): void {
      this.loading = true;
      this.$axios.post("/auth/user/verify/", {
        phone: this.signupPhone,
        code: this.smsCode
      }).then(() => {
        this.$store.commit("snackbar/setSnack", {message: "Verification successful. You can log in now!"});
        this.$store.commit("settings/setSignupState", {step: 0, phone: ""});
        this.view = "signin";
      }).finally(() => this.loading = false);
    },
    signUp(): void {
      if (!this.new_credentials.terms_and_privacy) {
        this.$store.commit("snackbar/setSnack", {
          message: "Please accept the terms of service and our privacy policy.",
          color: "error"
        });
        return;
      }
      const credentials = {
        first_name: this.new_credentials.first_name,
        last_name: this.new_credentials.last_name,
        username: this.new_credentials.phone.replaceAll(" ", ""),
        password: this.new_credentials.password,
        privacy_policy: this.new_credentials.terms_and_privacy,
        term: this.new_credentials.terms_and_privacy
      };
      this.loading = true;
      this.$axios.post("/auth/user/", credentials)
        .then(() => {
          this.$store.commit("snackbar/setSnack", {message: "A verification code was sent to your phone."});
          // TODO: Fix if phone verification works (change step: 0 to step: 1
          this.$store.commit("settings/setSignupState", {step: 0, phone: credentials.username});
          // TODO: Remove after phone verification works
          this.$store.commit("snackbar/setSnack", {message: "Signup successful. You can log in now!"});
          this.credentials.phone = this.new_credentials.phone;
          this.view = "signin";
        })
        .catch(() => this.$store.commit("snackbar/setSnack", {
          message: "Something went wrong",
          color: "error",
          timeout: 0
        } as Snack))
        .finally(() => this.loading = false);
    },
    cancelVerification(): void {
      this.$store.commit("settings/setSignupState", {step: 0, phone: ""});
      this.view = "signin";
    },
    signInUsingDemoAccount(): void {
      this.credentials.phone = "+1234567890";
      this.credentials.password = "test1234!";
      this.signIn();
    }
  }
});
</script>
