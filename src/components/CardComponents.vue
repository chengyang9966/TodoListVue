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
          v-model="TodayDate"
        />
      </div>
      <button
        :disabled="
          IndividualItem.title === '' ||
            this.DefaultValue === IndividualItem.title
        "
        @click="Submit(IndividualItem)"
        class="submit_button"
      >
        Add Your Things
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
  created() {
    this.DefaultValue = IndividualItem.Title;
  },
  methods: {
    method() {
      this.$emit("method");
      store.dispatch({
        type: Types.cancelCard
      });
    },
    Submit(IndividualItem) {
      this.$emit("method");
      store.dispatch({
        type: Types.EditTodoCard,
        action: IndividualItem
      });
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
}
.todo-input:focus {
  outline: 0;
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
  padding-top: 100px;
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
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
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
  background-color: #970e0e;
  color: white;
  border: none;
}

.onHold_button {
  display: block;
  margin: auto;
  width: 60%;
  padding: 10px;
  background-color: #d3d3d3;
  color: white;
  border: none;
}

.submit_button:disabled {
  outline: 0;
  background-color: #d3d3d3;
  color: black;
}
</style>
