export default {
  auth: {
    firstName: "First name",
    forgotPassword: "Forgot your password?",
    lastName: "Last name",
    password: "Password",
    phone: "Phone number",
    repeatPassword: "Repeat the password",
    reset: {
      backToLogin: "Go back to login",
      reset: "Reset",
      resetYourPassword: "Reset your password"
    },
    signInBtn: "Sign in",
    signUpBtn: "Sign up",
    termsAndPrivacySignIn: "By signing in, you agree to the <a class=\"font-semibold\" href=\"https://www.iubenda.com/privacy-policy/72352797\" target=\"_blank\" rel=\"noopener noreferrer\">Privacy Policy</a> and the <a class=\"font-semibold\" href=\"https://www.iubenda.com/terms-and-conditions/72352797\" target=\"_blank\" rel=\"noopener noreferrer\">Terms and Conditions</a>",
    termsAndPrivacySignUp: "I have read and I agree to the <a class=\"font-semibold\" href=\"https://www.iubenda.com/privacy-policy/72352797\" target=\"_blank\" rel=\"noopener noreferrer\" >Privacy Policy</a> and the <a class=\"font-semibold\" href=\"https://www.iubenda.com/terms-and-conditions/72352797\" target=\"_blank\" rel=\"noopener noreferrer\">Terms and Conditions</a>."
  },
  components: {
    wallet: {
      CryptoChart: {
        day: "D",
        year: "Y"
      },
      SwapConfirmationDialog: {
        confirm: "Confirm",
        fees: "Fees:",
        offerExpired: "Offer has expired. Go back and try again.",
        offerValid: "This offer is valid for {seconds} seconds.",
        swapAmount: "Swap amount:",
        title: "Confirm Swap",
        totalReceived: "Total received:"
      },
      TransactionList: {
        NoTransactions: "No transactions yet."
      }
    }
  },
  defaultLayout: {
    settings: "Settings",
    wallet: "Wallet"
  },
  settings: {
    currency: "Currency",
    darkMode: "Dark Mode",
    language: "Language",
    phone: "Phone:",
    signOut: "Sign out"
  },
  wallet: {
    _currency: {
      amount: "Montant à déposer",
      cancel: "Cancel",
      deposit: "Dépôt",
      depositDetails: "Détails du dépôt",
      depositHelpText: "Veuillez saisir le montant que vous souhaitez déposer ci-dessous afin que nous puissions traiter votre transaction plus rapidement.",
      depositMessages: {
        xaf: {
          depositAddresses: [
            {
              text: "Orange",
              value: "+XXX XXXX XXXXXX"
            },
            {
              text: "MTN",
              value: "+XXX XXXX XXXXXX"
            }
          ],
          text: "Veuillez envoyer l'argent sur le bon compte momo ci-dessous."
        }
      },
      depositNotAvailable: "Le dépôt de cette monnaie n'est pas disponible.",
      submit: "Submit",
      transactions: "Transactions",
      weWillProcess: "Nous traiterons votre transaction dans les 24 heures.",
      withdraw: "Withdraw",
      withdrawAddress: "The address of your wallet",
      withdrawAmount: "Amount to withdraw",
      withdrawDetails: "Withdrawal Information",
      withdrawFiat: "The money will be sent to the MOMO account of the phone number you signed up with.",
      withdrawNetwork: "The network to use"
    },
    crypto: "Crypto",
    fiat: "Fiat",
    wallet: "Wallet"
  }
} ;