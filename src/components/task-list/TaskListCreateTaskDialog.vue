<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn block v-on="on">+ Add Task</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Task</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="task.name" label="Title"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="task.description" label="Description"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <!-- <v-combobox
                v-model="chips"
                :items="items"
                label="Your favorite hobbies"
                chips
                clearable
                prepend-icon="filter_list"
                solo
                multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    @input="remove(data.project)"
                  >
                    <span>{{ data.item }}</span>
                  </v-chip>
                </template>
              </v-combobox> -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="cancel">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
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
        projectIds: []
      },
      availableProjects: []
    }
  },
  methods: {
    cancel () {
      this.dialog = false
    },

    save () {
      this.$store.dispatch('task/createTask')
    }
  }
}
</script>
