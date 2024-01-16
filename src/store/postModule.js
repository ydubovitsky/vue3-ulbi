import axios from "axios";

export const postModule = {
  state: () => ({
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title?.includes(state.searchQuery)
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setIsPostsLoading(state, isLoading) {
      state.isPostsLoading = isLoading;
    },
    setPagination(state, arg) {
      state.pagination = {
        ...state.pagination,
        arg
      }
    },
    setSearchQuery(state, query) {
      state.searchQuery = query
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setIsPostsLoading', true)
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.pagination.page,
              _limit: state.pagination.limit,
            },
          }
        );
        // Set new pagination value
        // 101 / 10 = 11 (Math.ceil)
        commit('setPagination', {
          totalPages: Math.ceil(
            response.headers["x-total-count"] / this.pagination.limit
          )
        })
        // set new posts
        commit('setPosts', response.data.map((post) => ({
          ...post,
          text: post.body,
        })))
      } catch (e) {
        alert("Error");
      } finally {
        commit('setIsPostsLoading', false)
      }
    },
    async fetchMorePosts({ state, commit }) {
      commit('setPagination', {
        page: state.pagination.page + 1
      })
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.pagination.page,
              _limit: state.pagination.limit,
            },
          }
        );

        // Set new pagination options
        // 101 / 10 = 11 (Math.ceil)
        commit('setPagination', {
          totalPages:
            this.pagination.totalPages = Math.ceil(
              response.headers["x-total-count"] / this.pagination.limit
            )
        })

        // set posts
        commit('setPosts', [
          ...state.posts,
          ...response.data.map((post) => ({
            ...post,
            text: post.body,
          }))
        ])
      } catch (e) {
        alert("Error");
      }
    },
  },
  namespaced: true
}