<template lang="">
  <div class="app">
    <Navbar/>
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: rgb(238, 238, 238);
}

.app {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 50px;
  padding: 10px 50px;
  background-color: white;
}
</style>