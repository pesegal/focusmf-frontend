<template>
  <v-card class="TaskList">
    <v-toolbar
      color="blue"
      dark
    >
      <v-toolbar-title>{{ name }}</v-toolbar-title>
      <v-spacer />
      <v-btn v-if="!deleteDisabled" icon @click="onDeleteList">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list class="TaskList__v-list">
      <v-layout
        align-space-around
        justify-center
        column
      >
        <TaskListItem
          v-for="(task, index) in tasks"
          :id="task.id"
          :key="index"
          :name="task.name"
          :notes="task.notes"
          :column-pos="task.columnPos"
        />
      </v-layout>
    </v-list>
  </v-card>
</template>

<script>
import Component from "vue-class-component"
import TaskListItem from "./TaskListItem.vue"

export default {
  components: {
    TaskListItem
  },
  props: {
    list: {
      type: Object,
      required: true
    },
    deleteDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    name () {
      return this.list.name
    },
    tasks () {
      return this.list.tasks
    }
  },
  methods: {
    onDeleteList () {
      this.$emit('task-list-deleted', this.list.id)
    }
  }
}
</script>

<style>
.TaskList {
  width: 272px;
  margin: 0 4px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
}

.TaskList:first-child {
  margin-left: 8px;
}
.TaskList:last-child {
  margin-right: 8px;
}

.TaskList__container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  background-color: transparent;
}

.TaskList__v-list.v-list {
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 15px;
  z-index: 1;
  min-height: 0;
  background-color: transparent;
}
</style>
