<template>
  <div class="WelcomeView">
    <v-container>
      <brand-display />
      <v-layout align-center justify-center row fill-height>
        <v-btn id="welcome-view-sign-up" color="primary" to="/sign-up">
          Sign Up
        </v-btn>
        <v-btn flat to="/login">
          Login
        </v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import BrandDisplay from "@/components/BrandDisplay";

export default {
  components: {
    BrandDisplay
  }
};
</script>
