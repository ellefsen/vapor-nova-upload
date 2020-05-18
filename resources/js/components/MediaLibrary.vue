<template>
  <div class="ae-w-full ae-bg-white ae-p-6 ae-px-8 ae-rounded-sm">
    <div class="ae-flex ae-justify-between ae-items-center ae-mx-2">
      <h2 class="ae-text-gray-700 ae-text-2xl ae-leading-tight">
        Media Library
      </h2>
      <div class="ae-w-1/2 ae--mt-2 ae-pl-4 ae-mr-4">
        <input
          v-model="search"
          ref="input"
          class="ae-block ae-appearance-none ae-w-full ae-bg-white ae-border ae-border-gray-300 ae-px-4 ae-py-3 ae-pr-8 ae-rounded-sm ae-leading-tight ae-focus:outline-none ae-focus:shadow-outline ae-text-gray-800"
          :type="type"
          :disabled="disabled"
          placeholder="Filter by filename"
          @focus="$emit('focus')">
      </div>
    </div>

    <div
      class="ae-flex ae-flex-wrap ae--ml-8 ae--mr-8 ae-px-8 ae-pt-6 ae-mt-4 ae-overflow-y-auto ae-h-screen ae-shadow-inner"
      style="max-height: 700px;"
      @scroll="handleScroll"
      ref="medias">
      <div
        v-for="(item,index) in data"
        :key="index"
        class="ae-px-2 ae-pb-4 ae-w-3/12">
        <button
          @click.prevent="selectImage(item)"
          class="ae-block ae-w-full ae-bg-white ae-border ae-border-gray-300 ae-shadow-sm ae-overflow-hidden ae-p-4 ae-rounded-sm hover:ae-bg-gray-100">
          <div
            class="ae-bg-gray-200 ae-object-contain ae-pb-full ae-bg-contain ae-bg-no-repeat ae-bg-center"
            :style="{ 'background-image': `url('${baseUrl}/${item.path}?w=240&fit=crop&q=80')`}" />

          <div class="ae-pt-3 ae-flex ae-justify-between ae-items-start">
            <div class="ae-overflow-hidden ae-mr-2 ae-text-left">
              <span class="ae-text-sm ae-block ae-text-gray-800 ae-truncate ae-my-px">{{ item.name }}</span>
              <span
                v-if="item.width && item.height"
                class="ae-text-sm ae-block ae-text-gray-600 ae-text-xs">{{ item.width }} x {{ item.height }} px</span>
            </div>
            <span class="ae-inline-block ae-p-1 ae-bg-gray-100 ae-rounded-sm ae-text-xs ae-text-gray-500 ae-leading-none ae-uppercase ae-font-bold">{{ item.ext }}</span>
          </div>
        </button>
      </div>
      <div
        class="ae-w-full ae-p-4 ae-flex ae-items-center ae-justify-center"
        v-if="fetching">
        <loader />
      </div>
    </div>

    <div class="ae--ml-8 ae--mr-8 ae--mb-6 ae-p-6 ae-px-8 ae-bg-gray-300">
      <button
        @click.prevent="$emit('close')"
        class="ae-bg-gray-800 hover:ae-bg-gray-600 ae-text-white ae-px-8 ae-py-3 ae-rounded-lg ae-font-semibold">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash"
import Loader from "./Loader"

export default {
  props: {
    baseUrl: {
      type: String,
      default: ""
    }
  },

  components: {
    Loader
  },

  created () {
    this.fetchMedia()
  },

  data () {
    return {
      data: [],
      fetching: false,
      search: null
    }
  },

  methods: {
    selectImage (item) {
      this.$emit("select", item)
    },

    handleScroll () {
      let scrolled = this.$refs.medias.scrollTop + this.$refs.medias.offsetHeight

      if (scrolled === this.$refs.medias.scrollHeight) {
        this.fetchMoreResults()
      }
    },

    fetchMedia: debounce(function (after = "", search = "") {
      if (this.fetching === true) return
      this.fetching = true
      window.axios.get(`/nova-custom/media?after=${after}&search=${search}`)
        .then(response => {
          response.data.data.map(item => {
            this.data.push(item)
          })
          this.fetching = false
        })
    }, 400),

    fetchMoreResults () {
      let lastElement = this.data[this.data.length - 1]
      this.fetchMedia(lastElement.id, this.search)
    }
  },

  watch: {
    search (value) {
      this.data = []
      this.fetchMedia("", value)
    }
  }
}
</script>
