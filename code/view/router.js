import Vue from 'vue';
import VueRouter from 'vue-router';
import krRouterInput from 'kr-vue/router/router-input';
import krRouter from 'kr-vue/router/router';
Vue.use(VueRouter);
export default new VueRouter(krRouterInput({
    // 默认路由配置
    routes:[
        // {path:'/finance-report',redirect:'/finance-report'},
        // {path:'/organization',redirect:'/organization'},
        // {path:'/investor',redirect:'/investor'},
    ]
},krRouter));
