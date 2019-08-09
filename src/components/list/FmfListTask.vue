<template>
  <v-card class="FmfListItem ma-3" flat>
    <v-card-title
      primary-title
      class="text-truncate"
    >
      <v-layout column>
        <v-flex>
          <div class="headline text-truncate mb-2">
            {{ name }}
          </div>
          <div class="grey--text text-truncate">
            {{ notes }}
          </div>
        </v-flex>
      </v-layout>
    </v-card-title>

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
  </v-card>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"

@Component
export default class TaskListItem extends Vue {
  @Prop() id!: string
  @Prop() name!: string
  @Prop() notes?: string
  @Prop() columnPos!: number
  @Prop() projects!: []
}
</script>

<style>
.FmfListItem {
  cursor: pointer;
}
</style>
