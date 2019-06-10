<template>
  <div class="TasksView">
    <task-list-container/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TaskListContainer from '../components/task/TaskListContainer.vue'

export default {
  components: {
    TaskListContainer
  }
}
</script>
