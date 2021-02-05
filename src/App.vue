<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png" />
    <TodoList
      v-if="!mobileView"
      :OpenDialog="SetNewItem"
      @CloseDialog="CloseDialog"
    />
    <button @click="OpenDialog()" class="btn-default float">
      <span class="my-float">+</span>
    </button>
  </div>
</template>

<script>
import TodoList from "./Pages/TodoList";

export default {
  data: () => {
    return {
      mobileView: true,
      showNav: false
    };
  },
  name: "App",
  components: {
    TodoList
  },
  created() {
    this.handleView();
  },
  data() {
    return {
      SetNewItem: false
    };
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 800;
    },
    OpenDialog() {
      this.SetNewItem = true;
    },
    CloseDialog() {
      this.SetNewItem = false;
    }
  }
};
</script>

<style>
body {
  background-color: #595b83;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 24px;
  text-align: center;

  color: white;
  margin-top: 60px;
}
.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
/* button */
.float {
  text-decoration: none;
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  border-radius: 50px;
  text-align: center;
  border: none;
  /* box-shadow: 2px 2px 3px #999; */
}
.my-float {
  font-size: 50px;
}
.btn-default {
  color: #fff;
  background-color: #0c9;
}
.btn-default:focus,
.btn-default.focus {
  color: #fff;
  background-color: #08aa74;
}
.btn-default:hover {
  color: #fff;
  background-color: #08aa74;
}
.btn-default:active,
.btn-default.active,
.open > .dropdown-toggle.btn-default {
  color: #fff;
  background-color: #08aa74;
}
</style>
