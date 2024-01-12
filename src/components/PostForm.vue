<template>
  <form class="post-form" @submit.prevent>
    <InputUi
      v-model="post.title"
      v-focus
      class="input-post-title"
      type="text"
      placeholder="Название поста"
    />
    <InputUi
      v-model="post.text"
      class="input-post-text"
      type="text"
      placeholder="Текст поста"
    />
    <ButtonUi @click="create">Добавить</ButtonUi>
  </form>
</template>

<script>
export default {
  name: "PostForm",
  data() {
    return {
      post: {
        title: "",
        text: "",
      },
    };
  },
  methods: {
    create() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        text: ''
      };
    },
  },
};
</script>

<style>
.post-form {
  display: flex;
  gap: 10px;
}

.btn-post {
  padding: 10px;
}
</style>