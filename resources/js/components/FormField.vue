<template>
  <default-field
    :field="field"
    :errors="errors">
    <template slot="field">
      <div
        v-if="field.type && field.type === 'video'"
        class="card relative border border-lg border-50 overflow-hidden px-0 py-0 mb-4">
        <video
          class="block w-full"
          controls="controls"
          :src="filePath" />
      </div>
      <div
        v-else-if="field.type && field.type === 'audio'"
        class="relative overflow-hidden px-0 py-0 mb-4">
        <audio
          controls
          :src="filePath">
          Your browser does not support the audio element.
        </audio>
        <video
          class="block w-full"
          controls="controls"
          :src="filePath" />
      </div>
      <div
        class="card relative border border-lg border-50 overflow-hidden px-0 py-0 mb-4"
        v-else-if="value">
        <img
          :src="imagePath"
          class="block w-full"
          alt="">
      </div>

      <p class="my-4 text-80 text-xs">
        {{ value }}
      </p>

      <input
        :id="field.name"
        type="file"
        ref="file"
        class="w-full form-control form-input form-input-bordered hidden"
        :class="errorClasses"
        :placeholder="field.name"
        :accept="accept"
        @change="handleChange">
      <div class="flex items-center">
        <button
          class="btn btn-default btn-primary inline-flex items-center relative mr-2"
          :disabled="busy"
          @click.prevent="openFileField">
          Upload File
        </button>
        <button
          class="btn btn-default btn-primary inline-flex items-center relative mr-2"
          :disabled="busy"
          @click.prevent="libraryModalOpen = !libraryModalOpen">
          Media Library
        </button>
      </div>
      <div
        v-if="uploadProgress > 0 && busy"
        class="text-70 text-sm mt-1">
        Uploading... {{ uploadProgress }}%
      </div>

      <div
        class="help-text error-text mt-2 text-danger"
        v-if="!error">
        {{ error }}
      </div>

      <modal :open="libraryModalOpen">
        <media-library
          :base-url="field.previewUrl"
          @select="handleImageSelection"
          @close="libraryModalOpen = false" />
      </modal>
    </template>
  </default-field>
</template>

<script>
import axios from "axios"
import Vapor from "laravel-vapor"
import { FormField, HandlesValidationErrors } from "laravel-nova"
import Modal from "./Modal"
import MediaLibrary from "./MediaLibrary"

export default {
  mixins: [FormField, HandlesValidationErrors],

  props: ["resourceName", "resourceId", "field"],

  data () {
    return {
      uploadProgress: 0,
      busy: false,
      path: null,
      error: null,
      libraryModalOpen: false
    }
  },

  components: {
    Modal,
    MediaLibrary
  },

  methods: {
    /*
      * Set the initial, internal value for the field.
      */
    setInitialValue() {
      this.value = this.field.value || ""
    },

    /**
     * Fill the given FormData object with the field's internal value.
     */
    fill(formData) {
      formData.append(this.field.attribute, this.value || "")
    },

    /**
     * Update the field's internal value.
     */
    handleChange() {
      this.busy = true

      Vapor.store(this.$refs.file.files[0], {
        progress: progress => {
          this.uploadProgress = Math.round(progress * 100)
        }
      })
      /*
      .then(response => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (file) => {
            var image = new Image()
            image.src = file.target.result

            image.onload = function() {
              response.width = this.width
              response.height = this.height

              resolve(response)
            }
          }

          reader.readAsDataURL(this.$refs.file.files[0])
        })
      })
      */
      .then(response => {
        return axios.post("/nova-custom/upload", {
          uuid: response.uuid,
          key: response.key,
          bucket: response.bucket,
          name: this.$refs.file.files[0].name,
          width: response.width,
          height: response.height,
          content_type: this.$refs.file.files[0].type
        })
      })
      .catch(e => {
        this.error = "Upload process failed."
      })
      .then(response => {
        this.value = response.data.path
        this.busy = false
      })
      .catch((e) => {
        this.error = "File validation failed."
        this.busy = false
      })
    },

    openFileField () {
      this.$refs.file.click()
    },

    handleImageSelection (item) {
      this.libraryModalOpen = false
      this.value = item.path
    }
  },

  computed: {
    accept () {
      switch (this.field.type) {
        case "image":
          return "image/*"
        case "video":
          return "video/mp4"
        case "audio":
          return "audio/*"
        default:
          return ""
      }
    },

    imagePath () {
      return `${this.field.previewUrl}/${this.value}?w=400&q=100&auto=format&fit=fill`
    },

    filePath () {
      return `${this.field.previewUrl}/${this.value}`
    }
  }
}
</script>
