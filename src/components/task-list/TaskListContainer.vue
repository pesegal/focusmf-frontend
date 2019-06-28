<template>
  <v-container class="TaskListContainer">
    <v-layout class="TaskListContainer__layout"
      row
      fill-height
    >
      <v-flex
        shrink
        v-for="list in lists"
        :key="list.id"
      >
        <task-list
          @task-list-name-change="onTaskListNameChange"
          @task-list-deleted="onTaskListDeleted"
          :list="list"
          :delete-disabled="lists.length == 1"
        />
      </v-flex>
      <v-flex shrink>
        <div class="TaskListContainer__add-list-button-container">
          <v-btn @click="createTaskList">+ Add list</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TaskList from './TaskList.vue'

export default {
  components: {
    TaskList
  },
  props: {
    lists: {
      default: [],
      type: Array
    }
  },
  methods: {
    onTaskListDeleted (id) {
      this.$emit('task-list-deleted', id)
    },

    createTaskList () {
      this.$emit('task-list-created')
    },

    onTaskListNameChange (taskList) {
      this.$emit('task-list-name-change', taskList)
    }
  }
}
</script>

<style>
.TaskListContainer {
  height: 100%;
  margin-left: 0;
  margin-right: 0;
}

.TaskListContainer .row.layout {
  height: 100%;
  padding-bottom: 60px;
}

.TaskListContainer__add-list-button-container {
  width: 150px;
}
</style>
