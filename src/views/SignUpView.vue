<template>
  <div class="SignUpView">
    <v-dialog v-model="dialog" persistent :full-width="true" :hide-overlay="true">
      <v-card>
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field label="Email" placeholder="me@example.com"></v-text-field>
              <span
                class="caption grey--text text--darken-1"
              >This is the email you will use to login to your FocusMF account.</span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field label="Password" type="password"></v-text-field>
              <v-text-field label="Confirm Password" type="password"></v-text-field>
              <span
                class="caption grey--text text--darken-1"
              >Please enter a password for your account</span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-3 text-xs-center">
              <h3 class="title font-weight-light mb-2">Welcome to FocusMF!</h3>
              <v-btn color="info" to="/dashboard">Get Started</v-btn>
            </div>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="step === 1" flat @click="step--">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="step === 3" color="primary" depressed @click="step++">Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      step: 1
    };
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    }
  }
};
</script>
