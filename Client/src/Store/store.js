import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    newTodo: "",
    beforeEdit: "",
    idForTodo: 1,
    TotalItem: "All",
    individualItem: {
      id: "",
      title: "",
      description: "",
      completed: false,
      editing: false,
      DueTime: ""
    },
    todos: [],
    Completed: [],
    Active: [],
    DisableStatus: ""
  },

  //Reducer
  mutations: {
    addTodo(state, payload) {
      return (
        (state.TotalItem = "All"),
        (state.Completed = []),
        (state.Active = []),
        (state.todos = [...state.todos, payload.action]),
        (state.idForTodo = state.idForTodo + 1),
        (state.individualItem = {
          id: "",
          title: "",
          description: "",
          completed: false,
          editing: false,
          DueTime: ""
        })
      );
    },
    editTodo(state, payload) {
      if (payload.action.completed == true) {
        return state;
      } else {
        return (
          (state.TotalItem = "All"),
          (state.Completed = []),
          (state.Active = []),
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
      return (
        (state.individualItem = {
          id: "",
          title: "",
          description: "",
          completed: false,
          editing: false,
          DueTime: ""
        }),
        (state.todos = state.todos.map(x => {
          if (x.id === payload.action.id) {
            return payload.action;
          } else {
            return x;
          }
        }))
      );
    },
    completeTasks(state, payload) {
      return (
        (state.TotalItem = "All"),
        (state.Active = state.Active.filter(x => x.id !== payload.action.id)),
        (state.todos = state.todos.map(x => {
          if (x.id === payload.action.id) {
            return payload.action;
          } else {
            return x;
          }
        }))
      );
    },
    removeTodo(state, payload) {
      return (state.todos = state.todos.filter(x => x.id !== payload.action));
    },
    cancelCard(state) {
      return (state.todos = state.todos), (state.individualItem = {});
    },
    Active(state) {
      return (
        (state.Active = state.todos.filter(x => !x.completed)),
        (state.Completed = []),
        (state.TotalItem = "Active")
      );
    },
    All(state) {
      return (
        (state.Active = []), (state.Completed = []), (state.TotalItem = "All")
      );
    },
    Completed(state) {
      return (
        (state.Completed = state.todos.filter(x => x.completed)),
        (state.Active = []),
        (state.TotalItem = "Completed")
      );
    }
  },

  //action
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
    completeTasks(context, payload) {
      context.commit("completeTasks", payload);
    },
    Active(context) {
      context.commit("Active");
    },
    Completed(context) {
      context.commit("Completed");
    },
    All(context) {
      context.commit("All");
    },
    cancelCard(context) {
      context.commit("cancelCard");
    }
  }
});

export default store;
