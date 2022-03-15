<template>
  <a
    href="#"
    @click.prevent="$emit('open', item)"
    class="hover:ae-border ae-border-gray-300 ae-w-full ae-block ae-no-underline ae-text-black">
    <div class="ae-bg-gray-100 ae-relative ae-pb-full">
      <div
        v-if="['video/webm', 'video/mp4'].includes(item.content_type)"
        class="ae-absolute ae-inset-0 ae-flex ae-justify-center ae-items-center ae-text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ae-w-full ae-m-8"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <figure
        v-else
        class="ae-absolute ae-w-full ae-h-full ae-mx-auto">
        <img
          :src="`${baseUrl}/${item.path}?w=240&fit=crop&q=80`"
          class="ae-object-contain ae-w-full ae-h-full"
          loading="lazy">
      </figure>
    </div>
    <div class="ae-p-2 ae-text-center">
      <span class="ae-block ae-rounded-sm ae-text-xs ae-text-gray-700 ae-leading-none ae-uppercase ae-font-bold ae-truncate">{{ item.name }}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },

    baseUrl: {
      type: String,
      default: null
    }
  }
}
</script>
