<template>
  <div class="ae-flex ae-flex-col ae-h-full ae-overflow-y-auto ae-relative">
    <div class="ae-mt-2 ae-pb-2 ae-pl-8 ae-pr-10 ae-shadow-edge ae-sticky ae-top-0 ae-z-10 ae-bg-white">
      <div class="ae-flex ae-items-center ae-justify-start ae-text-sm">
        <div class="ae-grid ae-grid-flow-col ae-gap-1">
          <button
            @click.prevent="showCreateFolderDialog = !showCreateFolderDialog"
            class="ae-font-semibold ae-py-3 ae-px-2 ae-rounded-sm hover:ae-bg-gray-200 ae-text-gray-700 focus:ae-outline-none">
            Create new folder
          </button>
          <button
            @click.prevent="$emit('addMedia', activeCategory ? activeCategory.id : null)"
            class="ae-font-semibold ae-py-3 ae-px-2 ae-rounded-sm hover:ae-bg-gray-200 ae-text-gray-700 focus:ae-outline-none">
            Upload file
          </button>
        </div>
        <transition name="ae-fade">
          <div
            v-if="formData.files.length > 0"
            class="ae-ml-auto">
            <span class="ae-mr-4 ae-inline-block ae-text-gray-700">{{ formData.files.length }} files selected</span>
            <button
              @click.prevent="showMoveDialog = !showMoveDialog"
              class="ae-bg-gray-800 hover:ae-bg-gray-600 ae-text-white ae-px-6 ae-py-3 ae-rounded-sm ae-font-semibold">
              Move
            </button>
          </div>
        </transition>
      </div>
    </div>
    <div
      class="ae-p-12 ae-flex ae-items-center ae-justify-center"
      v-if="fetching">
      <loader />
    </div>
    <div
      v-else
      class="ae-px-8 ae-relative ae-flex-shrink-0 ae-overflow-y-auto">
      <div class="ae-flex ae-text-xl ae-mb-4 ae-px-2 ae-pt-4">
        <a
          v-if="data.parent"
          href="#"
          @click.prevent="fetchCategories(data.parent)"
          class="ae-mr-2 ae-inline-block ae-no-underline hover:ae-underline ae-text-gray-700">{{ data.parent.name }}</a>
        <a
          v-else-if="!data.parent && data.current"
          href="#"
          @click.prevent="fetchCategories"
          class="ae-mr-2 ae-inline-block ae-no-underline hover:ae-underline ae-text-gray-700">Home</a>
        <span v-if="data.current"><span>/</span> {{ data.current.name }}</span>
      </div>
      <div class="ae-flex ae-flex-wrap">
        <template v-if="data.categories.length > 0">
          <div
            v-for="(category,cIndex) in data.categories"
            :key="`cat-${cIndex}`"
            class="ae-px-2 ae-pb-4 ae-w-3/12 lg:ae-w-2/12">
            <a
              href="#"
              @click.prevent="fetchCategories(category)"
              class="ae-w-full ae-block ae-no-underline">
              <div
                class="ae-bg-gray-100 ae-pb-full ae-relative">
                <div class="ae-absolute ae-inset-0 ae-flex ae-justify-center ae-items-center ae-text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="ae-w-full ae-m-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
              </div>
              <div class="ae-p-2 ae-text-center">
                <span class="ae-block ae-rounded-sm ae-text-xs ae-text-gray-700 ae-leading-none ae-uppercase ae-font-bold ae-h-6 overflow-hidden">{{ category.name }}</span>
              </div>
            </a>
          </div>
        </template>
        <template v-if="data.files.length > 0">
          <div
            v-for="(item) in data.files"
            :key="`file-${item.id}`"
            class="ae-px-2 ae-pb-4 ae-w-3/12 lg:ae-w-2/12 ae-relative">
            <media-card
              :item="item"
              :base-url="baseUrl"
              @open="$emit('open', item)"
              @select="$emit('select')" />
            <div class="ae-absolute ae-top-0 ae-left-0 ae-p-2 ae-px-4">
              <input
                v-model="formData.files"
                type="checkbox"
                :id="`file-${item.id}`"
                :value="item.id"
                name="selectedFiles"
                checked>
            </div>
          </div>
        </template>
      </div>
    </div>

    <modal :open="showMoveDialog">
      <div class="ae-m-10 ae-p-8 lg:ae-py-20 ae-flex ae-items-center ae-justify-center ae-absolute ae-inset-0">
        <div class="ae-w-full ae-h-full ae-max-w-3xl ae-bg-white ae-rounded-md ae-shadow-lg ae-flex ae-flex-col ae-justify-between">
          <div class="ae-max-h-128 ae-flex-shrink ae-overflow-auto">
            <category-list-select
              class="ae-p-8"
              v-if="showMoveDialog"
              @select="handleCategorySelection"
              :selected="formData.media_category_id" />
          </div>

          <div class="ae-flex ae-flex-shrink-0 ae-justify-end ae-pt-6 ae-border-t ae-border-gray-300 ae-px-8 ae-pb-6">
            <button
              @click.prevent="showMoveDialog = !showMoveDialog"
              class="ae-bg-gray-400 hover:ae-bg-gray-500 ae-px-6 ae-py-3 ae-rounded-sm ae-font-semibold ae-mr-2">
              Cancel
            </button>
            <button
              :disabled="formData.media_category_id === null || formData.files.length === 0"
              @click.prevent="submitMove"
              :class="{ 'ae-bg-gray-200': formData.media_category_id === null || formData.files.length === 0, 'ae-bg-gray-800 hover:ae-bg-gray-600 ae-text-white': formData.media_category_id !== null && formData.files.length > 0 }"
              class="ae-px-6 ae-py-3 ae-rounded-sm ae-font-semibold">
              Move
            </button>
          </div>
        </div>
      </div>
    </modal>

    <modal :open="showCreateFolderDialog">
      <div class="ae-m-10 ae-p-8 lg:ae-py-20 ae-flex ae-items-center ae-justify-center">
        <div class="ae-w-full ae-overflow-y-auto ae-max-w-3xl ae-bg-white ae-rounded-md ae-shadow-lg ae-p-8">
          <input
            v-model="createFolderFormData.name"
            ref="createFolderInput"
            class="ae-block ae-appearance-none ae-w-full ae-bg-white ae-border ae-border-gray-300 ae-px-4 ae-py-3 ae-pr-8 ae-rounded-sm ae-leading-tight ae-focus:outline-none ae-focus:shadow-outline ae-text-gray-800"
            type="text"
            placeholder="Folder name"
            autofocus>

          <div class="flex justify-end pt-6">
            <button
              @click.prevent="showCreateFolderDialog = !showCreateFolderDialog"
              class="ae-bg-gray-400 hover:ae-bg-gray-500 ae-px-6 ae-py-3 ae-rounded-sm ae-font-semibold ae-mr-2">
              Cancel
            </button>
            <button
              @click.prevent="submitCreateFolder"
              :class="{ 'ae-bg-gray-200': createFolderFormData.name === null, 'ae-bg-gray-800 hover:ae-bg-gray-600 ae-text-white': createFolderFormData.name !== null }"
              class="ae-px-6 ae-py-3 ae-rounded-sm ae-font-semibold">
              Create
            </button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import EventBus from "../utils/eventBus.js"
import MediaCard from "./MediaCard.vue"
import Modal from "./Modal.vue"
import CategoryListSelect from "./CategoryListSelect.vue"
import Loader from "./Loader.vue"

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
  },

  components: {
    CategoryListSelect,
    MediaCard,
    Modal,
    Loader
  },

  created () {
    this.fetchCategories()

    EventBus.on("updateMedia", () => this.fetchCategories(this.activeCategory))
  },

  data () {
    return {
      data: {
        categories: [],
        files: [],
        parent: null,
        current: null
      },
      fetching: false,
      showMoveDialog: false,
      showCreateFolderDialog: false,
      formData: {
        files: [],
        media_category_id: null
      },
      createFolderFormData: {
        name: null
      },
      submittingMove: false,
      activeCategory: null
    }
  },

  methods: {
    fetchCategories (item = null) {
      this.fetching = true
      this.activeCategory = item

      let path = "/nova-custom/media-categories"

      if (item && item.id) {
        path = `/nova-custom/media-categories/${item.id}`
      }

      window.axios.get(path)
        .then(response => {
          this.data = response.data.data
          this.fetching = false
        })
        .catch(() => {
          this.fetching = false
        })
    },

    handleCategorySelection (category) {
      this.formData.media_category_id = category.id
    },

    submitMove () {
      this.submittingMove = true

      window.axios.post("/nova-custom/media-categories/move-files", this.formData)
        .then(() => {
          this.fetchCategories(this.activeCategory)
          this.submittingMove = false
          this.showMoveDialog = false
          this.formData.files = []
          this.formData.media_category_id = null
        })
        .catch(() => {
          this.submittingMove = false
        })
    },

    submitCreateFolder () {
      this.submittingCreateFolder = true

      let categoryId = this.activeCategory ? this.activeCategory.id : null

      window.axios.post("/nova-custom/media-categories", { ...this.createFolderFormData, parent_id: categoryId })
        .then((response) => {
          this.activeCategory = response.data.data
          this.fetchCategories(this.activeCategory)
          this.submittingCreateFolder = false
          this.showCreateFolderDialog = false
          this.createFolderFormData.name = null
        })
        .catch(() => {
          this.submittingCreateFolder = false
        })
    }
  },

  watch: {
    fieldValue () {
      this.fetchCategories(this.activeCategory)
    }
  }
}
</script>
