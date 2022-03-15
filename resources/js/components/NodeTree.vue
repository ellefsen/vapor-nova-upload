<template>
  <li>
    <button
      class="ae-flex ae-items-center ae-w-full ae-text-left hover:ae-bg-gray-200 ae-border-b ae-border-gray-400 ae-py-3 ae-px-2 ae-pr-4 focus:ae-outline-none ae-text-gray-700"
      :class="{ 'ae-bg-blue-200 hover:ae-bg-blue-200': selected === node.id }"
      @click.prevent="$emit('select', node)">
      <span class="ae-mr-2 ae-text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ae-h-5 ae-w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </span>
      <span class="ae-font-bold">{{ node.name }}</span>
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
