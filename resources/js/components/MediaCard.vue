<template>
  <a
    href="#"
    @click.prevent="$emit('open', item)"
    class="hover:ae-border ae-border-gray-300 ae-w-full ae-block ae-no-underline ae-text-black">
    <div class="ae-relative ae-pb-full">
      <figure class="ae-absolute ae-w-full ae-h-full ae-mx-auto">
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
