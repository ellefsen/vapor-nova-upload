<template>
  <modal :open="showMoveDialog">
    <div class="ae-m-10 ae-p-8 lg:ae-py-20 ae-flex ae-items-center ae-justify-center ae-absolute ae-inset-0">
      <div class="ae-w-full ae-h-full ae-overflow-y-auto ae-max-w-3xl ae-bg-white ae-rounded-md ae-shadow-lg">
        <pre>{{ formData }}</pre>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from "./Modal.vue"

export default {
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  components: {
    Modal
  },

  data () {
    return {
      formData: {
        files: [],
        media_category_id: null
      }
    }
  },


}
</script>
