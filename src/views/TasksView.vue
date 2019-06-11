<template>
  <div class="board-canvas">
    <div class="board">
      <task-list-container/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TaskListContainer from '../components/task/TaskListContainer.vue'

export default {
  components: {
    TaskListContainer
  }
}
</script>

<style>
.board-canvas {
  position: relative;
  flex-grow: 1;
}
.board {
  user-select: none;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
