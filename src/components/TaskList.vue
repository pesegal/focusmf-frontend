<template>
    <div class="TaskList">
        <div class="TaskList__container">
            <v-list class="TaskList__v-list">
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
.TaskList {
    width: 272px;
    margin: 0 4px;
    height: 100%;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
}

.TaskList:first-child {
    margin-left: 8px;
}
.TaskList:last-child {
    margin-right: 8px;
}

.TaskList__container {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  background-color: transparent;
}

.TaskList__v-list.v-list {
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 15px;
    z-index: 1;
    min-height: 0;
    background-color: transparent;
}
</style>
