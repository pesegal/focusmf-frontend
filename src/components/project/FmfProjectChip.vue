<template>
  <v-dialog v-model="showDialog" max-width="300" persistent>
    <template v-slot:activator="{ on }">
      <v-chip
        :color="`#${projectColor}`"
        text-color="white"
        small
        class="caption font-weight-medium FmfListItem__project-chip text-truncate"
        v-on="on"
      >
        <span
          class="text-truncate FmfListItem__project-chip__text"
        >{{ projectName }}</span>
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
              <v-text-field
                v-model="project.name"
                label="Name"
                autofocus
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn flat @click="showDialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary" flat @click="onSave">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    projectName: {
      type: String,
      default: ''
    },
    projectColor: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      project: {
        name: this.projectName,
        color: this.projectColor
      },
      showDialog: false
    }
  },

  methods: {
    onSave () {
      this.showDialog = false
      this.$emit('project:updated', {
        name: this.project.name
      })
    }
  }
}
</script>
