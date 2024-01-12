<template>
  <div class="post-item">
    <div class="post-content">
      <h3><strong>Название: </strong>{{ post.title }}</h3>
      <p><strong>Описание: </strong> {{ post.text }}</p>
    </div>
    <div class="post-actions">
      <ButtonUi>Edit</ButtonUi>
      <ButtonUi @click="$emit('removeByClick', post.id)">Delete</ButtonUi>
      <ButtonUi @click="$router.push(`/posts/${post.id}`)">See more</ButtonUi>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deletePost(id) {
      this.$emit('deletePost', id)
    }
  }
};
</script>

<style scoped>
.post-item {
  padding: 10px;
  box-shadow: 1px 1px 2px 1px silver;
}
</style>