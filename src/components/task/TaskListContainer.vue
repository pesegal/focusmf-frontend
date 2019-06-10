<template>
  <v-container>
    <v-layout row justify-end>
      <v-flex v-for="(list, index) in lists" :key="index">
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
  lists = [
    [
      {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
      {id: 2, name: "Task List Name 2", projects: [], columnPos: 1, notes: "notes 2"},
      {id: 3, name: "Task List Name 3", projects: [], columnPos: 1, notes: "notes 3"},
    ],
    [
      {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
      {id: 2, name: "Task List Name 2", projects: [], columnPos: 1, notes: "notes 2"},
      {id: 3, name: "Task List Name 3", projects: [], columnPos: 1, notes: "notes 3"},
      {id: 4, name: "Task List Name 4", projects: [], columnPos: 1, notes: "notes 4"},
      {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"}
    ],
    [
      {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
      {id: 2, name: "Task List Name 2", projects: [], columnPos: 1, notes: "notes 2"},
      {id: 3, name: "Task List Name 3", projects: [], columnPos: 1, notes: "notes 3"},
      {id: 4, name: "Task List Name 4", projects: [], columnPos: 1, notes: "notes 4"},
      {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
      {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
      {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
      {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
      {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
      {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
      {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"}
    ],
    [
      {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
    ],
    [
      {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
    ]
  ]
}
</script>
