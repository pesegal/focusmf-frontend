<template>
  <div class="SignUpView">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title class="title font-weight-regular justify-space-between">
              <span v-show="step !== 4">{{ currentTitle }}</span>
              <v-avatar
                v-show="step !== 4"
                color="primary lighten-2"
                class="subheading white--text"
                size="24"
                v-text="step"
              ></v-avatar>
            </v-card-title>

            <v-window v-model="step">
              <v-window-item :value="1">
                <v-card-text>
                  <v-text-field label="Email" placeholder="me@example.com" v-model="account.email"></v-text-field>
                  <span
                    class="caption grey--text text--darken-1"
                  >This is the email you will use to login to your FocusMF account.</span>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="2">
                <v-card-text>
                  <v-text-field label="Password" type="password" v-model="account.password"></v-text-field>
                  <v-text-field label="Confirm Password" type="password"></v-text-field>
                  <span
                    class="caption grey--text text--darken-1"
                  >Please enter a password for your account</span>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="3">
                <v-card-text>
                  <v-text-field label="First Name" v-model="account.firstName"></v-text-field>
                  <v-text-field label="Last Name" v-model="account.lastName"></v-text-field>
                  <v-text-field label="Birthday" v-model="account.dateOfBirth"></v-text-field>
                  <span class="caption grey--text text--darken-1">Please enter your information</span>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="4">
                <div class="pa-3 text-xs-center">
                  <h3 class="title font-weight-medium mb-2">Welcome to FocusMF!</h3>
                  <v-btn color="info" to="/dashboard">Get Started</v-btn>
                </div>
              </v-window-item>
            </v-window>

            <v-divider v-show="step < 4"></v-divider>

            <v-card-actions>
              <v-btn v-show="step > 1 && step < 4" flat @click="step--">Back</v-btn>
              <v-spacer></v-spacer>
              <v-btn v-show="step === 3" color="primary" depressed @click="register" :loading="registeringAccount">Register</v-btn>
              <v-btn v-show="step < 3" color="primary" depressed @click="step++">Next</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Component from 'vue-class-component'
import gql from 'graphql-tag'

export default {
  data () {
    return {
      dialog: true,
      step: 1,
      account: {
        email: 'test@example.com',
        password: '12345678',
        firstName: 'Test',
        lastName: 'McTester',
        dateOfBirth: '2019-02-02'
      },
      registeringAccount: false
    }
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Create a password";
        case 3:
          return "Information";
        default:
          return "Account created!";
      }
    }
  },

  methods: {
    async register () {
      this.registeringAccount = true
      try {
        const response = await this.$apollo.mutate({
          mutation: gql`mutation ($email: String!, $password: String!) {
            createUser(userData: {
              email: $email,
              password: $password
            }) {
              email
            }
          }`,

          variables: {
            email: this.account.email,
            password: this.account.password
          }
        })
      } catch (e) {
        this.registeringAccount = false;
        return false;
      }
      this.step++;
      return true;
    }
  }
}
</script>
