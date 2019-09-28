<template>
  <v-toolbar class="FmfListHeaderToolbar" color="primary" text dark>
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
        <v-list-item v-show="!disableMoveLeft" @click="onListMoveLeft">
          <v-list-item-title><v-icon>chevron_left</v-icon></v-list-item-title>
        </v-list-item>
        <v-list-item v-show="!disableMoveRight" @click="onListMoveRight">
          <v-list-item-title><v-icon>chevron_right</v-icon></v-list-item-title>
        </v-list-item>
        <v-list-item @click="onListDelete">
          <v-list-item-title><v-icon>delete</v-icon></v-list-item-title>
        </v-list-item>
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
