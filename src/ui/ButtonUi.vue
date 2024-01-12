<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonUi'
}
</script>


<style scoped>
  .button {
    padding: 10px 15px;
  }
</style>