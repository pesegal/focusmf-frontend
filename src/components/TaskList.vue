<template>
    <div class="TaskList">
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
    </div>
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

<style>
.TaskList .v-list {
    overflow: scroll;
    padding: 10px;
}
</style>
