<template>
  <v-container>
    <v-card-title>
      {{$t('tableTitle')}}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :hide-default-footer = true
    ></v-data-table>
  </v-container>
</template>

<script>

export default {
  props: {
      users: {
        type: Array,
        required: true,
      }
    },
  data() {
    return {
      headers: [
        {
          text: 'uid',
          align: 'center',
          sortable: false,
          value: 'uid'
        },
        {
          text: 'Username',
          align: 'center',
          sortable: false,
          value: 'username'
        }
      ],
    }
  }
}
</script>
