<template>
  <v-app>
    <v-app-bar min-height="78" max-height="78">
      <v-toolbar-title class="pt-2">{{$t('toolbarTitle')}}</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-select
          class="pt-11"
          v-model="language"
          :items="langs"
          :label="$t('language')"
          :append-icon="mdiTranslate"
          dense
          outlined>
        </v-select>
      <v-spacer></v-spacer>
      <div class="pt-3">
        <v-btn
          color="red"
          dark
          :disabled="!currentUserAuth"
          @click="signOut"
        >{{$t('buttonSignOut')}}<v-icon right>{{mdiExport}}</v-icon></v-btn>
      </div>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import {mdiExport, mdiTranslate} from '@mdi/js'
import {mapGetters,mapActions} from 'vuex';

export default {
  data() {
    return {
      mdiExport,
      mdiTranslate
    }
  },
  computed: {
    ...mapGetters('auth', {
      currentUserAuth: 'currentUserAuth',
      langs: 'getLangs',
      local: 'getLocale'
    }),
    language: {
      get() {
        return this.local
      },
      set(value) {
        this.setLocale(value);
      }
    }
  },
  methods: {
    ...mapActions('auth', {
      signOut: 'signOut',
      setLocale: 'locale'
    }),
    ...mapActions('posts', {
      onlineOrOffline: 'onlineOrOffline',
      savePostOffline: 'addNewPostOffline'
    })
  },
  created() {
    this.onlineOrOffline(navigator.onLine);
    window.addEventListener('online', () => {
      this.onlineOrOffline(navigator.onLine);
      this.savePostOffline();
    })
    window.addEventListener('offline', () => {
      this.onlineOrOffline(navigator.onLine)
    })
  },
  destroyed() {
    window.removeEventListener('online', () => {})
    window.removeEventListener('offline', () => {})
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
