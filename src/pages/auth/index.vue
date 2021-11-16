<template>
  <v-container class="py-4">
    <v-card class="pa-2 mx-auto rounded-lg" flat max-width="600">
      <v-card-title>
        <v-btn-toggle class="mx-auto" v-model="view" mandatory denseq rounded>
          <v-btn value="signin">Sign In</v-btn>
          <v-btn value="signup">Sign Up</v-btn>
        </v-btn-toggle>
      </v-card-title>
      <v-card-text v-if="view === 'signin'">
        <v-form @submit.prevent="signIn" v-model="signin_valid">
          <v-text-field
            type="phone"
            v-model="credentials.phone"
            label="Phone"
            outlined
            class="rounded-lg"
            :rules="[rules.required, rules.phoneMatch]"
          />
          <v-text-field
            v-model="credentials.password"
            label="Password"
            type="password"
            outlined
            class="rounded-lg"
            :rules="[rules.required]"
          />

          <v-btn block class="primary" large type="submit" :disabled="!signin_valid" :loading="loading">Sign In</v-btn>

          <div class="text-overline text-uppercase mt-3 text-center">
            <v-responsive max-width="280" class="mx-auto">
              By signing in, you agree to the
              <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a>
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
            aria-label="First Name"
            outlined
            class="rounded-lg"
            label="First name"
          />
          <v-text-field
            type="text"
            v-model="new_credentials.last_name"
            :rules="[rules.required]"
            aria-label="Last Name"
            outlined
            class="rounded-lg"
            label="Last name"
          />
          <v-text-field
            type="phone"
            v-model="new_credentials.phone"
            label="Phone"
            outlined
            class="rounded-lg"
            :rules="[rules.required, rules.phoneMatch]"
          />
          <v-text-field
            v-model="new_credentials.password"
            label="Password"
            type="password"
            outlined
            class="rounded-lg"
            :rules="[rules.required, rules.min]"
          />
          <v-text-field
            v-model="new_credentials.password2"
            label="Password again"
            type="password"
            outlined
            class="rounded-lg"
            :rules="[rules.required, rules.min, same_password_rule]"
          />
          <v-checkbox v-model="new_credentials.terms_and_privacy" dense aria-required="true">
            <template #label>
              <div>
                I have read and I agree to the <a
                class="font-semibold"
                href="https://www.iubenda.com/privacy-policy/72352797"
                target="_blank"
                rel="noopener noreferrer"
                @click.stop
              >Privacy Policy</a> and the
                <a
                  class="font-semibold"
                  href="https://www.iubenda.com/terms-and-conditions/72352797"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop
                >Terms and Conditions</a>.
              </div>
            </template>
          </v-checkbox>
          <v-btn block class="primary" large type="submit" :disabled="!signup_valid">Sign Up</v-btn>
        </v-form>
        <v-form @submit.prevent="smsVerification" v-model="signup2_valid" v-else-if="signupStep === 1">
          <v-text-field
            v-model="smsCode"
            label="SMS verification code"
            outlined
            class="rounded-lg"
            :rules="[rules.required]"
          />
          <v-btn block class="primary mb-2" large type="submit" :disabled="!signup2_valid" :loading="loading">Verify
          </v-btn>
          <v-btn block text color="error" @click="cancelVerification">Cancel</v-btn>
        </v-form>
      </v-card-text>

      <div class="text-center mt-2 text-body-2">
        <nuxt-link :to="localeLocation({name: 'auth-reset'})">
          Forgot your password?
        </nuxt-link>
      </div>

    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Snack } from "~/types/interfaces";
import rules from "./rules";
import { mapGetters } from "vuex";


export default Vue.extend({
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
        terms_and_privacy: false
      },
      credentials: {
        phone: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      signupPhone: "settings/signupPhone",
      signupStep: "settings/signupStep"
    })
  },
  methods: {
    same_password_rule(v: String): string | boolean {
      return v === this.new_credentials.password ?? "Passwords have to match";
    },
    signIn() {
      const credentials = {
        username: this.credentials.phone.replaceAll(" ", ""),
        password: this.credentials.password
      };
      this.loading = true;
      this.$auth.loginWith("custom", { data: credentials })
        .then(() => {
          window.setTimeout(() => {
            if (this.$auth.loggedIn && this.$route.name === 'auth')
              this.$router.push(this.localePath({name: 'wallet'}))
          }, 1000)
        })
        .catch(() => {
          this.$store.commit("snackbar/setSnack", { message: "Invalid credentials", color: "error", icon: "error" });
        })
        .finally(() => this.loading = false);
    },
    smsVerification() {
      this.loading = true;
      this.$axios.post("/auth/user/verify/", {
        phone: this.signupPhone,
        code: this.smsCode
      }).then(() => {
        this.$store.commit("snackbar/setSnack", { message: "Verification successful. You can log in now!" });
        this.$store.commit("settings/setSignupState", { step: 0, phone: "" });
        this.view = "signin";
      }).finally(() => this.loading = false);
    },
    signUp() {
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
        .then(response => {
          this.$store.commit("snackbar/setSnack", { message: "A verification code was sent to your phone." });
          // TODO: Fix if phone verification works (change step: 0 to step: 1
          this.$store.commit("settings/setSignupState", { step: 0, phone: credentials.username });
          // TODO: Remove after phone verification works
          this.$store.commit("snackbar/setSnack", { message: "Signup successful. You can log in now!" });
          this.credentials.phone = this.new_credentials.phone
          this.view = 'signin'
        })
        .catch(() => this.$store.commit("snackbar/setSnack", {
          message: "Something went wrong",
          color: "error",
          timeout: 0
        } as Snack))
        .finally(() => this.loading = false);
    },
    cancelVerification() {
      this.$store.commit("settings/setSignupState", { step: 0, phone: "" });
      this.view = "signin";
    }
  }
});
</script>
