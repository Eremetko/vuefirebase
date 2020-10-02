<template>
  <v-container>
      <NewPost :admin="isAdmin" @addNewPost="post"/>
    <div class="d-flex align-start justify-space-around flex-wrap">
      <template v-for="(post, index) in postsList">
        <MyPost :key="index" :post="post" :srcImage="srcImage" />
      </template>
    </div>
  </v-container>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import CreatePost from './NewPost';

import Post from './Post'
export default {
  components: {
    MyPost: Post,
    NewPost: CreatePost
  },
  computed: {
    ...mapGetters('auth', {
      isAdmin: 'isAdmin'
    }),
    ...mapGetters('posts', {
      postsList: 'getPostsList',
      getOnline: 'getOnline',
      key: 'getKey',
      srcImage: 'getUrlImage'
    })
  },
  methods: {
    ...mapActions('posts', {
      savePostOnline: 'addNewPostOnline',
      savePostOffline: 'addNewPostOffline',
      loadPosts: 'loadPosts',
      onlineOrOffline: 'onlineOrOffline',
      postsFromFirebase: 'postsFromFirebase',
      getImageUrlFromFirebase: 'getImageUrlFromFirebase'
    }),
    post(post){
      this.savePostOnline(post);
    },
    lazyLoadFirebase() {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.loadPosts(this.key);
        }
      }
    },
  },
  created() {
    this.postsFromFirebase();
    this.getImageUrlFromFirebase();
  },
  mounted() {
    this.lazyLoadFirebase();
  }
}
</script>
