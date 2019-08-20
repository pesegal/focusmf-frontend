<template>
  <v-toolbar class="FmfListHeaderToolbar" color="primary" flat dark>
    <v-toolbar-title>
      <v-text-field
        v-model="listNameModel"
        class="FmfList__name-text-field"
        hide-details
        full-width
        color="white"
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
        <v-list-tile v-show="!disableMoveLeft" @click="onListMoveLeft">
          <v-list-tile-title><v-icon>chevron_left</v-icon></v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-show="!disableMoveRight" @click="onListMoveRight">
          <v-list-tile-title><v-icon>chevron_right</v-icon></v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="onListDelete">
          <v-list-tile-title><v-icon>delete</v-icon></v-list-tile-title>
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
    },
    disableMoveLeft: {
      type: Boolean,
      default: false
    },
    disableMoveRight: {
      type: Boolean,
      default: false
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
    },

    onListMoveLeft () {
      this.$emit('list-move-left')
    },

    onListMoveRight () {
      this.$emit('list-move-right')
    }
  }
}
</script>
