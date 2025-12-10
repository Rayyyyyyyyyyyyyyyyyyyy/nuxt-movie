<template>
  <div style="padding: 2rem; font-family: system-ui;">
    <h1>{{ error.statusCode }} - {{ error.message }}</h1>
    <pre style="white-space: pre-wrap; margin-top: 1rem;">
{{ error.stack }}
    </pre>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: any
}>()

const error = computed(() => props.error)
</script>
