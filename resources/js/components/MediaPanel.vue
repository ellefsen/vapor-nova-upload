<template>
  <div>
    <div
      v-if="open"
      class="ae-absolute ae-z-10 ae-inset-0 ae-bg-black ae-bg-opacity-25 ae-cursor-pointer"
      @click.prevent="$emit('close')" />
    <div
      class="ae-absolute ae-z-10 ae-top-0 ae-right-0 ae-bg-gray-900 ae-h-full ae-w-full ae-max-w-3xl xl:ae-max-w-4xl ae-transform ae-transition-transform ae-duration-150 ae-ease-in-out ae-flex ae-flex-col"
      :class="{ 'ae-translate-x-full': !open }">
      <div
        class="ae-overflow-hidden ae-overflow-y-auto ae-h-full"
        v-if="open">
        <div class="ae-relative ae-preview">
          <figure class="ae-absolute ae-bg-black ae-w-full ae-h-full ae-mx-auto">
            <video
              v-if="['video/mp4', 'video/webm'].includes(activeMedia.content_type)"
              class="ae-object-contain ae-w-full ae-h-full"
              controls="controls"
              :src="`${baseUrl}/${activeMedia.path}`" />
            <img
              v-else
              :src="`${baseUrl}/${activeMedia.path}?w=800&fit=crop&q=80`"
              class="ae-object-contain ae-w-full ae-h-full"
              loading="lazy">
          </figure>
        </div>

        <div class="ae-p-10 ae-pb-24">
          <div class="ae-grid ae-gap-6 ae-text-white">
            <div>
              <span class="ae-block ae-rounded-sm ae-text-xs ae-leading-none ae-uppercase ae-font-bold ae-truncate ae-mb-2">Name</span>
              <div
                v-if="!editMode"
                class="ae-flex ae-items-center">
                <span>{{ activeMedia.name }}</span>
                <span class="ae-ml-4">
                  <button
                    @click.prevent="editMode = !editMode"
                    class="ae-w-6 ae-h-6 ae-bg-gray-800 ae-flex ae-items-center ae-justify-center ae-text-white ae-rounded-sm focus:ae-outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </span>
              </div>
              <div v-else>
                <input
                  v-model="formData.name"
                  ref="input"
                  class="ae-block ae-appearance-none ae-w-full ae-bg-gray-300 ae-border ae-border-transparent focus:ae-outline-none ae-px-4 ae-py-3 ae-pr-8 ae-rounded-sm ae-leading-tight ae-text-gray-800 ae-mt-4"
                  type="text"
                  placeholder="Name">
              </div>
            </div>
            <div v-if="false">
              <span class="ae-block ae-rounded-sm ae-text-xs ae-leading-none ae-uppercase ae-font-bold ae-truncate ae-mb-2">Alt Text</span>
              <div
                v-if="!editMode"
                class="ae-relative ae-flex ae-items-center">
                <span v-if="activeMedia.alt_text">{{ activeMedia.alt_text }}</span>
                <span
                  v-else
                  class="ae-text-white ae-text-opacity-50">(not set)</span>
                <span class="ae-ml-4 ">
                  <button
                    @click.prevent="editMode = !editMode"
                    class="ae-w-6 ae-h-6 ae-bg-gray-800 ae-flex ae-items-center ae-justify-center ae-text-white ae-rounded-sm focus:ae-outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </span>
              </div>
              <div v-else>
                <input
                  v-model="formData.alt_text"
                  ref="input"
                  class="ae-block ae-appearance-none ae-w-full ae-bg-gray-300 ae-border ae-border-transparent focus:ae-outline-none ae-px-4 ae-py-3 ae-pr-8 ae-rounded-sm ae-leading-tight ae-text-gray-800 ae-mt-4"
                  type="text"
                  placeholder="Alternative text">
              </div>
            </div>
            <div>
              <button
                v-if="editMode"
                @click.prevent="submit"
                class="ae-bg-gray-800 hover:ae-bg-gray-600 focus:ae-outline-none ae-text-white ae-px-8 ae-py-3 ae-rounded-sm ae-font-semibold">
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
            <div v-if="false">
              <span class="ae-block ae-rounded-sm ae-text-xs ae-leading-none ae-uppercase ae-font-bold ae-truncate ae-mb-2">Width</span>
              <span>{{ activeMedia.width }}</span>
            </div>
            <div v-if="false">
              <span class="ae-block ae-rounded-sm ae-text-xs ae-leading-none ae-uppercase ae-font-bold ae-truncate ae-mb-2">Height</span>
              <span>{{ activeMedia.height }}</span>
            </div>
          </div>
        </div>
        <div class="ae-px-10 ae-py-4 ae-flex-shrink-0 ae-bg-white ae-absolute ae-bottom-0 ae-left-0 ae-w-full">
          <button
            @click.prevent="$emit('select', activeMedia)"
            class="ae-bg-gray-800 hover:ae-bg-gray-600 focus:ae-outline-none ae-text-white ae-px-10 ae-py-3 ae-rounded-sm ae-font-semibold">
            Use
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../utils/eventBus.js"

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
        name: null,
        alt_text: null
      },
      submitting: false,
      editMode: false
    }
  },

  watch: {
    activeMedia (value) {
      this.formData.name = value.name
      this.formData.alt_text = value.alt_text
      this.formData.media_category_id = value.media_category_id
    }
  },

  methods: {
    submit () {
      this.submitting = true
      window.axios.patch(`/nova-custom/media/${this.activeMedia.id}`, this.formData)
        .then((response) => {
          this.$emit("update", response.data.data)
          EventBus.emit("updateMedia", response.data.data)
          this.submitting = false
          this.editMode = false
          this.$emit("close")
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
