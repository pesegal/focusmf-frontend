<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
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
              />
            </v-flex>
            <v-flex xs12>
              <v-text-field
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
                item-text="name"
                :search-input.sync="projectSearchTerm"
                @change="onChange"
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
                    close
                    @input="remove(data.project)"
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
          color="blue darken-1"
          flat
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="dialog = false"
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
  mounted () {
    this.$store.dispatch('project/getProjects')
  },
  watch: {
    selectedProjects (newValue, previousValue) {
      if (newValue.length == previousValue.length) {
        return
      }

      this.selectedProjects = newValue.map(selection => {
        if (typeof selection === 'string') {
          selection = {
            name: selection,
            colorName: 'red'
          }

          this.$store.commit('project/addProject', selection)
        }

        return selection
      })
    }
  },
  methods: {
    cancel () {
      this.dialog = false
    },

    save () {
      this.$store.dispatch('task/createTask')
    },

    remove (project) {
    },

    async onChange (list) {
      // await this.$store.dispatch('project/createProject', {
      //   name: list[list.length - 1],
      //   colorName: 'red'
      // })
    }
  }
}
</script>
