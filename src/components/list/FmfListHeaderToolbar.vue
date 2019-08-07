<template>
  <v-toolbar class="FmfListHeaderToolbar" color="blue" dark flat>
    <v-toolbar-title>
      <v-text-field
        v-model="listNameModel"
        class="TaskList__name-text-field"
        color="white"
        hide-details
        full-width
        @blur="onListNameChange"
      />
    </v-toolbar-title>
    <v-spacer />
    <v-menu bottom offset-y>
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile
          @click="onListDelete"
        >
          <v-list-tile-title>Delete</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    listName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      listNameModel: this.listName
    }
  },

  methods: {
    onListDelete () {
      this.$emit('list-deleted')
    },

    onListNameChange () {
      this.$emit('list-name-change', this.listNameModel)
    }
  }
}
</script>
