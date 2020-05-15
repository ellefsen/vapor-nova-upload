<template>
  <div class="ae-loader" />
</template>

<script>
export default {
  mounted () {
    setTimeout(() => {
      this.showSpinner = true
    }, 500)
  },

  data () {
    return {
      showSpinner: false
    }
  }
}
</script>
