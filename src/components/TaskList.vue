<template>
    <v-card>
        <v-toolbar color="brown" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>Example List</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list two-line>
            <v-layout align-space-around justify-center column>
                <TaskListItem
                    v-for="item in items"
                    :key="item.id"
                    :id="item.id"
                    :name="item.name"
                    :notes="item.notes"
                    :columnPos="item.columnPos"
                ></TaskListItem>
            </v-layout>
        </v-list>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import TaskListItem from './TaskListItem.vue'

@Component({
    components: {
        TaskListItem
    }
})
export default class TaskList extends Vue {
    // TODO: Figure out how data gets queried from the backend
    items = [
        {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
        {id: 2, name: "Task List Name 2", projects: [], columnPos: 1, notes: "notes 2"},
        {id: 3, name: "Task List Name 3", projects: [], columnPos: 1, notes: "notes 3"},
        {id: 4, name: "Task List Name 4", projects: [], columnPos: 1, notes: "notes 4"},
        {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"}
    ]
}
</script>
