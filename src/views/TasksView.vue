<template>
  <div class="board-canvas">
    <div class="board">
      <task-list-container
        :lists="lists"
        @list-deleted="onListDeleted"
        @list-created="onListCreated"
        @list-name-change="onListNameChange"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import TaskListContainer from '@/components/task-list/TaskListContainer.vue'

export default {
  components: {
    TaskListContainer
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
      await this.$store.dispatch('list/createList', 'New List')
      this.creatingList = false
      this.loadLists()
    },

    async loadLists () {
      this.loadingLists = true
      await this.$store.dispatch('list/loadLists')
      this.loadingLists = false
    },

    async onListDeleted (taskListId) {
      await this.$store.dispatch('list/deleteList', taskListId)
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
