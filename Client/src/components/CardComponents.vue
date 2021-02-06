<template>
  <div id="myModal" class="modal" :class="{ modal_open: Click }">
    <!-- Modal content -->

    <div class="modal-content">
      <button @click="method()" class="close">
        &times;
      </button>
      <p>{{ Title }} {{ IndividualItem.title }}</p>
      <div class="Input_Div">
        <input
          @input="$emit('update')"
          class="todo-input"
          type="text"
          autocomplete="on"
          placeholder="Todo List For Today"
          v-model="IndividualItem.title"
        />
        <input
          class="todo-input"
          type="text"
          autocomplete="on"
          placeholder="Desription"
          v-model="IndividualItem.description"
        />
        <input
          type="date"
          class="todo-input"
          autocomplete="on"
          :min="TodayDate"
          v-model="IndividualItem.DueTime"
        />
      </div>
      <button
        @click="submit(IndividualItem)"
        @mouseup="submit(IndividualItem)"
        :disabled="
          IndividualItem.title === '' ||
            IndividualItem.title === null ||
            IndividualItem.title === undefined
        "
        class="submit_button"
      >
        {{ Title }} Your Things
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import * as Types from "../Store/types";
import store from "../Store/store";
export default {
  name: "CardComponent",
  props: {
    Title: String,
    Click: Boolean
  },
  data() {
    return {
      TodayDate: moment(new Date()).format("YYYY-MM-DD"),
      DefaultValue: ""
    };
  },
  computed: mapState({
    IndividualItem: function(state) {
      return state.individualItem;
    }
  }),

  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    method() {
      this.$emit("method");
      store.dispatch({
        type: Types.cancelCard
      });
    },
    submit(IndividualItem) {
      switch (this.Title) {
        case "Add":
          IndividualItem.id = IndividualItem.id + 1;
          store.dispatch({
            type: Types.addTodo,
            action: IndividualItem
          });
          this.$emit("method");
          break;
        case "Edit":
          this.$emit("method");
          store.dispatch({
            type: Types.EditTodoCard,
            action: IndividualItem
          });
          break;
      }
    }
  }
};
</script>

<style>
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
