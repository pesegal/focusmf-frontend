<template>
  <v-card class="FmfListItem ma-3" flat>
    <v-card-title
      primary-title
      class="text-truncate"
    >
      <div>
        <div class="headline text-truncate mb-2">
          {{ name }}
        </div>
        <span class="grey--text text-truncate">{{ notes }}</span>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn flat>
        Edit
      </v-btn>
      <v-btn flat>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class TaskListItem extends Vue {
  @Prop() id!: string;
  @Prop() name!: string;
  @Prop() notes?: string;
  @Prop() columnPos!: number;
}
</script>

<style>
.FmfListItem {
  cursor: pointer;
}
</style>
