<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png" />
    <TodoList />
  </div>
</template>

<script>
import TodoList from "./Pages/TodoList";

export default {
  name: "App",
  components: {
    TodoList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 24px;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
