<template>
  <v-dialog v-model="showDialog" max-width="300" persistent>
    <template v-slot:activator="{ on }">
      <v-chip
        small
        class="caption font-weight-regular FmfProjectChip__chip text-truncate mr-1 mt-1"
        :color="`#${projectColor}`"
        v-on="on"
      >
        <span
          class="text-truncate FmfProjectChip__chip-text white--text"
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
        <v-btn class="FmfProjectChip__remove" text color="red" @click="onDeleteProject">
          Remove
        </v-btn>
        <v-spacer />
        <v-btn text @click="showDialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="onSave">
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

  watch: {
    projectName (newValue) {
      this.project.name = newValue
    },

    projectColor (newValue) {
      this.project.color = newValue
    }
  },

  methods: {
    onSave () {
      this.showDialog = false
      this.$emit('project:updated', {
        name: this.project.name
      })
    },

    async onDeleteProject () {
      this.showDialog = false
      this.$emit('project:deleted')
    }
  }
}
</script>
