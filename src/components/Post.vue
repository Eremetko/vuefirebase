<template>
    <v-card
      class="mb-4"
      max-width="400px"
    >
      <img v-lazyload class="img" :data-src="srcImage">
      <v-card-title>{{post.title}}</v-card-title>
      <v-card-title>{{post.description}}</v-card-title>
      <v-card-subtitle class="text-right">{{post.date}}</v-card-subtitle>
    </v-card>
</template>

<script>

import lazyload from '../derictives/lazyload';

export default {
  props:{
    post: {
      type: Object,
      required: true
    },
    srcImage: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  directives: {
    lazyload
  }
}
</script>

<style>
  .img {
    height: 200px;
  }
</style>
