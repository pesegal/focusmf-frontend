<template>
  <div class="TimerView">
    <v-container>
      <v-row class="TimerView__status-message" align="center" justify="center">
        <h1 class="status">
          <span v-if="hasCurrentWorkingTask">
            {{ currentWorkingTask.name }}
          </span>
          <span v-else>
            No task selected.
            <router-link class="select-one-here" to="/dashboard/tasks">Select one here.</router-link>
          </span>
        </h1>
      </v-row>
      <v-row
        v-if="hasCurrentWorkingTask"
        class="TimerView__action-type-group"
        align="center"
        justify="center"
      >
        <v-btn-toggle
          v-model="currentActionIndex"
          mandatory
          color="accent"
        >
          <v-btn :disabled="timerIsStarted" @click="setAction(taskActions.pomo)">
            Pomo
          </v-btn>
          <v-btn :disabled="timerIsStarted" @click="setAction(taskActions.shortBreak)">
            Short Break
          </v-btn>
          <v-btn :disabled="timerIsStarted" @click="setAction(taskActions.longBreak)">
            Long Break
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row
        v-if="hasCurrentWorkingTask"
        class="TimerView__timer-container"
        align="center"
        justify="center"
      >
        <fmf-countdown-timer :time="minutesAndSecondsRemaining" />
      </v-row>
      <v-row
        v-if="hasCurrentWorkingTask"
        class="TimerView__timer-controls-container"
        align="center"
        justify="center"
      >
        <v-btn v-if="timerIsStarted" color="primary" @click="pauseTimer">
          Pause
        </v-btn>
        <v-btn v-else color="primary" @click="startTimer">
          Start
        </v-btn>
        <v-btn v-show="timerIsStarted" text @click="resetTimer">
          Reset
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FmfCountdownTimer from '@/components/timer/FmfCountdownTimer.vue'
import moment from 'moment'
import notification from '@/service/notification'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    FmfCountdownTimer
  },

  data() {
    return {
      currentActionIndex: 0
    }
  },

  computed: {
    ...mapState('timer', [
      'currentWorkingTask',
      'taskActionStart',
      'timerIsStarted',
      'currentAction',
      'taskActions'
    ]),
    ...mapGetters('timer', [
      'currentWorkingTaskId',
      'hasCurrentWorkingTask',
      'minutesAndSecondsRemaining'
    ])
  },

  mounted () {
    if (!this.currentAction) {
      this.setAction(this.taskActions.pomo)
    }
    this.currentActionIndex = this.currentAction.index
  },

  methods: {
    ...mapMutations('timer', [
      'setTaskActionStart',
      'setCurrentAction',
      'setCurrentDuration'
    ]),

    ...mapActions('timer', [
      'startCountingDown',
      'stopCountingDown'
    ]),

    startTimer() {
      this.setTaskActionStart(new Date())
      this.startCountingDown(() => {
        this.recordTaskAction()
        this.triggerNotification(`Your ${this.currentAction.human} is complete.`)
        this.setTaskActionStart(null)
        this.setAction(this.currentAction)
      })
    },

    pauseTimer() {
      this.stopCountingDown()
      this.recordTaskAction()
      this.setTaskActionStart(new Date())
    },

    resetTimer() {
      this.stopCountingDown()
      this.recordTaskAction()
      this.setTaskActionStart(null)
      this.setAction(this.currentAction)
    },

    setAction(action) {
      this.setCurrentAction(action)
      this.setCurrentDuration(moment.duration(action.duration, 's'))
      this.currentActionIndex = this.currentAction.index
    },

    recordTaskAction() {
      this.$store.dispatch('task/createTaskAction', {
        id: this.currentWorkingTaskId,
        start: this.taskActionStart,
        end: new Date(),
        action: this.currentAction.type
      })
    },

    triggerNotification(message) {
      notification.notify(message)
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
