<template>
  <v-container class="FmfListContainer">
    <v-row
      class="FmfListContainer__row flex-nowrap"
    >
      <v-col
        v-for="(list, index) in lists"
        :key="list.id"
        class="flex-grow-0"
      >
        <fmf-list
          :list="list"
          :delete-disabled="lists.length == 1"
          :is-first-position="index == 0"
          :is-last-position="index == (lists.length - 1)"
          @list-name-change="onListNameChange"
          @list-deleted="onListDeleted"
          @list-move-left="onListMoveLeft"
          @list-move-right="onListMoveRight"
        />
      </v-col>
      <v-col class="flex-grow-0">
        <div class="FmfListContainer__add-list-button-container">
          <v-btn @click="createList">
            + Add list
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FmfList from './FmfList.vue'

export default {
  components: {
    FmfList
  },
  props: {
    lists: {
      default () { return [] },
      type: Array
    }
  },
  methods: {
    onListDeleted (id) {
      this.$emit('list-deleted', id)
    },

    createList () {
      this.$emit('list-created')
    },

    onListNameChange (list) {
      this.$emit('list-name-change', list)
    },

    async onListMoveLeft (id) {
      let lists = [].concat(this.lists)
      const index = this.lists.findIndex(list => list.id == id);
      [lists[index], lists[index - 1]] = [lists[index - 1], lists[index]]

      let updateAllLists = []
      lists.forEach((list, index) => {
        updateAllLists.push(
          this.$store.dispatch('list/updateList', {
            id: list.id,
            name: list.name,
            position: index
          })
        )
      })
      await Promise.all(updateAllLists)
      await this.$store.dispatch('list/loadLists')
    },

    async onListMoveRight (id) {
      let lists = [].concat(this.lists)
      const index = this.lists.findIndex(list => list.id == id);
      [lists[index], lists[index + 1]] = [lists[index + 1], lists[index]]

      let updateAllLists = []
      lists.forEach((list, index) => {
        updateAllLists.push(
          this.$store.dispatch('list/updateList', {
            id: list.id,
            name: list.name,
            position: index
          })
        )
      })
      await Promise.all(updateAllLists)
      await this.$store.dispatch('list/loadLists')
    }
  }
}
</script>

<style lang="scss">
.FmfListContainer {
  height: 100%;
  margin-left: 0;
  margin-right: 0;

  &__add-list-button-container {
    width: 272px;
    height: 100%;
    padding-top: 25px;
    text-align: center;
    border: 2px dashed lightgrey;
  }

  &__row.row {
    height: 100%;
    padding-bottom: 60px;
  }
}
</style>
