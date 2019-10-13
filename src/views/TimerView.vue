<template>
  <div class="TimerView">
    <v-container>
      <h1>Timer</h1>
      <fmf-countdown-timer :time="timeDisplay" />
      <v-btn @click="toggleTimer">{{ timerStatus }}</v-btn>
    </v-container>
  </div>
</template>

<script>
import FmfCountdownTimer from '@/components/timer/FmfCountdownTimer.vue'
import moment from 'moment'

export default {
  components: {
    FmfCountdownTimer
  },

  data() {
    return {
      currentTime: moment.duration(10, 'seconds'),
      timeDisplay: { minutes: '0', seconds: '0' },
      countdownId: null,
      timerIsStarted: false
    }
  },

  computed: {
    timerStatus() { return this.timerIsStarted ? "Pause" : "Start" }
  },

  methods: {
    toggleTimer() {
      if(!this.timerIsStarted) {
        this.startTimer()
      } else {
        this.timerIsStarted = false
        clearInterval(this.countdownId)
      }
    },

    startTimer() {
      this.timerIsStarted = true
      this.countdownId = setInterval(() => {
        this.timeDisplay.minutes = this.currentTime.minutes()
        this.timeDisplay.seconds = this.currentTime.seconds()
        if (this.currentTime.asSeconds() === 0) {
          this.timerIsStarted = false
          return clearInterval(this.countdownId)
        }
        this.currentTime.subtract(1, 'seconds')
      }, 1000)
    }

  }
}
</script>
