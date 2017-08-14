import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Root from 'view';
import router from 'view/router';
import store from 'store';
Vue.use(ElementUI)

new Vue({
    router,
    store,
    components:{
        'root':Root
    },
    template:'<root/>'
}).$mount('#app');