<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    class="FmfListCreateTaskDialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        flat
        small
        v-on="on"
      >
        <v-icon small>
          edit
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Task</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="task.name"
                label="Title"
                autofocus
              />
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="task.notes"
                label="Notes"
              />
            </v-flex>
            <v-flex
              xs12
            >
              <v-combobox
                v-model="selectedProjects"
                :items="availableProjects"
                :search-input.sync="projectSearchTerm"
                return-object
                item-text="name"
                item-value="id"
                label="Projects"
                full-width
                chips
                clearable
                solo
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    :selected="data.selected"
                  >
                    <span>{{ data.item.name }}</span>
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          flat
          @click="onCancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          flat
          @click="onSave"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    taskToEdit: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      task: {
        name: this.taskToEdit.name || '',
        notes: this.taskToEdit.notes || '',
        projectIds: (this.taskToEdit.projects || []).map(project => project.id)
      },
      selectedProjects: this.taskToEdit.projects || [],
      projectSearchTerm: null
    }
  },
  computed: {
    availableProjects () {
      return this.$store.state.project.projects
    }
  },
  watch: {
    async selectedProjects (newValue, previousValue) {
      if (newValue.length == previousValue.length) {
        return
      }

      const unsavedProjects = this.selectedProjects.filter(project => typeof project === 'string')
      this.selectedProjects = this.selectedProjects.filter(project => project.id)
      const newProjects = await Promise.all(unsavedProjects.map(project => {
        return this.$store.dispatch('project/createProject', {
          name: project,
          colorName: 'blue'
        })
      }))
      this.selectedProjects = this.selectedProjects.concat(newProjects)

      this.task.projectIds = this.selectedProjects.map(project => project.id)
    }
  },
  mounted () {
    this.$store.dispatch('project/getProjects')
  },
  methods: {
    onCancel () {
      this.task.name = this.taskToEdit.name
      this.task.notes = this.taskToEdit.notes
      this.task.projectIds = (this.taskToEdit.projects || []).map(project => project.id)
      this.selectedProjects = this.taskToEdit.projects
      this.dialog = false
    },

    async onSave () {
      await this.$store.dispatch('task/updateTask', {
        id: this.taskToEdit.id,
        listId: this.taskToEdit.listId,
        columnPos: this.taskToEdit.columnPos,
        name: this.task.name,
        notes: this.task.notes,
        projectIds: this.task.projectIds
      })
      await this.$store.dispatch('list/loadLists')
      this.dialog = false
    }
  }
}
</script>
