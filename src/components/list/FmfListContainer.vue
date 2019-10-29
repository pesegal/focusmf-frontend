<template>
  <div class="FmfListContainer">
    <draggable
      v-model="internalLists"
      class="FmfListContainer__draggable"
      ghost-class="ghost-class-fmf-lists"
      group="fmf-lists"
    >
      <fmf-list
        v-for="(list, index) in internalLists"
        :key="list.id"
        :list="list"
        :delete-disabled="internalLists.length == 1"
        :is-first-position="index == 0"
        :is-last-position="index == (internalLists.length - 1)"
        @list-name-change="onListNameChange"
        @list-deleted="onListDeleted"
      />
    </draggable>
    <div class="FmfListContainer__add-list-button-container">
      <v-btn @click="createList">
        + Add list
      </v-btn>
    </div>
  </div>
</template>

<script>
import FmfList from './FmfList.vue'
import draggable from 'vuedraggable'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default {
  components: {
    FmfList,
    draggable
  },
  props: {
    lists: {
      default () { return [] },
      type: Array
    }
  },
  computed: {
    internalLists: {
      get () {
        return this.lists
      },
      set (lists) {
        let newLists = []
        let updateAllLists = []
        lists.forEach((list, index) => {
          const newList = {
            ...list,
            position: index
          }
          updateAllLists.push(this.$store.dispatch('list/updateList', newList))
          newLists.push(newList)
        })
        this.$store.commit('list/setLists', newLists)
        Promise.all(updateAllLists)
      }
    }
  },
  methods: {
    onListDeleted (id) {
      this.$emit('list-deleted', id)
    },

    createList () {
      this.$emit('list-created')
    },

    onListNameChange (list) {
      this.$emit('list-name-change', list)
    }
  }
}
</script>

<style lang="scss">
.FmfListContainer {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  height: 100%;
  margin-left: 0;
  margin-right: 10px;
  padding: 15px 10px 10px 10px;

  .FmfList {
    flex: 0 0 auto;
  }

  &__add-list-button-container {
    width: 272px;
    height: 100%;
    padding-top: 25px;
    text-align: center;
    border: 2px dashed lightgrey;
    flex: 0 0 auto;
    margin-left: 10px;
  }

  .ghost-class-fmf-lists {
    opacity: 0.35;
    border: 3px dashed gray !important;
  }

  &__row.row {
    height: 100%;
    padding-bottom: 60px;
  }
}
</style>
