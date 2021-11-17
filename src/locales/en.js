export default {
  wallet: {
    _currency: {
      amount: "Amount to deposit",
      deposit: "Deposit",
      depositNotAvailable: "Depositing this currency is not available.",
      weWillProcess: "We will process you transaction withing 24 hours.",
      depositDetails: "Deposit Details",
      depositHelpText: "Please enter the amount you want to deposit below so we can process your transaction faster.",
      depositMessages: {
        xaf: {
          text: "Please send the money to the right momo account below.",
          depositAddresses: [
            { text: "Orange", value: "+XXX XXXX XXXXXX" },
            { text: "MTN", value: "+XXX XXXX XXXXXX" }
          ]
        }
      },

      withdraw: "Withdraw",
      withdrawDetails: "Withdrawal Information",
      withdrawAmount: "Amount to withdraw",
      withdrawAddress: "The address of your wallet",
      withdrawNetwork: "The network to use",
      withdrawFiat: "The money will be sent to the MOMO account of the phone number you signed up with.",

      submit: "Submit",
      cancel: "Cancel",
      transactions: "Transactions"
    }
  },

  settings: {
    currency: "Currency",
    language: "Language",
    phone: "Phone:",
    darkMode: "Dark Mode",
    signOut: "Sign out"
  },

  auth: {
    termsAndPrivacySignIn: 'By signing in, you agree to the <a\n' +
      'class="font-semibold"\n' +
      'href="https://www.iubenda.com/privacy-policy/72352797"\n' +
      'target="_blank" rel="noopener noreferrer">Privacy Policy</a> and the\n' +
      '<a class="font-semibold" href="https://www.iubenda.com/terms-and-conditions/72352797"\n' +
      'target="_blank" rel="noopener noreferrer">Terms and Conditions</a>.',
    termsAndPrivacySignUp: 'I have read and I agree to the <a\n' +
      'class="font-semibold" href="https://www.iubenda.com/privacy-policy/72352797"\n' +
      'target="_blank" rel="noopener noreferrer"\n' +
      '>Privacy Policy</a> and the\n' +
      '<a class="font-semibold"\n' +
      'href="https://www.iubenda.com/terms-and-conditions/72352797"\n' +
      'target="_blank" rel="noopener noreferrer"\n' +
      '>Terms and Conditions</a>.',
    forgotPassword: 'Forgot your password?',

    firstName: 'First name',
    lastName: 'Last name',
    phone: 'Phone number',
    password: 'Password',
    repeatPassword: 'Repeat the password',
    signInBtn: 'Sign in',
    signUpBtn: 'Sign up',

  },

  components: {
    wallet: {
      TransactionList: {
        NoTransactions: "No transactions yet."
      }
    }
  }
};
