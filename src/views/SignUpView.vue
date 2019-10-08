<template>
  <div class="SignUpView">
    <v-container>
      <v-layout
        align-center
        justify-center
        row
      >
        <v-flex
          xs12
          sm6
        >
          <v-card>
            <v-card-title class="title font-weight-regular justify-space-between">
              <span v-show="step !== 4">{{ currentTitle }}</span>
              <v-avatar
                v-show="step !== 4"
                color="primary lighten-2"
                class="subheading white--text"
                size="24"
                v-text="step"
              />
            </v-card-title>

            <v-window v-model="step">
              <v-window-item :value="1">
                <v-form v-model="emailFormIsValid">
                  <v-card-text>
                    <v-text-field
                      id="email-input"
                      v-model="account.email"
                      label="Email"
                      placeholder="me@example.com"
                      :rules="[rules.required('Email'), rules.email]"
                    />
                    <span
                      class="caption grey--text text--darken-1"
                    >This is the email you will use to login to your FocusMF account.</span>
                  </v-card-text>
                </v-form>
              </v-window-item>

              <v-window-item :value="2">
                <v-form v-model="passwordFormIsValid">
                  <v-card-text>
                    <v-text-field
                      id="account-password"
                      v-model="account.password"
                      label="Password"
                      type="password"
                      :rules="[rules.password]"
                    />
                    <v-text-field
                      id="account-password-confirm"
                      v-model="account.confirmPassword"
                      label="Confirm Password"
                      type="password"
                      :rules="[rules.matchesPassword]"
                    />
                    <span
                      class="caption grey--text text--darken-1"
                    >Please enter a password for your account</span>
                  </v-card-text>
                </v-form>
              </v-window-item>

              <v-window-item :value="3">
                <v-form v-model="demographicFormIsValid">
                  <v-card-text>
                    <v-text-field
                      id="account-first-name-text-field"
                      v-model="account.firstName"
                      label="First Name"
                      :rules="[rules.max(50)]"
                    />
                    <v-text-field
                      id="account-last-name-text-field"
                      v-model="account.lastName"
                      label="Last Name"
                      :rules="[rules.max(50)]"
                    />
                    <v-text-field
                      id="account-date-of-birth-text-field"
                      v-model="account.dateOfBirth"
                      label="Birthday"
                    />
                    <span class="caption grey--text text--darken-1">Please enter your information</span>
                  </v-card-text>
                </v-form>
              </v-window-item>

              <v-window-item :value="4">
                <div class="pa-3 text-xs-center">
                  <h3 class="title font-weight-medium mb-2">
                    Welcome to FocusMF!
                  </h3>
                  <v-btn
                    color="info"
                    to="/dashboard/tasks"
                  >
                    Get Started
                  </v-btn>
                </div>
              </v-window-item>

              <v-window-item :value="4 && errorWithRegisteringAccount">
                <div class="pa-3 text-xs-center">
                  <h3 class="title font-weight-medium mb-2">
                    Uh oh!
                  </h3>
                  <h4>Looks like there was an issue registering your account.</h4>
                  <v-btn
                    color="info"
                    to="/sign-up"
                  >
                    Start again
                  </v-btn>
                </div>
              </v-window-item>
            </v-window>

            <v-divider v-show="step < 4" />

            <v-card-actions>
              <v-btn
                v-show="step > 1 && step < 4"
                text
                @click="step--"
              >
                Back
              </v-btn>
              <v-spacer />
              <v-btn
                v-show="step === 3"
                id="register-button"
                color="primary"
                depressed
                :loading="registeringAccount"
                @click="register"
              >
                Register
              </v-btn>
              <v-btn
                v-show="step < 3"
                id="next-step-button"
                color="primary"
                depressed
                :disabled="!isCurrentFormValid"
                @click="step++"
              >
                Next
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
const createUser = require('@/graphql/createUser.gql')

export default {
  data () {
    return {
      dialog: true,
      step: 1,
      account: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        dateOfBirth: ''
      },
      registeringAccount: false,
      rules: {
        required: (fieldName) => {
          return (value) => {
            return !!value || `${fieldName} is required.`
          }
        },
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Hey dude, bad e-mail.'
        },
        password: (value) => {
          return (!!value && value.length >= 8) || 'Minimum password length is 8.'
        },
        matchesPassword: (value) => {
          return (!!value && value === this.account.password) || 'Passwords don\'t match'
        },
        max: (length) => {
          return (value) => {
            return (!!value && value.length <= length) || `Max length is ${length} characters.`
          }
        }
      },
      emailFormIsValid: false,
      passwordFormIsValid: false,
      demographicFormIsValid: false,
      errorWithRegisteringAccount: false
    }
  },

  computed: {
    currentTitle() {
      switch (this.step) {
      case 1:
        return 'Sign-up'
      case 2:
        return 'Create a password'
      case 3:
        return 'Information'
      default:
        return 'Account created!'
      }
    },

    isCurrentFormValid () {
      switch (this.step) {
      case 1:
        return this.emailFormIsValid
      case 2:
        return this.passwordFormIsValid
      case 3:
        return this.demographicFormIsValid
      default:
        return false
      }
    }
  },

  methods: {
    async register () {
      this.registeringAccount = true
      try {
        const response = await this.$apollo.mutate({
          mutation: createUser,
          variables: {
            email: this.account.email,
            password: this.account.password,
            first_name: this.account.firstName,
            last_name: this.account.lastName,
            dateofbirth: (new Date(this.account.dateOfBirth).toISOString())
          }
        })
        this.$store.commit('auth/setAuth', response.data.createUser.token)
      } catch (e) {
        this.registeringAccount = false
        this.errorWithRegisteringAccount = true
        return false
      }
      this.step++
      return true
    }
  }
}
</script>
