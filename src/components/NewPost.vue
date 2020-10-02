<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          :disabled="admin"
        >{{$t('buttonDialog')}}
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn
            icon
            dark
            @click="close"
          >
            <v-icon>{{mdiClose}}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="newPostSave">{{$t('savePost')}}</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-text-field
            v-model="newPost.title"
            :label="$t('titleDialog')"
          ></v-text-field>
          <v-textarea
            v-model="newPost.description"
            :label="$t('descriptionDialog')"
          ></v-textarea>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {mdiClose} from '@mdi/js'

export default {
  props: {
    admin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      mdiClose,
      newPost: {
        title: null,
        description: null
      }
    }
  },
  methods: {
    close() {
      this.newPost.title = this.newPost.description = null;
      this.dialog = !this.dialog;
    },
    newPostSave() {
      const result = {
          title: this.newPost.title,
          description: this.newPost.description,
          date: new Date().toLocaleString()
      }
      this.$emit('addNewPost',result);
      this.close();
    }
  }
}
</script>
