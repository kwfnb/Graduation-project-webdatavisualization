/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-30 04:21:59
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-02 11:52:20
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        opdata1Table: [],
        opdata2Table: []
    },
    getters: {
        opdata1Table: state => state.opdata1Table,
        opdata2Table: state => state.opdata2Table,
    },
    mutations: {
        INIT_DATA(Store, data) {
            this.state.opdata1Table = data[0];
            this.state.opdata2Table = data[1];
            /* this.state.opdata3Table = data[2]; */
        }
    },
    actions: {
        INIT_DATA(Store, data) {
            this.commit("INIT_DATA", data)
        }
    },
    modules: {}
})