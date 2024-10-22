<template>
  <v-card class="FmfList">
    <v-layout column fill-height>
      <v-flex shrink>
        <fmf-list-header-toolbar
          :list-name="list.name"
          :disable-move-left="isFirstPosition"
          :disable-move-right="isLastPosition"
          @list-name-change="onListNameChange"
          @list-deleted="onListDeleted"
        />
      </v-flex>
      <v-flex class="FmfList__task-flex-container pb-2">
        <v-layout column>
          <draggable
            v-model="tasks"
            ghost-class="ghost-class-fmf-tasks"
            group="fmf-tasks"
          >
            <v-flex v-for="task in tasks" :key="task.id">
              <fmf-list-task
                :id="task.id"
                :name="task.name"
                :notes="task.notes"
                :column-pos="task.columnPos"
                :projects="task.projects"
                :list-id="list.id"
              />
            </v-flex>
          </draggable>
        </v-layout>
      </v-flex>
      <v-flex shrink>
        <v-card-actions class="FmfList__card-actions justify-center">
          <fmf-list-create-task-dialog :list-id="list.id" />
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import FmfListTask from './FmfListTask.vue'
import FmfListCreateTaskDialog from './FmfListCreateTaskDialog.vue'
import FmfListHeaderToolbar from './FmfListHeaderToolbar.vue'
import draggable from 'vuedraggable'
import _ from 'lodash'

export default {
  components: {
    FmfListTask,
    FmfListCreateTaskDialog,
    FmfListHeaderToolbar,
    draggable
  },
  props: {
    list: {
      type: Object,
      required: true
    },
    deleteDisabled: {
      type: Boolean,
      default: false
    },
    isFirstPosition: {
      type: Boolean,
      default: false
    },
    isLastPosition: {
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
    tasks: {
      get () {
        return _.orderBy(this.list.tasks, 'columnPos')
      },

      set(tasks) {
        let promises = []
        let newTasks = []
        tasks.forEach((task, index) => {
          promises.push(this.$store.dispatch('task/updateTask', {
            id: task.id,
            name: task.name,
            notes: task.notes,
            projectIds: task.projectIds,
            columnPos: index,
            listId: this.list.id
          }))
          newTasks.push({
            ...task,
            columnPos: index
          })
        })
        this.$store.commit('list/updateTasksForList', {
          id: this.list.id,
          tasks: newTasks
        })
        Promise.all(promises)
      }
    }
  },
  methods: {
    onListNameChange (name) {
      this.$emit('list-name-change', {
        id: this.list.id,
        name: name,
        position: this.list.position
      })
    },

    onListDeleted () {
      this.$emit('list-deleted', this.list.id)
    }
  }
}
</script>

<style lang="scss">
.FmfList {
  width: 272px;
  margin: 0 5px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;

  .ghost-class-fmf-tasks {
    opacity: 0.45;

    .FmfListTask__list-container {
      border: 2px dashed gray;
    }
  }

  &__task-flex-container {
    background-color: #f5f5f5;
    height: 100%;
    overflow: auto !important;
    position: relative !important;

    & > div.layout.column {
      height: 100%;
      & > div {
        height: 100%;
      }
    }
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
    height: 55px;
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
