import Vue from 'vue';
import Vuex from 'vuex';
import krStoreModule from 'kr-vue/store/module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:krStoreModule
});