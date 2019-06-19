<template>
  <div class="board-canvas">
    <div class="board">
      <v-btn @click="onCreateTaskList">Create Task List</v-btn>
      <task-list-container :lists="lists" @task-list-deleted="onTaskListDeleted" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import TaskListContainer from '../components/task/TaskListContainer.vue'

export default {
  components: {
    TaskListContainer
  },
  data () {
    return {
      lists: [],
      loadingTaskLists: false,
      creatingTaskList: false
    }
  },
  async mounted () {
    this.loadTaskLists()
  },
  methods: {
    async onCreateTaskList () {
      this.creatingTaskList = true
      await this.$store.dispatch('taskList/createTaskList')
      this.creatingTaskList = false
      this.loadTaskLists()
    },

    async loadTaskLists () {
      this.loadingTaskLists = true
      this.lists = await this.$store.dispatch('taskList/loadLists')
      this.loadingTaskLists = false
    },

    async onTaskListDeleted (taskListId) {
      await this.$store.dispatch('taskList/deleteTaskList', taskListId)
      this.loadTaskLists()
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
