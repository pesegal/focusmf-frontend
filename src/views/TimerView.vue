<template>
  <div class="TimerView">
    <v-container>
      <h1>Timer</h1>
      <fmf-countdown-timer :time="timeDisplay"/>
    </v-container>
  </div>
</template>

<script>
import FmfCountdownTimer from '@/components/timer/FmfCountdownTimer.vue'
import moment from "moment"

export default {
  components: {
    FmfCountdownTimer
  },

  data() {
    return {
      currentTime: moment.duration(25, 'seconds'),
      timeDisplay: { minutes: "0", seconds: "0" }
    }
  },
  mounted() {
    setInterval(() => {
      this.timeDisplay.minutes = this.currentTime.minutes()
      this.timeDisplay.seconds = this.currentTime.seconds()
      this.currentTime.subtract(1, 'seconds')

    }, 1000)
  }
}
</script>
