<template>
  <div
    class="ae-flex ae-flex-wrap ae-px-8 ae-pt-6 ae-mt-4 ae-overflow-y-auto ae-shadow-inner"
    @scroll="handleScroll"
    ref="medias">
    <div
      v-for="(item,index) in data"
      :key="index"
      class="ae-px-2 ae-pb-4 ae-w-3/12 lg:ae-w-2/12">
      <media-card
        :item="item"
        :base-url="baseUrl"
        @open="$emit('open', item)"
        @select="$emit('select')" />
    </div>
    <div
      class="ae-w-full ae-p-4 ae-flex ae-items-center ae-justify-center"
      v-if="fetching">
      <loader />
    </div>
  </div>
</template>

<script>
import EventBus from "../utils/eventBus.js"
import { debounce } from "lodash"
import Loader from "./Loader.vue"
import MediaCard from "./MediaCard.vue"

export default {
  props: {
    baseUrl: {
      type: String,
      default: null
    },

    search: {
      type: String,
      default: null
    }
  },

  components: {
    Loader,
    MediaCard
  },

  created () {
    this.fetchMedia()

    EventBus.on("updateMedia", () => this.fetchMedia())
  },

  data () {
    return {
      data: [],
      fetching: false,
    }
  },

  methods: {
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
