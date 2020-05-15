<template>
  <div class="ae-w-full ae-bg-white ae-p-6 ae-px-8 ae-rounded-sm">
    <h2 class="ae-text-gray-700 ae-text-2xl ae-leading-tight">
      Media Library
    </h2>

    <div
      class="ae-flex ae-flex-wrap ae--ml-2 ae--mr-2 ae-my-8 ae-overflow-y-auto ae-h-screen"
      style="max-height: 700px;"
      @scroll="handleScroll"
      ref="medias">
      <div
        v-for="(item,index) in data"
        :key="index"
        class="ae-px-2 ae-pb-4 ae-w-3/12">
        <button
          @click.prevent="selectImage(item)"
          class="ae-block ae-w-full ae-bg-white ae-border ae-border-gray-300 ae-shadow-md ae-overflow-hidden ae-p-4 ae-rounded-sm hover:ae-bg-gray-100">
          <div
            class="ae-bg-gray-300 ae-object-contain ae-pb-full ae-bg-contain ae-bg-no-repeat ae-bg-center"
            :style="{ 'background-image': `url('${baseUrl}/${item.path}?w=240&fit=crop&q=80')`}" />

          <div class="ae-py-2">
            {{ item.ext }}
          </div>
        </button>
      </div>
      <div
        class="ae-w-full ae-p-4 ae-flex ae-items-center ae-justify-center"
        v-if="fetching">
        <loader />
      </div>
    </div>

    <div class="ae-mt-6 ae--ml-8 ae--mr-8 ae--mb-6 ae-p-6 ae-px-8 ae-bg-gray-300">
      Close

      <button @click.prevent="logScrollpos">
        Scrollpos
      </button>
    </div>
  </div>
</template>

<script>
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
      fetching: false
    }
  },

  methods: {
    selectImage (item) {
      console.log("emit selectimage", item)
      this.$emit("select", item)
    },

    handleScroll () {
      let scrolled = this.$refs.medias.scrollTop + this.$refs.medias.offsetHeight

      if (scrolled === this.$refs.medias.scrollHeight) {
        this.fetchMoreResults()
      }
    },

    fetchMedia (after = "") {
      if (this.fetching === true) return
      this.fetching = true
      window.axios.get(`/nova-custom/media?after=${after}`)
        .then(response => {
          response.data.data.map(item => {
            this.data.push(item)
          })
          this.fetching = false
          console.log("res", response.data.data)
          console.log("data", this.data)
        })
    },

    fetchMoreResults () {
      let lastElement = this.data[this.data.length - 1]
      this.fetchMedia(lastElement.id)
    },

    logScrollpos () {
      let scrolled = this.$refs.medias.scrollTop + this.$refs.medias.offsetHeight
      console.log("scrolled", scrolled)

      console.log("el", this.$refs.medias)
      console.log("scrolltop", this.$refs.medias.scrollTop)
      console.log("scrollheight", this.$refs.medias.scrollHeight)
      console.log("medias", this.$refs)
    }
  }
}
</script>
