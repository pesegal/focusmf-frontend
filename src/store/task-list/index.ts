import { Module, MutationTree, ActionTree } from 'vuex'
import { TaskListState } from './state'
import { State as RootState } from '../state'

export default class TaskListStore implements Module<TaskListState, RootState> {
  namespaced: boolean = true
  state: TaskListState = {
      tasks: [
        [
          {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
          {id: 2, name: "Task List Name 2", projects: [], columnPos: 1, notes: "notes 2"},
          {id: 3, name: "Task List Name 3", projects: [], columnPos: 1, notes: "notes 3"},
        ],
        [
          {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
          {id: 2, name: "Task List Name 2", projects: [], columnPos: 1, notes: "notes 2"},
          {id: 3, name: "Task List Name 3", projects: [], columnPos: 1, notes: "notes 3"},
          {id: 4, name: "Task List Name 4", projects: [], columnPos: 1, notes: "notes 4"},
          {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"}
        ],
        [
          {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
          {id: 2, name: "Task List Name 2", projects: [], columnPos: 1, notes: "notes 2"},
          {id: 3, name: "Task List Name 3", projects: [], columnPos: 1, notes: "notes 3"},
          {id: 4, name: "Task List Name 4", projects: [], columnPos: 1, notes: "notes 4"},
          {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
          {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
          {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
          {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
          {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
          {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"},
          {id: 5, name: "Task List Name 5", projects: [], columnPos: 1, notes: "notes 5"}
        ],
        [
          {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
        ],
        [
          {id: 1, name: "Task List Name 1", projects: [], columnPos: 1, notes: "notes"},
        ]
      ]
  }
  mutations: MutationTree<TaskListState> = {
    setTasks (state: TaskListState, tasks: []) {
        state.tasks = tasks
    }
  }

  actions: ActionTree<TaskListState, RootState> = {

  }
}
