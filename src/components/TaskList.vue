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
            <template v-for="(item, index) in items">
                <v-card :key="index">
                    <p :key="index">{{ "id " + item.id }}</p>
                    <v-divider :key="index"></v-divider>
                </v-card>
            </template>
        </v-list>
    </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class TaskList extends Vue {
    items = [

        // TODO: Replicate mock some basic task data.
        {id: 1},
        {id: 2},
        {id: 3}
    ]

}
</script>
