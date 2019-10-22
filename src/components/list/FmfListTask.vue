<template>
  <v-card class="FmfListTask mr-3 ml-3 mt-2 mb-1">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ notes }}</v-list-item-subtitle>
          <v-list-item-subtitle>
            <template v-for="project in displayableProjects">
              <fmf-project-chip
                :key="project.id"
                :project-name="project.name"
                :project-color="project.color.hex"
                @project:updated="onProjectUpdated(project, $event)"
                @project:deleted="onProjectDeleted(project, $event)"
              />
            </template>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu
            v-model="contextMenuIsOpen"
            bottom
            left
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn icon class="mr-0 mb-0 mt-1 FmfListTask__action-menu" v-on="on">
                <v-icon small>
                  more_vert
                </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item class="FmfListTask__edit" @click.stop="editDialogIsOpen = true; contextMenuIsOpen = false">
                <v-list-item-title>
                  <v-icon small>
                    edit
                  </v-icon>
                  <fmf-list-update-task-dialog
                    :dialog-open="editDialogIsOpen"
                    :task-to-edit="getTaskValues()"
                    @close-dialog="editDialogIsOpen = false"
                  />
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="FmfListTask__work" @click="setCurrentWorkingTask">
                <v-list-item-title>
                  <v-icon small>
                    timer
                  </v-icon>
                </v-list-item-title>
              </v-list-item>
              <v-list-item class="FmfListTask__delete" @click="onClickDelete">
                <v-list-item-title>
                  <v-icon small>
                    delete
                  </v-icon>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import FmfListUpdateTaskDialog from '@/components/list/FmfListUpdateTaskDialog.vue'
import FmfProjectChip from '@/components/project/FmfProjectChip'

export default {
  components: {
    FmfListUpdateTaskDialog,
    FmfProjectChip
  },
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    notes: {
      type: String,
      required: true
    },
    columnPos: {
      type: Number,
      required: true
    },
    projects: {
      type: Array,
      required: true
    },
    listId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editDialogIsOpen: false,
      contextMenuIsOpen: false
    }
  },
  computed: {
    displayableProjects() {
      return this.projects
    },

    overflowProjects() {
      return this.projects.slice(2)
    }
  },
  methods: {
    getTaskValues() {
      return {
        id: this.id,
        name: this.name,
        notes: this.notes,
        columnPos: this.columnPos,
        projects: this.projects,
        listId: this.listId
      }
    },

    setCurrentWorkingTask() {
      this.$store.commit('task/setWorkingTask', { id: this.id,  name: this.name })
      this.$router.push('timer')
    },

    async onClickDelete() {
      await this.$store.dispatch('task/deleteTask', this.id)
      await this.$store.dispatch('list/loadLists')
    },

    async onProjectUpdated (project, updatedProject) {
      await this.$store.dispatch('project/updateProject', {
        id: project.id,
        name: updatedProject.name
      })
      await this.$store.dispatch('list/loadLists')
      await this.$store.dispatch('project/getProjects')
    },

    async onProjectDeleted (project) {
      const projectIdToDelete = project.id
      await this.$store.dispatch('task/updateTask', {
        id: this.id,
        name: this.name,
        notes: this.notes,
        projectIds: this.projects
          .filter(project => project.id != projectIdToDelete)
          .map(project => project.id)
      })
      await this.$store.dispatch('list/loadLists')
    }
  }
}
</script>

<style lang="scss">
.FmfListTask {
  &__name {
    max-width: 150px;
  }

  &__note {
    max-width: 150px;
  }

  .FmfProjectChip__chip {
    max-width: 50px;

    .FmfProjectChip__chip-text {
      max-width: 30px;
    }
  }


  &__action-menu {
    position: absolute;
    top: 0;
  }

  .v-card__title.text-truncate.v-card__title--primary {
    padding: 10px;
    padding-top: 0;
  }
}
</style>
