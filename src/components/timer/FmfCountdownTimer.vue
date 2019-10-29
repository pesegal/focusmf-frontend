<template>
  <div class="FmfCountdownTimer">
    <div class="display-4">
      {{ formattedTime }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: Object,
      required: true
    }
  },
  computed: {
    minutes() { return this.time.minutes.toString() },
    seconds() { return this.time.seconds.toString() },
    formattedTime() {
      return `${this.minutes.padStart(2, '0')}:${this.seconds.padStart(2, '0')}`
    }
  }
}
</script>
