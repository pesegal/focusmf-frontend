<template>
  <v-flex class="FmfListItem ml-3 mr-3 mt-2 mb-2">
    <v-card flat outlined>
      <v-card-title
        class="text-truncate"
      >
        {{ name }}
      </v-card-title>
      <v-card-text class="text-truncate">
        {{ notes }}
      </v-card-text>
      <v-card-actions>
        <v-btn text>
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
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
.FmfListItem {
  cursor: pointer;
}
</style>
