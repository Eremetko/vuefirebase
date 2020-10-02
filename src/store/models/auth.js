import {loginUser, signUpUser, signOutUser} from '../../services/auth';
import {LANGS, ADMIN, LOCAL} from '../../constant';
import i18n from '../../i18n';


const state = () => ({
  authUser: {
    currentUser: null,
    role: null,
    auth: false,
  },
  error: null,
  ADMIN,
  LANGS,
  LOCAL
})

const getters = {
  currentUserAuth: state => state.authUser.auth,
  isAdmin: state => {
    return state.authUser.role === state.ADMIN ? true : false;
  },
  getLangs: state => state.LANGS.lang,
  getError: state => state.error,
  getLocale: state => state.LOCAL.locale
}

const mutations = {
  setLocale (state, payload) {
    state.LOCAL.locale = payload;
    i18n.locale = state.LOCAL.locale;
  },
  setAuthUser (state, payload) {
    state.authUser.currentUser = payload.currentUse;
    state.authUser.role = payload.role;
  },
  setAuthStatus (state, payload) {
    state.authUser.auth = payload;
  },
  setError (state, payload){
    state.error = payload;
  }
}

const actions = {
  locale({commit}, locale) {
    commit('setLocale', locale);
  },
  login ({ commit }, user) {
    loginUser(user.username, user.password)
    .then(data => {
      commit('setAuthUser', data);
    })
    .catch(error => {
      commit('setError', error.code);
    })
  },
  signUp({ commit }, user) {
    signUpUser(user.username, user.password)
      .catch(error => {
        commit('setError', error.code);
    })
  },
  signOut({commit}) {
    commit('setAuthUser', signOutUser());
  },
  authStatus({commit}, user) {
    commit('setAuthStatus', user !== null);
    if (user) {
      commit('setAuthUser', {currentUser: user, role: null});
    } else {
      commit('setAuthUser', {user: null, role: null})
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
