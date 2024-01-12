<template>
  <div class="container">
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
    <div ref="observer" class="observer"></div>
    <!-- <div class="pagination">
      <div class="page-list">
        <div
          class="page-list-item"
          :key="page"
          :class="{
            'page-list-item-current' : page === pagination.page
          }" 
          @click="changePage(page)"
          v-for="page in pagination.totalPages"
        >
          {{ page }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";

export default {
  name: 'PostPage',
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogModel: {
        isVisible: false,
      },
      pagination: {
        page: 1,
        limit: 10,
        totalPages: 0,
      },
      searchQuery: "",
      posts: [],
      isPostsLoading: true,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "By title" },
        { value: "body", name: "By body" },
      ],
    };
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.pagination.page,
              _limit: this.pagination.limit,
            },
          }
        );
        // 101 / 10 = 11 (Math.ceil)
        this.pagination.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.pagination.limit
        );
        this.posts = response.data.map((post) => ({
          ...post,
          text: post.body,
        }));
      } catch (e) {
        alert("Error");
      } finally {
        this.isPostsLoading = false;
      }
    },
    async fetchMorePosts() {
      this.pagination.page += 1;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.pagination.page,
              _limit: this.pagination.limit,
            },
          }
        );
        // 101 / 10 = 11 (Math.ceil)
        this.pagination.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.pagination.limit
        );
        this.posts = [
          ...this.posts,
          ...response.data.map((post) => ({
            ...post,
            text: post.body,
          })),
        ];
      } catch (e) {
        alert("Error");
      }
    },
  },
  mounted() {
    this.fetchPosts();

    const observerDomEl = this.$refs.observer ;
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const callback = (entries, observer) => {
      if(entries[0].isIntersecting) {
        this.fetchMorePosts();
      }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(observerDomEl)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title?.includes(this.searchQuery)
      );
    },
  },
  watch: {
    selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        return post1[newValue]?.localeCompare(post2[newValue]);
      });
    },
    // pagination: {
    //   handler(page) {
    //     console.log('watch pagination')
    //     this.fetchPosts()
    //   },
    //   deep: true
    // }
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
