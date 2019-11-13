import lodash from 'lodash'

export default {
  namespaced: true,
  state: {
    currentWorkingTask: null,
    taskActionStart: null,
    timerIsStarted: false,
    countdownId: null,
    currentDuration: null,
    currentAction: null,
    taskActions: {
      pomo: { type: 'pomodoro', duration: 5, index: 0, human: 'Pomodoro' },
      shortBreak: { type: 'short_break', duration: 3, index: 1, human: 'Short Break' },
      longBreak: { type: 'long_break', duration: 4, index: 2, human: 'Long Break' }
    }
  },
  getters: {
    currentWorkingTaskId: (state) => {
      return lodash.get(state, 'currentWorkingTask.id')
    },
    hasCurrentWorkingTask: (state) => state.currentWorkingTask != null,
    minutesAndSecondsRemaining: (state) => {
      return {
        minutes: state.currentDuration ? state.currentDuration.minutes() : '0',
        seconds: state.currentDuration ? state.currentDuration.seconds() : '0'
      }
    }
  },
  mutations: {
    setCurrentWorkingTask(state, task) {
      state.currentWorkingTask = task
    },
    setTimerIsStarted(state, timerIsStarted) {
      state.timerIsStarted = timerIsStarted
    },
    setTaskActionStart(state, taskActionStart) {
      state.taskActionStart = taskActionStart
    },
    setCurrentDuration(state, duration) {
      state.currentDuration = duration
    },
    setCurrentAction(state, action) {
      state.currentAction = action
    },
    countDownOnCurrentDuration(state) {
      state.currentDuration.subtract(1, 'seconds')
    },
    setCountDownId(state, id) {
      state.countdownId = id
    }
  },
  actions: {
    startCountingDown ({ state, dispatch, commit }, done) {
      const countDownId = setInterval(() => {
        commit('countDownOnCurrentDuration')
        dispatch('updateDocumentTitle')
        if (state.currentDuration.asSeconds() <= 0) {
          dispatch('stopCountingDown')
          done()
        }
      }, 1000)

      commit('setCountDownId', countDownId)
      commit('setTimerIsStarted', true)
    },
    stopCountingDown ({ state, commit, dispatch }) {
      clearInterval(state.countdownId)
      commit('setTimerIsStarted', false)
      commit('setCountDownId', null)
      dispatch('updateDocumentTitle')
    },
    updateDocumentTitle ({ state, getters }) {
      const minutesDisplay = getters.minutesAndSecondsRemaining.minutes.toString().padStart(2, '0')
      const secondsDisplay = getters.minutesAndSecondsRemaining.seconds.toString().padStart(2, '0')
      document.title =  `${state.currentAction.human} - ${minutesDisplay}:${secondsDisplay}`
    }
  }
}
