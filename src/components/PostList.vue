<template>
  <div class="posts" v-if="posts.length > 0">
    <h1>Список постов</h1>
    <div class="post-list">
      <transition-group name="post-list">
        <PostItem
          v-for="post in posts"
          :post="post"
          :key="post.id"
          @removeByClick="$emit('remove', post.id)"
        />
      </transition-group>
    </div>
  </div>
  <h2 v-else>There are no posts</h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  name: "PostList",
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deletePostById(id) {
      this.$emit("deletePostById", id);
    },
  },
};
</script>

<style>
.posts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>