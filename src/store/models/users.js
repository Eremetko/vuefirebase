import {Users} from '../../services/getUsers';

const state = () => ({
  usersList: []
})

const getters = {
  getUsersList: state => {
    return state.usersList;
  }
}

const mutations = {
  setUsersList(state, payload) {
    state.usersList = payload;
  }
}

const actions = {
  async usersFromFirebase ({commit}) {
    const users = await Users();
    commit('setUsersList', users);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
