<template>
    <v-flex class="pb-1 mx-1">
         <!-- TODO: Placeholder for projects. -->
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h3>{{ name }}</h3>
                    <div>{{ notes }}</div>
                </div>
            </v-card-title>
        </v-card>
        <v-spacer/>
    </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class TaskListItem extends Vue {
    @Prop() id!: string
    @Prop() name!: string
    @Prop() notes?: string
    // TODO: Placeholder for projects.
    @Prop() columnPos!: number
}
</script>
