import Vue from 'vue';
import Vuex from 'vuex';
import auth from './models/auth';
import users from './models/users';
import posts from './models/posts';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    users,
    posts
  }
})
