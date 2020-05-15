<template>
  <div
    v-if="showModal"
    class="ae-fixed ae-inset-0 ae-flex ae-items-center ae-justify-center ae-z-50">
    <transition
      @before-leave="backdropLeaving = true"
      @after-leave="backdropLeaving = false"
      enter-active-class="transition-all transition-fast ease-out-quad"
      leave-active-class="transition-all transition-fast ease-in-quad"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
      appear
    >
      <div
        v-if="showBackdrop"
        @click="close">
        <div class="ae-absolute ae-inset-0 ae-bg-black ae-opacity-25" />
      </div>
    </transition>

    <transition
      @before-leave="cardLeaving = true"
      @after-leave="cardLeaving = false"
      enter-active-class="transition-all transition-fast ease-out-quad"
      leave-active-class="transition-all transition-fast ease-in-quad"
      enter-class="opacity-0 scale-70"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-70"
      appear
    >
      <div
        v-if="showContent"
        class="ae-relative ae-overflow-y-auto ae-max-h-screen ae-rounded ae-w-full ae-max-w-6xl">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import ModalContent from "./ModalContent"

export default {
  props: ["open"],

  components: {
    ModalContent
  },

  data() {
    return {
      showModal: false,
      showBackdrop: false,
      showContent: false,
      backdropLeaving: false,
      cardLeaving: false,
    }
  },
  created() {
    const onEscape = (e) => {
      if (this.open && e.keyCode === 27) {
        this.close()
      }
    }

    document.addEventListener("keydown", onEscape)

    this.$once("hook:destroyed", () => {
      document.removeEventListener("keydown", onEscape)
    })
  },
  watch: {
    open: {
      handler: function (newValue) {
        if (newValue) {
          this.show()
        } else {
          this.close()
        }
      },
      immediate: true
    },

    leaving(newValue) {
      if (newValue === false) {
        this.showModal = false
        this.$emit("close")
      }
    }
  },

  computed: {
    leaving() {
      return this.backdropLeaving || this.cardLeaving
    }
  },

  methods: {
    show() {
      this.showModal = true
      this.showBackdrop = true
      this.showContent = true
    },

    close() {
      this.showBackdrop = false
      this.showContent = false
    }
  }
}
</script>
