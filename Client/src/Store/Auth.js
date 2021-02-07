import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";
import SetAuthToken from "../utils/setAuthToken";
import Header from "../utils/Header";
//load Vuex
Vue.use(Vuex);

const staticLink = "http://localhost:9200";

const Auth = new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  },
  mutations: {
    USER_LOADED(state, payload) {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.action
      };
    },
    AUTH_ERROR(state, payload) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: payload.action
      };
    },
    REGISTER_FAIL(state, payload) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: payload.action
      };
    },
    LOGIN_FAIL(state, payload) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: payload.action
      };
    },
    REGISTER_SUCCESS(state, payload) {
      localStorage.setItem("token", payload.action.token);

      return {
        ...state,
        ...payload.action,
        isAuthenticated: true,
        loading: false
      };
    },
    LOGIN_SUCCESS(state, payload) {
      localStorage.setItem("token", payload.action.token);

      return {
        ...state,
        ...payload.action,
        isAuthenticated: true,
        loading: false
      };
    },
    LOGOUT(state, payload) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: payload.action
      };
    }
  },
  actions: {
    //Load User
    loadUser: () => {
      if (localStorage.token) {
        SetAuthToken(localStorage.token);
      }
      try {
        const res = axios.get(`${staticLink}/api/auth`);
        context.commit("USER_LOADED", res.data);
      } catch (error) {
        context.commit("AUTH_ERROR");
      }
    },
    register(context, payload) {
      try {
        const res = axios.post(`${staticLink}/api/users`, payload, Header);
        context.commit("REGISTER_SUCCESS", res.data);
      } catch (err) {
        context.commit("REGISTER_FAIL", err.response.data.msg);
      }
    },
    LOGIN(context, payload) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post(`${staticLink}/api/auth`, payload, Header)
          .then(res => {
            const token = res.data.token;

            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            context.commit("LOGIN_SUCCESS", res.data);
            resolve(res);
          })
          .catch(err => {
            context.commit("LOGIN_FAIL", err.response.data.msg);
            context.commit("LOGOUT", payload);
            reject(err);
          });
      });
    },
    LOGOUT(context, payload) {
      context.commit("LOGOUT", payload);
    }
  }
});

//export store module
export default {
  Auth
};
