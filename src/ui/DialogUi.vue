<template>
  <div class="dialog" v-if="isVisible" @click="closeDialog">
    <div class="content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";
export default {
  name: "DialogUi",
  mixins: [toggleMixin]
};
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(102, 102, 102, 0.534);
  position: fixed;
  display: flex;
}

.content {
  margin: auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
}
</style>