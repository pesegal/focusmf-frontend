<template>
<div class="WelcomeView">
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to FocusMF!
        </h1>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row fill-height>
      <v-btn color="primary" to="/sign-up">
        Sign Up
      </v-btn>
      <v-btn flat to="/login">
        Login
      </v-btn>
    </v-layout>
  </v-container>
</div>
</template>
