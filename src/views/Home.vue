<template>
    <v-card>
      <v-tabs
        v-model="tab"
        grow>
        <v-tab>
          {{$t('tab2')}}
        </v-tab>
        <v-tab>
          {{$t('tab1')}}
        </v-tab>
      </v-tabs>
      <v-tabs-items
      v-model="tab">
        <v-tab-item>
          <Posts/>
        </v-tab-item>
        <v-tab-item>
          <Users :users="users"/>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
</template>

<script>

import Users from '../components/Users';
import Posts from '../components/Posts';

import {mapGetters, mapActions} from 'vuex';

export default {
  data() {
    return {
      tab: null
    }
  },
  components: {
    Users,
    Posts
  },
  computed: {
    ...mapGetters('users', {
      users: 'getUsersList'
    }),
  },
  methods: {
    ...mapActions('users', {
      getUsers: 'usersFromFirebase'
    }),
  },
  created() {
    this.getUsers();
  },
  mounted() {
  },
}
</script>
