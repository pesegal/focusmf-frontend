<template>
  <v-container>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8 md6>
        <v-form>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>

          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>

          <v-btn>Login</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      password: null
    }
  }
}
</script>
