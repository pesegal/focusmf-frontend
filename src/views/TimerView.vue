<template>
  <div class="TimerView">
    <v-container>
      <v-row class="TimerView__status-message" align="center" justify="center">
        <h1 class="status">
          <span v-if="hasCurrentTask">
            {{ currentWorkingTask.name }}
          </span>
          <span v-else>
            No task selected.
            <router-link class="select-one-here" to="/dashboard/tasks">Select one here.</router-link>
          </span>
        </h1>
      </v-row>
      <v-row class="TimerView__action-type-group" align="center" justify="center">
        <v-btn-toggle
          v-model="selectedTaskActionTypeAsIndex"
          mandatory
          color="accent"
        >
          <v-btn @click="setActionType(taskActionTypes.pomo)">
            Pomo
          </v-btn>
          <v-btn @click="setActionType(taskActionTypes.shortBreak)">
            Short Break
          </v-btn>
          <v-btn @click="setActionType(taskActionTypes.longBreak)">
            Long Break
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row class="TimerView__timer-container" align="center" justify="center">
        <fmf-countdown-timer :time="timeDisplay" />
      </v-row>
      <v-row class="TimerView__timer-controls-container" align="center" justify="center">
        <v-btn color="primary" @click="toggleTimer">
          {{ timerStatus }}
        </v-btn>
        <v-btn text @click="resetTimer">
          Reset
        </v-btn>
      </v-row>
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
      timerIsStarted: false,
      taskActionTaskId: null,
      taskActionStart: null,
      taskActionEnd: null,
      currentActionType: null,
      lastSelectedActionType: null,
      taskActionTypes: {
        pomo: { type: 'pomodoro', duration: 25 },
        shortBreak: { type: 'short_break', duration: 5 },
        longBreak: { type: 'long_break', duration: 15 }
      },
      selectedTaskActionTypeAsIndex: 0
    }
  },

  computed: {
    timerStatus() { return this.timerIsStarted ? 'Pause' : 'Start' },
    currentWorkingTask () {
      return this.$store.state.task.currentWorkingTask
    },
    hasCurrentTask () {
      return this.currentWorkingTask && (typeof this.currentWorkingTask.name == 'string')
    }
  },

  methods: {
    toggleTimer() {
      if(!this.timerIsStarted) {
        this.startTimer()
      } else {
        this.timerIsStarted = false
        // TODO: need to record pauses
        clearInterval(this.countdownId)
      }
    },

    resetTimer() {
      if(this.timerIsStarted) {
        this.timerIsStarted = false
        clearInterval(this.countdownId)
        this.completeTaskAction()
        this.setActionType(this.lastSelectedActionType)
        this.updateTimeDisplay(this.currentDuration)
      }
    },

    updateTimeDisplay(currentDuration) {
      this.timeDisplay.minutes = currentDuration.minutes()
      this.timeDisplay.seconds = currentDuration.seconds()
    },

    startTimer() {
      this.timerIsStarted = true
      this.taskActionStart = new Date()
      // Note: change this line if we should record non selected task pomos
      if (this.$store.state.task.currentWorkingTask) this.taskActionTaskId = this.$store.state.task.currentWorkingTask.id
      this.countdownId = setInterval(() => {
        this.updateTimeDisplay(this.currentDuration)
        if (this.currentDuration.asSeconds() === 0) {
          this.timerIsStarted = false
          this.completeTaskAction()
          return clearInterval(this.countdownId)
        }
        this.currentDuration.subtract(1, 'seconds')
      }, 1000)
    },

    setActionType(actionType) {
      if (!this.timerIsStarted) {
        this.lastSelectedActionType = actionType
        this.selectedTime = actionType.duration
        this.currentActionType = actionType.type
        this.currentDuration = moment.duration(this.selectedTime, 'm')
        this.updateTimeDisplay(this.currentDuration)
      }
    },

    completeTaskAction() {
      this.taskActionEnd = new Date()
      if (this.taskActionTaskId !== null && this.taskActionStart !== null && this.taskActionEnd !== null && this.currentActionType !== null) {
        this.$store.dispatch('task/createTaskAction', {
          id: this.taskActionTaskId,
          start: this.taskActionStart,
          end: this.taskActionEnd,
          action: this.currentActionType
        })
        this.taskActionTaskId = this.taskActionStart = this.taskActionEnd = this.currentActionType = null
      }
    }
  }
}
</script>

<style lang="scss">
.TimerView {
  .select-one-here {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .status {
    text-align: center;
  }

  .TimerView__status-message {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .TimerView__action-type-group {
    margin-bottom: 10px;
  }

  .TimerView__timer-container {
    margin-top: 25px;
    margin-bottom: 15px;
  }
}
</style>
