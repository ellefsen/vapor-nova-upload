<template>
  <ul class="ae-list-none ae-p-0">
    <node-tree
      v-for="node in data"
      :node="node"
      :key="node.id"
      :selected="selected"
      @select="$emit('select', $event)" />
  </ul>
</template>

<script>
import NodeTree from "./NodeTree.vue"

export default {
  props: {
    selected: {
      type: [String,Number],
      default () {
        return null
      }
    }
  },

  components: {
    NodeTree
  },

  mounted () {
    window.axios.get("/nova-custom/media-categories/list")
      .then(response => {
        this.data = response.data.data
        this.fetching = false
      })
  },

  data () {
    return {
      data: []
    }
  },

  computed: {
    model: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit("input", value)
      }
    }
  }
}
</script>
