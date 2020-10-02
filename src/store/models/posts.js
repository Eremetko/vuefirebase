import {firstPostsOffline, firstPostsOnline, loadMorePosts} from '../../services/getPosts';
import {savePostOffline, savePostOnline} from '../../services/savePost';
import {imageUrl} from '../../services/getImage';
import {addDataIndexedDb} from '../../indexdb';

const state = () => ({
  postsList: {
    posts: [],
    key: null
  },
  isOnline: null,
  urlImage: null
})

const getters = {

  getOnline: state => {
    return state.isOnline;
  },

  getPostsList: state => {
    return state.postsList.posts;
  },

  getUrlImage: state => {
    return state.urlImage;
  },

  getKey: state => {
    return state.postsList.key;
  }
}

const mutations = {

  setStatusEth(state, payload) {
    state.isOnline = payload;
  },

  addPost (state, payload) {
    state.postsList.posts.unshift(payload);
  },

  loadPosts (state, payload) {
    let posts = state.postsList.posts.concat(payload.posts);
    const key = payload.key;
    state.postsList.posts = posts;
    state.postsList.key = key;
    addDataIndexedDb.addPosts({id: 'posts', posts, key});
  },

  getAllPosts (state, payload) {
    let posts = state.postsList.posts.concat(payload.posts);
    const key = payload.key;
    state.postsList.posts = posts;
    state.postsList.key = key;
    addDataIndexedDb.addPosts({id: 'posts', posts, key});
  },

  setImageUrl (state, payload) {
    state.urlImage = payload;
  }
}

const actions = {

  onlineOrOffline ({commit}, status) {
    commit('setStatusEth', status);
  },
  
  async postsFromFirebase ({commit, state}) {
    if (state.isOnline) {
      let postsAndKey = await firstPostsOnline();
      commit('getAllPosts', postsAndKey);
    } else {
      let postsAndKey = await firstPostsOffline();
      commit('getAllPosts', postsAndKey)
    }
  },

  async loadPosts ({commit}, key) {
    let postsAndKey = await loadMorePosts(key);
    commit('loadPosts', postsAndKey);
  },

  addNewPostOnline ({commit, state}, newPost) {
    if(state.isOnline){
      savePostOnline(newPost);
    } else {
      addDataIndexedDb.addNewPost({id: 'newPost', newPost})
    }
    commit('addPost', newPost);
  },

  addNewPostOffline () {
    savePostOffline();
  },

  async getImageUrlFromFirebase ({commit}) {
    const url = await imageUrl();
    commit('setImageUrl', url);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
