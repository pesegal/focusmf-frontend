<template>
    <div class="FmfCountdownTimer">
        <div class="display-4">{{ formattedTime }}</div>
    </div>
</template>

<script>
    // Duration object from moment.js and countdown
    export default {
        props: {
            time: {
                type: Object,
                required: true
            }
        },
        // When duration reachs 0 then emit a notice of completion
        computed: {
            minutes() { return this.time.minutes.toString() },
            seconds() { return this.time.seconds.toString() },
            formattedTime() {
                return `${this.minutes.padStart(2, "0")}:${this.seconds.padStart(2, "0")}`
            }
        }
    }
</script>

<style lang="scss">

</style>
