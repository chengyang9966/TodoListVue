<template>
  <div class="container">
    <div class="innerDiv">
      <h1>{{ msg }} {{ Name }}</h1>
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
                checkboxComplete: todo.completed,
                CompletedTasks: TotalItem === 'Completed'
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
            @dblclick="editTodo(todo)"
            class="todo_item_label"
            :class="{
              completed: TotalItem === 'Completed' ? false : todo.completed
            }"
          >
            {{ todo.title }}
          </div>
          <div class="Day">
            {{ getDay(todo.DueTime) }}
          </div>

          <CardComponent
            Title="Edit"
            :Click="SetNewItem"
            @method="SetCloseDialog"
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
      <CardComponent Title="Add" :Click="OpenDialog" @method="CloseDialog" />

      <div
        class="CountItem"
        :class="{ HideCountItem: Todos.filter(x => !x.completed).length === 0 }"
      >
        {{ Todos.filter(x => !x.completed).length }}{{ " "
        }}{{
          Todos.filter(x => !x.completed).length > 1
            ? "Remaining Tasks"
            : "Remaining Task"
        }}
        <div class="CountTime">{{ timestamp }}</div>
      </div>

      <div class="CountItem ">
        <div
          class="IndividualBtn"
          @click="All()"
          :class="{
            ActiveButton: TotalItem === 'All'
          }"
        >
          All
        </div>
        <div
          @click="Active()"
          :disable="DisableStatus === 'Active'"
          class="IndividualBtn"
          :class="{
            ActiveButton: TotalItem === 'Active',
            HideCountItem: Todos.filter(x => !x.completed).length === 0
          }"
        >
          Active
        </div>
        <div
          @click="Completed()"
          class="IndividualBtn"
          :class="{
            ActiveButton: TotalItem === 'Completed'
          }"
        >
          Completed
        </div>
      </div>
    </div>
    <button @click="SetOpenDialog()" class="btn-default float">
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
  created() {
    setInterval(this.getNow, 1000);
  },
  computed: {
    ...mapState({
      Todos: function(state) {
        if (state.Active.length > 0) {
          return state.Active.sort((a, b) => {
            b.DueTime - a.DueTime;
          });
        }
        if (state.Completed.length > 0) {
          return state.Completed.sort((a, b) => {
            b.DueTime - a.DueTime;
          });
        } else {
          return state.todos
            .sort(function(a, b) {
              return a.completed - b.completed;
            })
            .sort((a, b) => {
              b.DueTime - a.DueTime;
            });
        }
      },
      TotalItem: function(state) {
        return state.TotalItem;
      },
      DisableStatus: function(state) {
        console.log(this.$store.state.DisableStatus);
        return state.DisableStatus;
      }
    })
  },

  data() {
    return {
      msg: "",
      Name: "Cheng Yang",
      TodayDate: `${moment(new Date()).format("DD/MM/YYYY")}`,
      newTodo: "",
      timestamp: "",
      beforeEdit: "",
      OpenDialog: false,
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
    getNow() {
      const today = new Date();
      const time = moment(today).format("HH:mm");
      const AM = moment(new Date()).format("A");
      const dateTime = time + " " + AM;
      this.timestamp = dateTime;
      AM === "AM"
        ? (this.msg = "Good Morning, ")
        : (this.msg = "Good Evening, ");
    },
    getDay(date) {
      if (date === new Date() || date === "") {
        return null;
      }

      return moment(date).format("ddd");
    },
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
      if (todo.completed === true) {
        return;
      } else {
        this.SetNewItem = true;
        this.beforeEdit = todo.title;
        todo.editing = true;
        store.dispatch({
          type: type.editTodo,
          action: todo
        });
      }
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
      todo.editing = false;
    },
    removeTodo(id) {
      store.dispatch({
        type: type.removeTodo,
        action: id
      });
    },
    completeTasks(todo) {
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
    SetOpenDialog() {
      console.log("HIi");
      this.OpenDialog = true;
    },
    CloseDialog() {
      this.OpenDialog = false;
    },
    SetCloseDialog() {
      this.SetNewItem = false;
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
.CompletedTasks {
  display: none;
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
.todo_item_label {
  padding: 10px;
  margin-left: 30px;
  color: #fff;
}
.Day {
  padding: 10px;
  margin-left: 30px;
  color: #fff;
  position: fixed;
  right: 18vw;
}
.CompletedTasksTitle {
  color: #fff;
}
.todo_item_label:hover {
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
.completed:hover {
  color: #bbbfca;
}

.checkbox {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: red;
  display: inline-block;
}

/* footer */
.CountItem {
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 80px;
}
.HideCountItem {
  display: none;
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

@media only screen and (max-width: 600px) {
  h1 {
    font: 14px sans-serif;
  }
  .DateTime {
    display: block;
  }
  .todoItem {
    margin: 0;
    margin-bottom: 10px;
  }
  .todo_item_label {
    overflow: hidden;
    white-space: nowrap;
    padding: 10px;
    width: 100px;
    text-overflow: ellipsis;
  }
  .CountItem {
    margin: 20px 0px;
  }
  .Day {
    position: fixed;
    right: 20vw;
  }
}
@media only screen and (min-width: 1000px) {
  .Day {
    position: fixed;
    right: 15vw;
  }
}
@media only screen and (min-width: 1500px) {
  .Day {
    position: fixed;
    right: 10vw;
  }
}
</style>
