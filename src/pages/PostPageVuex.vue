<template>
  <div class="container">
    <div class="">
      <h1>{{ $store.getters.doubleLikes }}</h1>
      <ButtonUi @click="$store.commit('incrementLikes')">Like</ButtonUi>
      <ButtonUi @click="$store.commit('decrementLikes')">Dislike</ButtonUi>
    </div>
    <div class="post-search">
      <h1>Искать посты</h1>
      <InputUi v-model="searchQuery" placeholder="Input post title"></InputUi>
    </div>
    <div class="post-action">
      <div class="post-action-item">
        <h3>Создать новый пост</h3>
        <ButtonUi @click="showDialog">Создать новый пост</ButtonUi>
      </div>
      <div class="post-action-item">
        <h3>Сортировать посты</h3>
        <SelectUi v-model="selectedSort" :options="sortOptions"></SelectUi>
      </div>
    </div>
    <DialogUi v-model:isVisible="dialogModel.isVisible">
      <PostForm @create="createPost" />
    </DialogUi>
    <PostList
      :posts="sortedAndSearchedPosts"
      @remove="removePostById"
      v-if="!isPostsLoading"
    />
    <div class="loader" v-else>
      <h1>Loading...</h1>
    </div>
    <div v-intersection="fetchMorePosts" class="observer"></div>
    <div class="pagination">
      <div class="page-list">
        <div
          class="page-list-item"
          :key="page"
          :class="{
            'page-list-item-current': page === pagination.page,
          }"
          @click="changePage(page)"
          v-for="page in pagination.totalPages"
        >
          {{ page }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "PostPageVuex",
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogModel: {
        isVisible: false,
      },
    };
  },
  methods: {
    ...mapMutations({
      // setPage: 'post/'
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      fetchMorePosts: 'post/fetchMorePosts',
    }),
    createPost(post) {
      this.posts.push(post);
    },
    removePostById(id) {
      this.posts = this.posts.filter((post) => post.id != id);
    },
    showDialog() {
      this.dialogModel.isVisible = true;
    },
    changePage(page) {
      this.pagination.page = page;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  watch: {
    selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        return post1[newValue]?.localeCompare(post2[newValue]);
      });
    },
  },
};
</script>

<style>
.post-action {
  display: flex;
  justify-content: space-between;
}

.post-action-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.page-list {
  display: flex;
  gap: 10px;
}

.page-list-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  padding: 10px;
  min-width: 20px;
  min-height: 20px;
  box-shadow: 1px 1px 1px silver;
}

.page-list-item-current {
  background-color: rgb(182, 182, 182);
  color: white;
  font-weight: bold;
}

.observer {
  height: 30px;
  background-color: aqua;
}
</style>
