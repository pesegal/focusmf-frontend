<template>
  <div class="board-canvas">
    <div class="board">
      <fmf-list-container
        :lists="lists"
        @list-deleted="onListDeleted"
        @list-created="onListCreated"
        @list-name-change="onListNameChange"
      />
    </div>
  </div>
</template>

<script>
import FmfListContainer from '@/components/list/FmfListContainer.vue'

export default {
  components: {
    FmfListContainer
  },
  data () {
    return {
      loadingLists: false,
      creatingList: false
    }
  },
  computed: {
    lists () {
      return this.$store.state.list.lists
    }
  },
  async mounted () {
    this.loadLists()
  },
  methods: {
    async onListCreated () {
      this.creatingList = true
      await this.$store.dispatch('list/createList', {
        name: 'New List',
        position: this.lists.length
      })
      this.creatingList = false
      this.loadLists()
    },

    async loadLists () {
      this.loadingLists = true
      await this.$store.dispatch('list/loadLists')
      this.loadingLists = false
    },

    async onListDeleted (listId) {
      await this.$store.dispatch('list/deleteList', listId)

      let lists = [].concat(this.lists)
      const index = this.lists.findIndex(list => list.id == listId)
      lists.splice(index, 1)

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

      this.loadLists()
    },

    async onListNameChange (list) {
      await this.$store.dispatch('list/updateList', list)
      this.loadLists()
    }
  }
}
</script>

<style>
.board-canvas {
  position: relative;
  flex-grow: 1;
}
.board {
  user-select: none;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
