<template>
  <v-card class="FmfListItem ma-3">
    <v-layout class="FmfListItem__container-layout" column align-content-space-between fill-height>
      <v-flex>
        <v-card-title
          primary-title
          class="text-truncate"
        >
          <v-layout column>
            <v-flex class="FmfListItem__project-chip-container">
              <v-chip
                v-for="project in displayableProjects"
                :key="project.id"
                outline
                color="secondary"
                disabled
                small
                class="mb-3 FmfListItem__project-chip text-truncate"
              >
                <span class="text-truncate FmfListItem__project-chip__text">{{ project.name }}</span>
              </v-chip>
              <v-chip
                v-if="projects.length > 2"
                outline
                color="secondary"
                disabled
                small
                class="mb-3 FmfListItem__project-chip text-truncate"
              >
                +{{ projects.length - 2 }}
              </v-chip>
            </v-flex>
            <v-flex>
              <div class="headline text-truncate mb-2">
                {{ name }}
              </div>
            </v-flex>
            <v-flex>
              <div class="grey--text text-truncate">
                {{ notes }}
              </div>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-flex>
      <v-flex shrink align-end>
        <v-card-actions>
          <v-btn flat small>
            Edit
          </v-btn>
          <v-btn flat small>
            <v-icon small>
              delete
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
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
  computed: {
    displayableProjects () {
      return this.projects.slice(0, 2)
    }
  }
}
</script>

<style lang="scss">
.FmfListItem {
  cursor: pointer;

  &__container-layout {
    min-height: 180px;
  }

  &__project-chip-container {
    min-height: 44px;
  }

  &__project-chip {
    max-width: 80px;

    &__text {
      max-width: 55px;
    }
  }

  .v-card__title.text-truncate.v-card__title--primary {
    padding: 10px 16px;
  }
}
</style>
