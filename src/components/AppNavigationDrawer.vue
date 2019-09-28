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
        link
        @click="onClickNavigationItem(item)"
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
            :input-value="isDark"
            @change="toggleTheme"
            class="ml-3"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'

type AppNavigationDrawerLinkInterface = {
  title: string,
  icon: string,
  to: string
}

@Component
export default class AppNavigationDrawer extends Vue {
  @Prop({ default: false }) showDrawer?: boolean
  @Prop({ default: false }) isDark?: boolean

  items: Array<AppNavigationDrawerLinkInterface> = [
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

  onClickNavigationItem(item: object) {}

  @Emit()
  toggleTheme (isDark: boolean): void  {}

  @Emit()
  updateDrawerDisplayState (showDrawer: boolean): void {}
}
</script>
