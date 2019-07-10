<template>
  <v-container>
    <v-layout
      align-center
      justify-center
      row
      fill-height
    >
      <v-flex
        xs12
        sm6
      >
        <v-form>
          <v-text-field
            id="username-input-field"
            v-model="email"
            label="E-mail"
            required
          />
          <v-text-field
            id="password-input-field"
            v-model="password"
            label="Password"
            type="password"
            required
          />
          <v-btn
            id="login-button"
            color="primary"
            :loading="loading"
            @click="login"
          >
            Login
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
const loginUser = require('@/graphql/loginUser.gql')

@Component
export default class LoginView extends Vue {
  email: string = ''
  password: string = ''
  loading: boolean = false

  async login () {
    this.loading = true
    try {
      const response = await this.$apollo.query({
        query: loginUser,
        variables: {
          email: this.email,
          password: this.password
        }
      })
      this.$store.commit('auth/setAuth', response.data.loginUser.token)
      this.loading = false
      this.$router.push(this.$route.params.afterLoginTakeTo || '/dashboard/tasks')
    } catch (e) {
      this.loading = false
    }
  }
}
</script>
