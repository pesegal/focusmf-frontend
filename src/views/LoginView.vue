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

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class LoginView extends Vue {
  email: string = ''
  password: string = ''
}
</script>
