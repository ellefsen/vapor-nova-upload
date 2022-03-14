<template>
  <div class="ae-media-lib ae-w-full ae-bg-white ae-p-6 ae-px-8 ae-rounded-md ae-shadow-lg ae-overflow-hidden ae-flex ae-flex-col ae-relative">
    <div class="ae-flex ae-justify-between ae-items-center ae-mx-2">
      <h2 class="ae-text-gray-700 ae-text-2xl ae-leading-tight">
        Media Library
      </h2>
      <div class="ae-w-1/2 ae--mt-2 ae-pl-4 ae-mr-4">
        <input
          v-model="search"
          ref="input"
          class="ae-block ae-appearance-none ae-w-full ae-bg-white ae-border ae-border-gray-300 ae-px-4 ae-py-3 ae-pr-8 ae-rounded-sm ae-leading-tight ae-focus:outline-none ae-focus:shadow-outline ae-text-gray-800"
          type="text"
          placeholder="Filter by filename"
          @focus="$emit('focus')">
      </div>
      <button
        @click.prevent="$emit('close')"
        class="ae-bg-gray-800 hover:ae-bg-gray-600 ae-text-white ae-px-4 ae-py-3 ae-rounded-sm ae-font-semibold">
        Close
      </button>
    </div>

    <div class="ae-flex ae-justify-start ae-mt-2 ae-mx-2">
      <a
        href="#"
        @click.prevent="view = 'file'"
        class="ae-uppercase ae-text-sm ae-font-bold ae-mr-2 ae-no-underline"
        :class="{ 'ae-text-black': view == 'file', 'ae-text-gray-500': view != 'file'}">All</a>
      <a
        href="#"
        @click.prevent="view = 'category'"
        class="ae-uppercase ae-text-sm ae-font-bold ae-mr-2 ae-no-underline"
        :class="{ 'ae-text-black': view == 'category', 'ae-text-gray-500': view != 'category'}">Folders</a>
    </div>

    <file-view
      v-if="view === 'file'"
      :search="search"
      :base-url="baseUrl"
      @open="showMediaPanel"
      @select="selectMedia" />
    <category-view
      v-else-if="view === 'category'"
      :base-url="baseUrl"
      :field-value="fieldValue"
      @addMedia="$emit('addMedia', $event)"
      @open="showMediaPanel"
      @select="selectMedia" />

    <media-panel
      :open="mediaPanelVisible"
      :base-url="baseUrl"
      :active-media="activeMedia"
      @select="selectMedia"
      @update="handleMediaUpdate"
      @close="mediaPanelVisible = false" />
  </div>
</template>

<script>
import MediaPanel from "./MediaPanel.vue"
import CategoryView from "./CategoryView.vue"
import FileView from "./FileView.vue"

export default {
  props: {
    baseUrl: {
      type: String,
      default: null
    },

    fieldValue: {
      type: String,
      default: null
    },

    media: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  components: {
    MediaPanel,
    CategoryView,
    FileView
  },

  data () {
    return {
      fetching: false,
      search: null,
      mediaPanelVisible: false,
      activeMedia: null,
      view: "category"
    }
  },

  methods: {
    selectMedia (item) {
      this.$emit("select", item)
    },

    showMediaPanel (item) {
      this.activeMedia = item
      this.mediaPanelVisible = true
    },

    handleMediaUpdate (item) {
      this.activeMedia = item
    }
  },

  watch: {
    search () {
      this.data = []
      this.view = "file"
    },

    media (value) {
      this.showMediaPanel(value)
    }
  }
}
</script>

<style lang="css">
  .ae-media-lib {
    height: calc(100vh - 5rem);
  }
</style>
