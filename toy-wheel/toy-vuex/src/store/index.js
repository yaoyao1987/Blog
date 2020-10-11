import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 1
  },
  mutations: {
    syncChange(state, payload) {
      state.age += payload;
    }
  },
  actions: {
    syncChange({ commit }, payload) {
      commit("syncChange", payload);
    }
  },
  modules: {
    a: {
      state: {
        age: "a100"
      },
      getters: {
        get_a(state) {
          return state.age + "getter";
        }
      },
      mutations: {
        syncChange(state, payload) {
          console.log("a");
        }
      }
    },
    b: {
      state: {
        age: "b100"
      },
      mutations: {
        syncChange(state, payload) {
          console.log("b");
        }
      },
      modules: {
        c: {
          state: {
            age: "c100"
          },
          mutations: {
            syncChange(state, payload) {
              console.log("c");
            }
          }
        }
      }
    }
  },
  getters: {}
});