<template>
  <v-navigation-drawer :value="showDrawer" @input="updateDrawerDisplayState" absolute temporary>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" :to="item.to" @click="onClickNavigationItem(item)" exact>
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-action>
          <v-switch :input-value="isDark" @change="toggleTheme"></v-switch>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-icon>{{ themeIcon }}</v-icon>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'

type LinkInterface = {
  title: string,
  icon: string,
  to: string
}

@Component
export default class AppNavigationDrawer extends Vue {
  @Prop({ default: false }) showDrawer?: boolean
  @Prop({ default: false }) isDark?: boolean

  items: Array<LinkInterface> = [
    {
      title: 'Overview',
      icon: 'dashboard',
      to: '/dashboard'
    },
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

  get themeIcon () {
    return this.isDark ? 'brightness_3' : 'brightness_5'
  }

  onClickNavigationItem(item: object) {}

  @Emit()
  toggleTheme (): void  {}

  @Emit()
  updateDrawerDisplayState (): void {}
}
</script>
