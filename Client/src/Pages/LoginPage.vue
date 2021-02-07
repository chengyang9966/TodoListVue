<template>
  <div>
    <h1 class="msg">{{ msg }}</h1>
    <!-- <input
      class="todo-input"
      type="string"
      required
      autocomplete="on"
      placeholder="Name"
      v-model="AccountData.Name"
    /> -->
    <input
      class="todo-input"
      type="email"
      required
      autocomplete="on"
      placeholder="Email"
      v-model="AccountData.email"
    />
    <input
      class="todo-input"
      type="password"
      autocomplete="on"
      placeholder="password"
      v-model="AccountData.password"
    />
    <div class="buttonBlock">
      <input
        @click="submit()"
        type="submit"
        value="Login"
        class="btn btn-primary btn-block"
      />
      <input
        type="submit"
        value="Forget Password"
        class="btn btn-danger btn-block"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import * as Types from "../Store/types";
import Auth from "../Store/Auth";
export default {
  name: "LoginPage",

  data() {
    return {
      msg: "Login ",
      TodayDate: moment(new Date()).format("YYYY-MM-DD"),
      DefaultValue: "",
      AccountData: {
        // Name: "",
        password: "",
        email: ""
      }
    };
  },
  methods: {
    submit() {
      Auth.disptach({
        type: Types.LOGIN,
        payload: this.AccountData
      });
    }
  }
};
</script>

<style>
.msg {
  color: white;
  text-transform: uppercase;
}
.todo-input {
  width: 80%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  color: rgb(255, 255, 255);
  border: 1px solid #ccc;
  background-color: #161d6f;
  border: 1px solid #161d6f;
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  border-radius: 20px;
  outline: 0;
  -webkit-appearance: none;
}
.todo-input:focus {
  outline: 0;
  border-color: #339933;
}

.buttonBlock {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}
.btn {
  display: inline-block;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
  border-radius: 20px;
}
.btn-block {
  display: block;
  width: 20%;
}
.btn-primary {
  background: #003699;
  color: #fff;
}
.btn-danger {
  background: #dc3545;
  color: #fff;
}
</style>
