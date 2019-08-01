<template>
  <div class="board-canvas">
    <div class="board">
      <task-list-container
        :lists="lists"
        @task-list-deleted="onTaskListDeleted"
        @task-list-created="onTaskListCreated"
        @task-list-name-change="onTaskListNameChange"
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
      loadingTaskLists: false,
      creatingTaskList: false
    }
  },
  computed: {
    lists () {
      return this.$store.state.taskList.tasks
    }
  },
  async mounted () {
    this.loadTaskLists()
  },
  methods: {
    async onTaskListCreated () {
      this.creatingTaskList = true
      await this.$store.dispatch('taskList/createTaskList', 'New List')
      this.creatingTaskList = false
      this.loadTaskLists()
    },

    async loadTaskLists () {
      this.loadingTaskLists = true
      await this.$store.dispatch('taskList/loadLists')
      this.loadingTaskLists = false
    },

    async onTaskListDeleted (taskListId) {
      await this.$store.dispatch('taskList/deleteTaskList', taskListId)
      this.loadTaskLists()
    },

    async onTaskListNameChange (taskList) {
      await this.$store.dispatch('taskList/updateTaskList', taskList)
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
