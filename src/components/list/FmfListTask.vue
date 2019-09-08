<template>
  <v-card class="FmfListItem mr-3 ml-3 mt-2 mb-1">
    <v-layout class="FmfListItem__container-layout" column align-content-space-between>
      <v-flex shrink>
        <v-card-title primary-title class="text-truncate">
          <v-layout column>
            <v-flex>
              <v-layout row>
                <v-flex align-self-center>
                  <div class="subheading text-truncate ml-1 FmfListItem__name">
                    {{ name }}
                  </div>
                </v-flex>
                <v-flex shrink align-content-end>
                  <v-menu v-model="contextMenuIsOpen" bottom left offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn icon class="mr-0 mb-0 mt-1" v-on="on">
                        <v-icon small>
                          more_vert
                        </v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-tile @click.stop="editDialogIsOpen = true; contextMenuIsOpen = false">
                        <v-list-tile-title>
                          <v-icon small>
                            edit
                          </v-icon>
                          <fmf-list-update-task-dialog
                            :dialog-open="editDialogIsOpen"
                            :task-to-edit="taskValues"
                            @close-dialog="editDialogIsOpen = false"
                          />
                        </v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile @click="onClickDelete">
                        <v-list-tile-title>
                          <v-icon small>
                            delete
                          </v-icon>
                        </v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout column>
                <v-flex>
                  <div
                    class="FmfListItem__note grey--text font-weight-regular text-truncate ml-1 mb-1"
                  >
                    {{ notes }}
                  </div>
                </v-flex>
                <v-flex class="FmfListItem__project-chip-container" shrink>
                  <template v-for="project in displayableProjects">
                    <v-dialog :key="project.id" max-width="300">
                      <template v-slot:activator="{ on }">
                        <v-chip
                          :color="`#${project.color.hex}`"
                          text-color="white"
                          small
                          class="caption font-weight-medium FmfListItem__project-chip text-truncate"
                          v-on="on"
                        >
                          <span
                            class="text-truncate FmfListItem__project-chip__text"
                          >{{ project.name }}</span>
                        </v-chip>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Edit Project</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-flex xs12>
                                {{ project.name }}
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn flat>
                            Cancel
                          </v-btn>
                          <v-btn color="primary" flat>
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <v-tooltip bottom light>
                    <template v-slot:activator="{ on }">
                      <v-chip
                        v-if="projects.length > 2"
                        outline
                        color="accent"
                        disabled
                        small
                        class="caption font-weight-medium FmfListItem__project-chip-more text-truncate"
                        v-on="on"
                      >
                        +{{ projects.length - 2 }}
                      </v-chip>
                    </template>
                    <v-chip
                      v-for="project in overflowProjects"
                      :key="project.id"
                      class="caption font-weight-medium FmfListItem__project-chip text-truncate"
                      :color="`#${project.color.hex}`"
                      text-color="white"
                      disabled
                      small
                    >
                      {{ project.name }}
                    </v-chip>
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import FmfListUpdateTaskDialog from '@/components/list/FmfListUpdateTaskDialog.vue'

export default {
  components: {
    FmfListUpdateTaskDialog
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
      return this.projects.slice(0, 2)
    },

    overflowProjects() {
      return this.projects.slice(2)
    },

    taskValues() {
      return {
        id: this.id,
        name: this.name,
        notes: this.notes,
        columnPos: this.columnPos,
        projects: this.projects,
        listId: this.listId
      }
    }
  },
  methods: {
    async onClickDelete() {
      await this.$store.dispatch('task/deleteTask', this.id)
      await this.$store.dispatch('list/loadLists')
    }
  }
}
</script>

<style lang="scss">
.FmfListItem {
  &__name {
    max-width: 150px;
  }

  &__note {
    max-width: 150px;
  }

  &__project-chip {
    max-width: 80px;

    &__text {
      max-width: 55px;
    }
  }

  .v-card__title.text-truncate.v-card__title--primary {
    padding: 10px;
    padding-top: 0;
  }
}
</style>
