<template>
  <v-card class="TaskList">
    <v-layout column fill-height>
      <v-flex shrink>
        <fmf-list-header-toolbar
          :list-name="list.name"
          @list-name-change="onListNameChange"
          @list-deleted="onListDeleted"
        />
      </v-flex>
      <v-flex class="TaskList__task-flex-container">
        <v-layout column>
          <v-flex v-for="task in tasks" :key="task.id">
            <TaskListItem
              :id="task.id"
              :name="task.name"
              :notes="task.notes"
              :column-pos="task.columnPos"
            />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex shrink>
        <v-card-actions class="TaskList__card-actions justify-center">
          <task-list-create-task-dialog :list-id="list.id" />
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Component from "vue-class-component"
import TaskListItem from "./TaskListItem.vue"
import TaskListCreateTaskDialog from './TaskListCreateTaskDialog.vue'
import FmfListHeaderToolbar from './FmfListHeaderToolbar.vue'

export default {
  components: {
    TaskListItem,
    TaskListCreateTaskDialog,
    FmfListHeaderToolbar
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
    onListNameChange (name) {
      this.$emit('list-name-change', {
        id: this.list.id,
        name: name
      })
    },

    onListDeleted (taskListAction) {
      this.$emit('list-deleted')
    }
  }
}
</script>

<style lang="scss">
.TaskList {
  width: 272px;
  margin: 0 15px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;

  &__task-flex-container {
    height: 100%;
    overflow: scroll;
  }

  &__v-list.v-list {
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 15px;
    z-index: 1;
    min-height: 0;
    background-color: transparent;
    padding-top: 15px;
  }

  &__card-actions {
    padding: 20px;
    width: 100%;
    height: 80px;
  }

  &__name-text-field.v-text-field {

    & > .v-input__control
      > .v-input__slot:after {
      display: none;
    }

    & > .v-input__control
      > .v-input__slot
      input {
      margin-top: 15px;
      cursor: pointer;
    }

    & > .v-input__control
      > .v-input__slot
      > .v-text-field__slot {
        cursor: pointer;
    }
  }
}
</style>
