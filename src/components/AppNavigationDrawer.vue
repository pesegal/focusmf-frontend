<template>
  <v-navigation-drawer
    :value="showDrawer"
    absolute
    temporary
    @input="updateDrawerDisplayState"
  >
    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        exact
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-action>
          <v-icon>brightness_2</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-switch
            class="ml-3"
            :input-value="isDark"
            @change="toggleTheme"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    showDrawer: {
      type: Boolean,
      default: false
    },
    isDark: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      items: [
        {
          title: 'Tasks',
          icon: 'view_list',
          to: '/dashboard/tasks'
        },
        {
          title: 'Timer',
          icon: 'alarm',
          to: '/dashboard/timer'
        },
        {
          title: 'Stats',
          icon: 'insert_chart_outlined',
          to: '/dashboard/stats'
        },
        {
          title: 'Settings',
          icon: 'settings_applications',
          to: '/dashboard/settings'
        }
      ]
    }
  },

  methods: {
    toggleTheme (isDark) {
      this.$emit('toggle-theme', isDark)
    },

    updateDrawerDisplayState (showDrawer) {
      this.$emit('update-drawer-display-state', showDrawer)
    }
  }
}
</script>
