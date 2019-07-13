<template>
  <v-card class="TaskList">
    <v-toolbar
      color="blue"
      dark
      flat
    >
      <v-toolbar-title>
        <v-text-field
          v-model="taskListName"
          class="TaskList__name-text-field"
          color="white"
          hide-details
          full-width
          @input="onTaskListNameChange"
        />
      </v-toolbar-title>
      <v-spacer />
      <v-menu
        bottom
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
          >
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile
            v-for="(taskListAction, i) in taskListActions"
            :key="i"
            @click="onTaskActionSelected(taskListAction)"
          >
            <v-list-tile-title>{{ taskListAction.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
    <v-card-actions class="TaskList__card-actions justify-center">
      <task-list-create-task-dialog :list-id="list.id" />
    </v-card-actions>
  </v-card>
</template>

<script>
import Component from "vue-class-component"
import TaskListItem from "./TaskListItem.vue"
import TaskListCreateTaskDialog from './TaskListCreateTaskDialog.vue'

export default {
  components: {
    TaskListItem,
    TaskListCreateTaskDialog
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
  data () {
    return {
      taskListName: this.list.name,
      taskListActions: [
        {
          title: 'Delete',
          action: () => {
            this.$emit('task-list-deleted', this.list.id)
          }
        }
      ],
      isCreatingNewTask: false,
      newTask: null
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
    onTaskActionSelected (taskListAction) {
      taskListAction.action()
    },
    onTaskListNameChange () {
      this.$emit('task-list-name-change', {
        id: this.list.id,
        name: this.taskListName
      })
    }
  }
}
</script>

<style>
.TaskList {
  width: 272px;
  margin: 0 15px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
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
  padding-top: 15px;
}

.TaskList__card-actions {
  padding: 20px;
  position: absolute;
  width: 100%;
  bottom: 0;
}

.TaskList__name-text-field.v-text-field
  > .v-input__control
  > .v-input__slot:after {
  display: none;
}

.TaskList__name-text-field.v-text-field
  > .v-input__control
  > .v-input__slot
  input {
  margin-top: 15px;
}
</style>
