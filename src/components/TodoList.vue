<template>
  <div class="container">
    <div class="innerDiv">
      <h1>{{ msg }}</h1>
      <input
        class="todo-input"
        type="text"
        placeholder="Todo List For Today"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
      <div v-for="todo in Todos" :key="todo.id" class="todoItem">
        <div class="todo-item-left">
          <input type="checkbox" v-model="todo.completed" />
          <div
            v-if="!todo.editing"
            @dblclick="editTodo(todo)"
            class="todo-item-label"
            :class="{ completed: todo.completed }"
          >
            {{ todo.title }}
          </div>

          <CardComponent
            Title="Edit"
            :Click="todo.editing"
            @method="doneEdit(todo)"
          ></CardComponent>
        </div>
        <div
          class="removeItem"
          :class="{ removeItemHidden: todo.completed }"
          @click="removeTodo(todo.id)"
        >
          &times;
        </div>
      </div>
      <CardComponent
        Title="Add"
        :Click="SetNewItem"
        @method="CloseDialog"
      ></CardComponent>
    </div>
    <button @click="OpenDialog()" class="btn-default float">
      <span class="my-float">+</span>
    </button>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import store from "../Store/store";
import * as type from "../Store/types";
import CardComponent from "./CardComponents";
export default {
  name: "TodoList",
  components: {
    CardComponent
  },
  computed: mapState({
    Todos: function(state) {
      if (state.todos.length > 0) {
        return state.todos;
      }
    }
  }),
  data() {
    return {
      msg: `TodoList for ${moment(new Date()).format("DD/MM/YYYY")}`,
      newTodo: "",
      beforeEdit: "",
      SetNewItem: false,
      idForTodo: 3
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
    //function
    addTodo() {
      store.dispatch({
        type: type.addTodo,
        action: {
          id: this.idForTodo + 1,
          title: this.newTodo,
          completed: false
        }
      });
    },
    editTodo(todo) {
      console.log("🚀 ~ file: TodoList.vue ~ line 103 ~ todo", todo);
      this.beforeEdit = todo.title;
      todo.editing = true;
      store.dispatch({
        type: type.editTodo,
        action: todo
      });
      // this.SetNewItem = true;
    },
    cancelEdit(todo) {
      todo.editing = true;
      todo.title = this.beforeEdit;
      store.dispatch({
        type: type.cancelEdit,
        action: todo
      });
    },
    doneEdit(todo) {
      if (todo.title.trim().length === 0) {
        todo.title = this.beforeEdit;
      }
      todo.editing = false;
    },
    removeTodo(id) {
      store.dispatch({
        type: type.removeTodo,
        action: id
      });
    },
    // add new item
    OpenDialog() {
      this.SetNewItem = true;
      console.log(this.SetNewItem);
    },
    CloseDialog() {
      this.SetNewItem = false;
      console.log(this.SetNewItem);
    },
    onChildClick(value) {
      this.SetNewItem = value;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.container {
  align-items: center;
}
.innerDiv {
  margin: 0px 40px;
}
.todo-input {
  width: 80%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}
.todo-input:focus {
  outline: 0;
}
.todoItem {
  margin: 0px 70px 12px 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.removeItem {
  cursor: pointer;
  margin-left: 14px;
}
.removeItemHidden {
  display: none;
  cursor: pointer;
  margin-left: 14px;
}
.removeItem:hover {
  color: black;
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
}
.completed {
  text-decoration: line-through;
  color: grey;
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
  box-shadow: 2px 2px 3px #999;
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
