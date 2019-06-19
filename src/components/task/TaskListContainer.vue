<template>
  <v-container class="TaskListContainer">
    <v-layout row>
      <v-flex
        v-for="(list, index) in lists"
        :key="index"
      >
        <task-list @task-list-deleted="onTaskListDeleted" :list="list" :delete-disabled="lists.length == 1" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TaskList from '../TaskList.vue'

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
    }
  }
}
</script>

<style>
.TaskListContainer {
  height: 100%;
}

.TaskListContainer .row.layout {
  height: 100%;
}
</style>
