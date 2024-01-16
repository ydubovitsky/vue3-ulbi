<template>
  <div class="navbar">
    <!-- <router-link to="/">Main</router-link>
    <router-link to="about">About</router-link>
    <router-link to="posts">Posts</router-link> -->
    <ButtonUi @click="$router.push('/')">Main</ButtonUi>
    <ButtonUi @click="$router.push('/posts')">Posts</ButtonUi>
    <ButtonUi @click="$router.push('/store')">Post Store</ButtonUi>
    <ButtonUi @click="$router.push('/about')">About</ButtonUi>
  </div>
</template>
<script>
export default {
  name: "Navbar",
};
</script>
<style>
.navbar {
  display: flex;
  gap: 10px;
  background-color: silver;
  padding: 10px;
}
</style>