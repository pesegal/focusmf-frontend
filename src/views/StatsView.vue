<template>
  <div class="StatsView">
    <v-container>
      <h1>Stats</h1>
      <TestChart/>
    </v-container>
  </div>
</template>

<script>
import TestChart from '@/components/diagrams/TestChart.vue'

export default {
  components: {
    TestChart,
  },
  
}
</script>
