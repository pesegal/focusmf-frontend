<template>
  <div class="TimerView">
    <v-container>
      <h1>Timer</h1>
      <v-btn @click="setDuration(25)">
        Pomo
      </v-btn>
      <v-btn @click="setDuration(5)">
        Short Break
      </v-btn>
      <v-btn @click="setDuration(15)">
        Long Break
      </v-btn>
      <div class="display-1">
        {{ currentTask }}
      </div>
      <fmf-countdown-timer :time="timeDisplay" />
      <v-btn @click="toggleTimer">
        {{ timerStatus }}
      </v-btn>
      <v-btn @click="resetTimer">
        Reset
      </v-btn>
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
      selectedTime: 25,
      currentDuration: null,
      timeDisplay: { minutes: '0', seconds: '0' },
      countdownId: null,
      timerIsStarted: false
    }
  },

  computed: {
    timerStatus() { return this.timerIsStarted ? 'Pause' : 'Start' },
    currentTask() { 
      const currentWorkingTask = this.$store.state.task.currentWorkingTask
      if (!currentWorkingTask || currentWorkingTask.name === null) {
        return 'Select a task to work!'
      } else {
        return `Focus on '${currentWorkingTask.name}' for..`
      }
    }
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

    resetTimer() {
      if(this.timerIsStarted) {
        this.timerIsStarted = false
        clearInterval(this.countdownId)
        this.setDuration(this.selectedTime)
        this.updateTimeDisplay(this.currentDuration)
      }
    },

    updateTimeDisplay(currentDuration) {
      this.timeDisplay.minutes = currentDuration.minutes()
      this.timeDisplay.seconds = currentDuration.seconds()
    },

    startTimer() {
      this.timerIsStarted = true
      this.countdownId = setInterval(() => {
        this.updateTimeDisplay(this.currentDuration)
        if (this.currentDuration.asSeconds() === 0) {
          this.timerIsStarted = false
          return clearInterval(this.countdownId)
        }
        this.currentDuration.subtract(1, 'seconds')
      }, 1000)
    },

    setDuration(minutes) {
      if (!this.timerIsStarted) {
        this.selectedTime = minutes
        this.currentDuration = moment.duration(minutes, 'm')
        this.updateTimeDisplay(this.currentDuration)
      }
    }
  }
}
</script>
