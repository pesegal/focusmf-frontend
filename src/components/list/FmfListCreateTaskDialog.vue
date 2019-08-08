<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    class="FmfListCreateTaskDialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        block
        v-on="on"
      >
        + Add Task
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Task</span>
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
                v-model="task.description"
                label="Description"
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
          color="accent"
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
    listId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      task: {
        name: '',
        description: '',
        projects: []
      },
      selectedProjects: [],
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

      this.task.projects = this.selectedProjects.map(project => project.id)
    }
  },
  mounted () {
    this.$store.dispatch('project/getProjects')
  },
  methods: {
    onCancel () {
      this.task.name = ''
      this.task.description = ''
      this.task.projects = []
      this.selectedProjects = []
      this.projectSearchTerm = null
      this.dialog = false
    },

    async onSave () {
      await this.$store.dispatch('task/createTask', {
        name: this.task.name,
        notes: this.task.description,
        listId: this.listId,
        columnPos: 0,
        projectIds: this.task.projects
      })
      this.resetFields()
      await this.$store.dispatch('list/loadLists')
      this.dialog = false
    },

    resetFields () {
      this.task.name = ''
      this.task.description = ''
      this.task.projects = []
      this.selectedProjects = []
      this.projectSearchTerm = null
    }
  }
}
</script>
