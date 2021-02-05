<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>

    <div class="innerDiv">
      <h1>{{ msg }}</h1>
      <div class="DateTime">
        <span>Today's tasks</span>
        <span>{{ TodayDate }}</span>
      </div>
      <div v-for="todo in Todos" :key="todo.id" class="todoItem">
        <div class="todo-item-left">
          <div class="round">
            <div
              type="checkbox"
              @click="completeTasks(todo)"
              :class="{
                checkboxComplete: todo.completed
              }"
            >
              <div
                :class="{
                  labelComplete: todo.completed,
                  label: !todo.completed
                }"
              ></div>
            </div>
          </div>

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
          />
        </div>
        <div
          class="removeItem"
          :class="{ removeItemHidden: todo.completed }"
          @click="removeTodo(todo.id)"
        >
          &times;
        </div>
      </div>
      <CardComponent Title="Add" :Click="SetNewItem" @method="CloseDialog" />

      <div class="CountItem">
        {{ Todos.filter(x => !x.completed).length }}{{ " "
        }}{{
          Todos.filter(x => !x.completed).length > 1
            ? "Remaning Tasks"
            : "Remaning Task"
        }}
        <div class="CountTime">{{ TodayTime }}</div>
      </div>

      <div class="CountItem ">
        <div
          class="IndividualBtn"
          @click="All()"
          :class="{
            ActiveButton: TotalItem > 0
          }"
        >
          All
        </div>
        <div
          @click="Active()"
          class="IndividualBtn"
          :class="{
            ActiveButton:
              Todos.filter(x => !x.completed).length === Todos.length &&
              TotalItem === 0
          }"
        >
          Active
        </div>
        <div
          @click="Completed()"
          class="IndividualBtn"
          :class="{
            ActiveButton: Todos.filter(x => x.completed).length === Todos.length
          }"
        >
          Completed
        </div>
      </div>
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
import CardComponent from "../components/CardComponents";
export default {
  name: "TodoList",
  components: {
    CardComponent
  },
  computed: {
    ...mapState({
      Todos: function(state) {
        if (state.Active.length > 0) {
          return state.Active;
        }
        if (state.Completed.length > 0) {
          return state.Completed;
        } else {
          return state.todos;
        }
      },
      TotalItem: function(state) {
        return state.TotalItem;
      }
    })
  },

  data() {
    return {
      msg: `Main Focus for today`,
      TodayDate: `${moment(new Date()).format("DD/MM/YYYY")}`,
      TodayTime: `${moment(new Date()).format("HH:mm A")}`,
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
    completeTasks(todo) {
      console.log(todo);
      todo.completed = !todo.completed;
      store.dispatch({
        type: type.completeTasks,
        action: todo
      });
    },
    All() {
      store.dispatch({
        type: type.All
      });
    },
    Active() {
      store.dispatch({
        type: type.Active
      });
    },
    Completed() {
      store.dispatch({
        type: type.Completed
      });
    },
    // add new item
    OpenDialog() {
      this.SetNewItem = true;
    },
    CloseDialog() {
      this.SetNewItem = false;
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
.DateTime {
  display: flex;
  font-size: 18px;
  text-transform: uppercase;
  padding: 10px 0;
  margin-left: 70px;
  margin-bottom: 10px;
  margin-right: 70px;
  color: #333456;
  justify-content: space-between;
}

.round {
  position: relative;
}
.label:hover {
  background-color: #373168;
}

.label {
  background-color: #0a043c;
  border: 3px solid #66bb6a;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  left: 0;
  position: absolute;
  top: 6px;
  width: 28px;
}

.labelComplete {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: "";
  height: 6px;
  left: 7px;
  opacity: 0;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 12px;
  opacity: 1;
}

.checkboxComplete {
  background-color: #66bb6a;
  border: 3px solid #66bb6a;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  left: 0;
  position: absolute;
  top: 6px;
  width: 28px;
}

.todo-input:focus {
  outline: 0;
}
.todoItem {
  margin: 0px 70px 15px 70px;
  display: flex;
  align-items: center;
  background-color: #0a043c;
  justify-content: space-between;
  border: 1px solid #0a043c;
  padding: 10px;
  padding-right: 20px;
  border-radius: 30px;
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
  justify-content: center;
}
.todo-item-label {
  padding: 10px;
  margin-left: 30px;
}
.todo-item-label:hover {
  color: #80ffdb;
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
  color: #bbbfca;
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
.checkbox {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: red;
  display: inline-block;
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

/* footer */
.CountItem {
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 80px;
}

.CountTime {
  font-size: 15px;
  cursor: pointer;
}

.IndividualBtn:hover {
  color: #80ffdb;
}
.IndividualBtn {
  color: #333456;
}
.ActiveButton {
  color: white;
}
</style>
