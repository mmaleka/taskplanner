import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorization: '',
    jwt: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    username2: '',
    endpoints: {
      obtainJWT: 'api-food_delivery/api/token/',
      refreshJWT: 'api-food_delivery/api/token/refresh/',
      // baseURL: 'http://127.0.0.1:8000/',
      baseURL: 'https://try-coding.herokuapp.com/'
    },
    categories_data: [],
    todos_data: [],
    loggedIn: '',
    registered: '',
  },
  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem('token', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('token');
      state.jwt = null;
    },
    updateUsername(state, username) {
      localStorage.setItem('username', username);
      state.jwt = username;
    },
    loginSuccess(state, username) {
      state.loggedIn = true;
      state.username = username;
      state.jwt = localStorage.getItem('token');
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.username = null;
    },
    registerSuccess(state) {
      state.registered = true;
      state.jwt = localStorage.getItem('token');
    },
    registerFailure(state) {
      state.registered = false;
    },

    addCategories(state, cat_data) {
      state.categories_data = cat_data;
    },

    addToDos(state, todos_data) {
      state.todos_data = todos_data;
    },
  },
  getters: {
    isLoggedIn: state => !!state.jwt,
    userName: state => state.username2,
    userjwt: state => state.jwt,
    userName1: state => state.username,
    loggedIn: state => state.loggedIn,

    all_categories: state => state.categories_data,
    all_todos: state => state.todos_data,
  },
  actions: {
    obtainToken({ commit }, user) {
      const username = user.username
      axios.post(this.state.endpoints.baseURL + this.state.endpoints.obtainJWT, user)
        .then((res) => {
          commit('updateToken', res.data.access);
          commit('updateUsername', username);
          const token = res.data.token;
          axios.defaults.headers.common['Authorization'] = token
          this.state.username2 = username
          commit('loginSuccess', username)
          router.push('/');
          Vue.$toast.open("Login successful", {
            timeout: 2000
          });
        })
        .catch((err) => {
          commit('loginFailure')
          console.log("login failer: ", err);

          if (err.response.data.username) {
            Vue.$toast.error(err.response.data.username[0], {
              timeout: 2000
            });
          } else if (err.response.data.email) {
            Vue.$toast.error(err.response.data.email[0], {
              timeout: 2000
            });
          } else if (err.response.data.password) {
            Vue.$toast.error(err.response.data.password[0], {
              timeout: 2000
            });
          } else if (err.response.data.detail) {
            Vue.$toast.error(err.response.data.detail, {
              timeout: 2000
            });
          } else {
            Vue.$toast.error(err.response.data, {
              timeout: 2000
            });
          }


        })
    },
    newRegister({ commit }, registerdata) {
      const { username, first_name, email, password, password_confirm } = registerdata;
      axios.post(this.state.endpoints.baseURL + 'api-food_delivery/auth/accounts/register/', {
        username,
        first_name,
        email,
        password,
        password_confirm
      })
        .then(res => {
          this.dispatch('obtainToken', { username, password });
          this.state.username2 = username;
          console.log(res);
          commit('registerSuccess');
          // router.push('/');
          Vue.$toast.open("Registration successful", {
            timeout: 2000
          });
        })
        .catch(err => {
          this.commit('registerFailure')
          console.log("err: ", err.response.data);

          if (err.response.data.username) {
            Vue.$toast.error(err.response.data.username[0], {
              timeout: 2000
            });
          } else if (err.response.data.email) {
            Vue.$toast.error(err.response.data.email[0], {
              timeout: 2000
            });
          } else if (err.response.data.password) {
            Vue.$toast.error(err.response.data.password[0], {
              timeout: 2000
            });
          } else if (err.response.data.password_confirm) {
            Vue.$toast.error(err.response.data.password_confirm[0], {
              timeout: 2000
            });
          } else {
            Vue.$toast.error(err.response.data, {
              timeout: 2000
            });
          }



        })
    },


    fetchCatergories({ commit }) {
      axios
        .get(this.state.endpoints.baseURL + 'api-todoitem/api_additemCatergory/')
        .then(res => {
          console.log(res)
          commit('addCategories', res.data)
        })
        .catch(err => console.error(err));
    },


    fetchTodos({ commit }, filter_date) {
      axios
        .get(this.state.endpoints.baseURL + 'api-todoitem/api_additemFilterDate/?date=' + filter_date)
        .then(res => {
          commit('addToDos', res.data)
        })
        .catch(err => console.error(err));
    },

    fetchCatergoriesGroup({ commit }) {
      axios
        .get(this.state.endpoints.baseURL + 'api-todoitem/api_additemCatergoryGroup/')
        .then(res => {
          console.log(res)
          commit('addCategories', res.data)
        })
        .catch(err => console.error(err));
    },

    EditItem({ commit }, item_data) {
      console.log(commit);
      let itemId = item_data.itemId
      let itemDone = item_data.itemDone
      let itemItem = item_data.itemItem
      axios
        .patch(this.state.endpoints.baseURL + 'api-todoitem/api_additem_detail/' + itemId + '/', {
          done: itemDone,
          item: itemItem
        })
        .then(res => {
          console.log(res)
          this.dispatch('fetchCatergories')
        })
        .catch(err => console.error(err));
    },

    DeleteItem({ commit }, item_data) {
      let itemId = item_data.itemId
      console.log(commit);
      axios
        .delete(this.state.endpoints.baseURL + 'api-todoitem/api_additem_detail/' + itemId + '/')
        .then(res => {
          console.log(res);
          this.dispatch('fetchCatergories');
          Vue.$toast.open("Deleted", {
            timeout: 2000
          });
        })
        .catch(err => console.error(err));
    },

    AddItem({ commit }, item_data) {
      console.log(commit);
      let itemItem = item_data.itemItem
      let date = item_data.date
      let group = item_data.group
      console.log("group in add item: ", group);
      axios
        .post(this.state.endpoints.baseURL + 'api-todoitem/api_additem/', {
          category: group,
          user: 1,
          item: itemItem,
          due_date: date
        })
        .then(res => {
          console.log(res)
          this.dispatch('fetchCatergories')
          Vue.$toast.open("Item Added", {
            timeout: 2000
          });
        })
    },

  },
  modules: {
  }
})
