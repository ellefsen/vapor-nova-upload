<template>
  <div class="ae-pt-6 ae-mt-4 ae-shadow-inner ae--ml-8 ae--mr-8 ae-px-8">
    <div class="ae-flex ae-text-xl ae-mb-4 ae-px-2">
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
    <div class="ae-flex ae-flex-wrap ae-overflow-y-auto ae-h-screen">
      <template v-if="data.categories.length > 0">
        <div
          v-for="(category,cIndex) in data.categories"
          :key="`cat-${cIndex}`"
          class="ae-px-2 ae-pb-4 ae-w-3/12 lg:ae-w-2/12">
          <a
            href="#"
            @click.prevent="fetchCategories(category)"
            class="ae-border ae-border-gray-300 ae-w-full ae-block ae-no-underline">
            <div
              class="ae-bg-gray-200 ae-object-contain ae-pb-full ae-bg-contain ae-bg-no-repeat ae-bg-center"
              :style="{ 'background-image': `url('#')`}" />
            <div class="ae-p-2 ae-text-center">
              <span class="ae-block ae-rounded-sm ae-text-xs ae-text-gray-700 ae-leading-none ae-uppercase ae-font-bold">{{ category.name }}</span>
            </div>
          </a>
        </div>
      </template>
      <template v-if="data.files.length > 0">
        <div
          v-for="(item,fIndex) in data.files"
          :key="`file-${fIndex}`"
          class="ae-px-2 ae-pb-4 ae-w-3/12 lg:ae-w-2/12">
          <media-card
            :item="item"
            :base-url="baseUrl"
            @open="$emit('open', item)"
            @select="$emit('select')" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import MediaCard from "./MediaCard.vue"

export default {
  props: {
    baseUrl: {
      type: String,
      default: null
    },
  },

  components: {
    MediaCard
  },

  created () {
    this.fetchCategories()
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
    }
  },

  methods: {
    fetchCategories (item = null) {
      this.fetching = true

      let path = "/nova-custom/media-categories"

      if (item && item.id) {
        path = `/nova-custom/media-categories/${item.id}`
      }

      window.axios.get(path)
        .then(response => {
          this.data = response.data.data
          this.fetching = false
        })
    }
  }
}
</script>
