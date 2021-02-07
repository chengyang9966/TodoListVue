<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <!-- <LoginPage v-if="Login === false" /> -->
    <PopUp :title="Name" :Click="SetNewItem" @method="CloseDialog" />
    <TodoList :Name="DefaultValue" />
  </div>
</template>

<script>
import TodoList from "./Pages/TodoList";
import PopUp from "./components/PopUp";
// import LoginPage from "./Pages/LoginPage";
export default {
  name: "App",
  components: {
    TodoList,
    PopUp
    // LoginPage
  },
  data() {
    return {
      SetNewItem: true,
      Name: "What is your Name?",
      DefaultValue: ""
    };
  },
  mounted: {},
  methods: {
    CloseDialog(Value) {
      this.SetNewItem = false;
      this.DefaultValue = Value;
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
  text-align: center;
  color: #2c3e50;
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
@media only screen and (max-width: 400px) {
  #app {
    margin-top: 0px;
  }
  .float {
    width: 40px;
    height: 40px;
  }
  .my-float {
    font-size: 30px;
  }
}
@media only screen and (max-width: 600px) {
  #app {
    margin-top: 0px;
  }
  .float {
    width: 50px;
    height: 50px;
  }
  .my-float {
    font-size: 40px;
  }
}
</style>
