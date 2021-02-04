import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    newTodo: "",
    beforeEdit: "",
    idForTodo: 3,
    individualItem: {
      id: "",
      title: "",
      description: "",
      completed: false,
      editing: false
    },
    todos: [
      {
        id: 1,
        title: "Test Database",
        description: "This is a test",
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: "Test Database 12",
        description: "",
        completed: false,
        editing: false
      },
      {
        id: 3,
        title: "Test Database",
        description: "",
        completed: false,
        editing: false
      }
    ]
  },

  //Reducer
  mutations: {
    addTodo(state, payload) {
      if (payload.action.title == "") {
        return state;
      } else {
        return (
          (state.todos = [...state.todos, payload.action]),
          (state.idForTodo = state.idForTodo + 1)
        );
      }
    },
    editTodo(state, payload) {
      if (payload.action.completed == true) {
        return state;
      } else {
        return (
          (state.beforeEdit = state.todos.map(x => {
            if (x.id === payload.action.id) {
              return x.title;
            }
          })),
          (state.individualItem = Object.assign({}, payload.action)),
          (state.todos = state.todos.map(x => {
            if (x.id === payload.action.id) {
              return (x = payload.action);
            } else {
              return x;
            }
          }))
        );
      }
    },
    cancelEdit(state, payload) {
      return (
        (state.beforeEdit = state.todos.map(x => {
          if (x.id === payload.action.id) {
            return x.title;
          }
        })),
        (state.todos = state.todos.map(x => {
          if (x.id === payload.action.id) {
            return (x = payload.action);
          } else {
            return x;
          }
        }))
      );
    },
    EditTodoCard(state, payload) {
      console.log(
        "🚀 ~ file: store.js ~ line 93 ~ EditTodoCard ~ payload",
        payload
      );
      return (state.todos = state.todos.map(x => {
        if (x.id === payload.action.id) {
          return payload.action;
        } else {
          return x;
        }
      }));
    },
    removeTodo(state, payload) {
      return (state.todos = state.todos.filter(x => x.id !== payload.action));
    },
    cancelCard(state) {
      return (state.todos = state.todos);
    }
  },
  actions: {
    addTodo(context, payload) {
      context.commit("addTodo", payload);
    },
    editTodo(context, payload) {
      context.commit("editTodo", payload);
    },
    cancelEdit(context, payload) {
      context.commit("cancelEdit", payload);
    },
    removeTodo(context, payload) {
      context.commit("removeTodo", payload);
    },
    EditTodoCard(context, payload) {
      context.commit("EditTodoCard", payload);
    },
    cancelCard(context) {
      context.commit("cancelCard");
    }
  }
});

export default store;
