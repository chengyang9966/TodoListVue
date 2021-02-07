<template>
  <div id="myModal" class="modal" :class="{ modal_open: Click }">
    <!-- Modal content -->

    <div class="modal-content">
      <p class="title">{{ Title }}</p>
      <div class="Input_Div">
        <input
          @input="$emit('update')"
          class="todo-input"
          type="text"
          autocomplete="on"
          placeholder="Whats is your name"
          v-model="DefaultValue"
        />
      </div>
      <button
        @click="submit(DefaultValue)"
        @mouseup="submit(DefaultValue)"
        :disabled="DefaultValue === ''"
        class="submit_button"
      >
        Save Name
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: {
    Title: String,
    Click: Boolean
  },
  data() {
    return {
      DefaultValue: ""
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    submit(DefaultValue) {
      this.$emit("method", DefaultValue);
    }
  }
};
</script>

<style>
.title {
  color: white;
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
/* Card Component */
.modal {
  display: none;
  position: fixed;
  z-index: 2;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal_open {
  display: block;
  position: fixed;
  z-index: 2;
  padding-top: 160px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content */
.modal-content {
  background-color: #595b83;
  margin: auto;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #595b83;
  width: 80%;
}
.Input_Div {
  display: flex;
  flex-direction: column;
  margin-left: 120px;
}
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  background-color: #595b83;
  border: 1px solid #595b83;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.submit_button {
  display: block;
  margin: auto;
  width: 60%;
  padding: 10px;
  background-color: #0a043c;
  color: white;
  border: 1px solid #0a043c;
  border-radius: 15px;
}
.submit_button:hover,
.submit_button:focus {
  color: #80ffdb;
  text-decoration: none;
  cursor: pointer;
}

.submit_button:disabled {
  outline: 0;
  background-color: #d3d3d3;
  border: 1px solid #d3d3d3;
  color: black;
}
@media only screen and (max-width: 600px) {
  .Input_Div {
    margin-left: 35px;
  }
}
@media only screen and (max-width: 400px) {
  .Input_Div {
    margin-left: 15px;
  }
}
</style>
