<template>
  <v-container class="TaskListContainer">
    <v-layout row>
      <v-flex
        v-for="(list, index) in lists"
        :key="index"
      >
        <task-list :items="list" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import TaskList from '../TaskList.vue'
import Component from 'vue-class-component';

@Component({
  components: {
    TaskList
  }
})
export default class TaskListContainer extends Vue {
  lists = this.$store.state.taskList.tasks
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
