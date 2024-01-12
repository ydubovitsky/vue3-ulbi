<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" name="" id="">
</template>

<script>
  export default {
    name: "InputUi",
    props: {
      modelValue: [String, Number]
    },
    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
</script>

<style scoped>
  .input {
    padding: 5px;
  }
</style>