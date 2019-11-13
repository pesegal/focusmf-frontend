<template>
  <v-container>
    <v-row>
      <v-img
        :src="require('../assets/logo.svg')"
        class="my-3"
        contain
        height="100"
      />
    </v-row>
    <v-row justify="center">
      <v-col lg="3" md="5" sm="6" cols="10">
        <v-form ref="loginForm" @submit.prevent="login">
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
            type="submit"
          >
            Login
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const loginUser = require('@/graphql/loginUser.gql')

export default {
  data () {
    return {
      email: '',
      password: '',
      loading: false
    }
  },

  methods: {
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
}
</script>
