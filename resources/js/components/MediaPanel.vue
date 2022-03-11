<template>
  <div>
    <div
      v-if="open"
      class="ae-absolute ae-inset-0 ae-bg-black ae-bg-opacity-25 ae-cursor-pointer"
      @click.prevent="$emit('close')" />
    <div
      class="ae-absolute ae-top-0 ae-right-0 ae-bg-black ae-h-full ae-w-full ae-max-w-3xl xl:ae-max-w-4xl ae-transform ae-transition-transform ae-duration-150 ae-ease-in-out"
      :class="{ 'ae-translate-x-full': !open }">
      <div v-if="open">
        <div class="ae-relative ae-preview ae-bg-gray-800">
          <figure class="ae-absolute ae-w-full ae-h-full ae-mx-auto">
            <img
              :src="`${baseUrl}/${activeMedia.path}?w=800&fit=crop&q=80`"
              class="ae-object-contain ae-w-full ae-h-full"
              loading="lazy">
          </figure>
        </div>

        <div class="ae-p-10">
          <div class="ae-grid ae-gap-6 ae-text-white">
            <div>
              <span class="ae-block ae-rounded-sm ae-text-xs ae-leading-none ae-uppercase ae-font-bold ae-truncate ae-mb-2">Name</span>
              <span>{{ activeMedia.name }}</span>
              <input
                v-model="formData.name"
                ref="input"
                class="ae-block ae-appearance-none ae-w-full ae-bg-gray-300 ae-border ae-border-transparent focus:ae-outline-none ae-px-4 ae-py-3 ae-pr-8 ae-rounded-sm ae-leading-tight ae-text-gray-800 ae-mt-4"
                type="text"
                placeholder="Name">
              <button
                v-if="formData.name !== activeMedia.name"
                @click.prevent="submit"
                class="ae-bg-gray-800 hover:ae-bg-gray-600 focus:ae-outline-none ae-text-white ae-px-8 ae-py-3 ae-rounded-sm ae-font-semibold ae-mt-2">
                Save
              </button>
            </div>
            <div>
              <span class="ae-block ae-rounded-sm ae-text-xs ae-leading-none ae-uppercase ae-font-bold ae-truncate ae-mb-2">Filename</span>
              <span>{{ activeMedia.path }}</span>
            </div>

            <div>
              <span class="ae-block ae-rounded-sm ae-text-xs ae-leading-none ae-uppercase ae-font-bold ae-truncate ae-mb-2">Original Filename</span>
              <span>{{ activeMedia.uuid }}.{{ activeMedia.ext }}</span>
            </div>
            <div>
              <span class="ae-block ae-rounded-sm ae-text-xs ae-leading-none ae-uppercase ae-font-bold ae-truncate ae-mb-2">Alt Text</span>
              <span>{{ activeMedia.alt_text }}</span>
            </div>
            <div>
              <span class="ae-block ae-rounded-sm ae-text-xs ae-leading-none ae-uppercase ae-font-bold ae-truncate ae-mb-2">Width</span>
              <span>{{ activeMedia.width }}</span>
            </div>
            <div>
              <span class="ae-block ae-rounded-sm ae-text-xs ae-leading-none ae-uppercase ae-font-bold ae-truncate ae-mb-2">Height</span>
              <span>{{ activeMedia.height }}</span>
            </div>
          </div>

          <pre>
        {{ activeMedia }}
        </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },

    baseUrl: {
      type: String,
      default: null
    },

    activeMedia: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      formData: {
        name: null
      },
      submitting: false
    }
  },

  watch: {
    activeMedia (value) {
      this.formData.name = value.name
      this.formData.media_category_id = value.media_category_id
    }
  },

  methods: {
    submit () {
      this.submitting = true
      window.axios.patch(`/nova-custom/media/${this.activeMedia.id}`, this.formData)
        .then((response) => {
          this.$emit("update", response.data.data)
          console.log("success", response)
          this.submitting = false
        })
    }
  }
}
</script>

<style lang="css">
  .ae-preview {
    height: 480px;
  }
</style>
