import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Acceuil:{
            screens:{
              DashboardScreen: 'dashboard'
            }
          },
          Profil:{
            screens:{
              ProfilScreen: 'profil'
            }
          },
          Comptes:{
            screens:{
              ProfilScreen: 'comptes'
            }
          },
          Factures:{
            screens:{
              FacturesScreen: 'factures'
            }
          }
        },
      },
      NotFound: '*',
    },
  },
};
