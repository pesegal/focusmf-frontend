<template>
    <v-list>
        <TaskListItem
            v-for="(item, index) in items"
            :key="index"
            :id="item.id"
            v-bind:name="item.name"
            :notes="item.notes"
            :columnPos="item.columnPos"
        ></TaskListItem>
    </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import TaskListItem from './TaskListItem.vue'

@Component({
    components: {
        TaskListItem
    },
    props: {
        items: {
            type: Array,
            default: []
        }
    }
})
export default class TaskList extends Vue {

}
</script>
