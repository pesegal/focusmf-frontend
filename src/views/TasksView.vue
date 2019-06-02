<template>
  <div class="TasksView">
    <v-container>
      <TaskList/>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TaskList from '../components/TaskList.vue'

export default {
  components: {
    TaskList
  },
  data () {
    return {
      greeting: "hello"
    }
  }
}
</script>
