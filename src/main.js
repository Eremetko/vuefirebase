import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import i18n from './i18n';
import store from './store';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Vuelidate from 'vuelidate';
import './registerServiceWorker';
import './indexdb';
Vue.use(Vuelidate)

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APPID
};

firebase.initializeApp(firebaseConfig);

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(user => {
    store.dispatch('auth/authStatus', user);
    const requireAuth = to.matched.some(record => record.meta.requireAuth);
    if (requireAuth && !user) next('login')
    else if (!requireAuth && user) next('home')
    else next();
  })
})

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
