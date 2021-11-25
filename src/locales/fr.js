export default {
  auth: {
    firstName: "Prénom",
    forgotPassword: "Mot de passe oublié ?",
    lastName: "Nom",
    password: "Mot de passe",
    phone: "Numéro de téléphone",
    repeatPassword: "Répéter le mot de passe",
    reset: {
      backToLogin: "Retourner à la connexion",
      reset: "Réinitialiser",
      resetYourPassword: "Réinitialisez votre mot de passe"
    },
    signInBtn: "Se connecter",
    signUpBtn: "S'inscrire",
    termsAndPrivacySignIn: "En vous connectant, vous acceptez la <a class=\"font-semibold\" href=\"https://www.iubenda.com/privacy-policy/72352797\" target=\"_blank\" rel=\"noopener noreferrer\">Politique de confidentialité</a> et les <a class=\"font-semibold\" href=\"https://www.iubenda.com/terms-and-conditions/72352797\" target=\"_blank\" rel=\"noopener noreferrer\">Termes et conditions</a>.",
    termsAndPrivacySignUp: "J'ai lu et j'accepte la <a class=\"font-semibold\" href=\"https://www.iubenda.com/privacy-policy/72352797\" target=\"_blank\" rel=\"noopener noreferrer\" >Politique de confidentialité</a> et les <a class=\"font-semibold\" href=\"https://www.iubenda.com/terms-and-conditions/72352797\" target=\"_blank\" rel=\"noopener noreferrer\">Termes et conditions</a>."
  },
  components: {
    wallet: {
      CryptoChart: {
        day: "J",
        year: "A"
      },
      SwapConfirmationDialog: {
        confirm: "Confirmer",
        fees: "Frais :",
        offerExpired: "L'offre a expiré. Retournez-y et réessayez.",
        offerValid: "Cette offre est valable pendant {seconds} secondes.",
        swapAmount: "Montant du swap :",
        title: "Confirmer l'échange",
        totalReceived: "Total reçu :"
      },
      TransactionList: {
        NoTransactions: "Aucune transaction pour le moment."
      }
    }
  },
  defaultLayout: {
    settings: "Paramètres",
    wallet: "Portefeuille"
  },
  settings: {
    currency: "Devise",
    darkMode: "Mode sombre",
    language: "Langue",
    phone: "Numéro de téléphone :",
    signOut: "Se déconnecter"
  },
  wallet: {
    _currency: {
      amount: "Montant à déposer",
      cancel: "Annuler",
      deposit: "Dépôt",
      depositDetails: "Détails du dépôt",
      depositHelpText: "Veuillez saisir le montant que vous souhaitez déposer ci-dessous afin que nous puissions traiter votre transaction plus rapidement.",
      depositMessages: {
        xaf: {
          depositAddresses: [
            {
              text: "Orange",
              value: "+237 691 882516"
            },
            {
              text: "MTN",
              value: "+237 676 517853"
            }
          ],
          text: "Veuillez envoyer l'argent sur le bon compte momo ci-dessous."
        }
      },
      depositNotAvailable: "Le dépôt de cette monnaie n'est pas disponible.",
      submit: "Envoyer",
      transactions: "Transactions",
      weWillProcess: "Nous traiterons votre transaction dans les 24 heures.",
      withdraw: "Retirer",
      withdrawAddress: "L'adresse de votre portefeuille",
      withdrawAmount: "Montant à retirer",
      withdrawDetails: "Informations sur les retraits",
      withdrawFiat: "L'argent sera envoyé sur le compte MOMO du numéro de téléphone avec lequel vous vous êtes inscrit.",
      withdrawNetwork: "Le réseau à utiliser"
    },
    crypto: "Crypto",
    fiat: "Fiat",
    wallet: "Portefeuille"
  }
} ;