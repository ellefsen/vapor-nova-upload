<template>
  <li>
    <button
      class="ae-block ae-w-full ae-text-left hover:ae-bg-gray-200 ae-border-b ae-border-gray-400 ae-py-3 ae-px-2 ae-pr-4 focus:ae-outline-none"
      :class="{ 'ae-bg-blue-200 hover:ae-bg-blue-200': selected === node.id }"
      @click.prevent="$emit('select', node)">
      {{ node.name }}
    </button>

    <ul
      v-if="node.children_recursive && node.children_recursive.length"
      class="ae-list-none ae-p-0 ae-pl-4">
      <node
        v-for="(child,cIndex) in node.children_recursive"
        :node="child"
        :key="cIndex"
        :selected="selected"
        @select="$emit('select', $event)" />
    </ul>
  </li>
</template>

<script>
export default {
  name: "Node",

  props: {
    node: {
      type: Object,
      default () {
        return {}
      }
    },

    selected: {
      type: [String,Number],
      default () {
        return null
      }
    }
  }
}
</script>
