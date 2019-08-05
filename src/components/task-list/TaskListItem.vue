<template>
  <v-flex class="ml-3 mr-3 mt-2 mb-2">
    <v-card>
      <v-card-title
        primary-title
      >
        <div class="text-truncate">
          <h3 class="text-truncate pb-2">
            {{ name }}
          </h3>
          <div class="text-truncate body-1">
            {{ notes }}
          </div>
        </div>
      </v-card-title>
    </v-card>
    <v-spacer />
  </v-flex>
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
.TaskListItem {
  cursor: pointer;
}
</style>
