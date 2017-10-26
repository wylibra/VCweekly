import Vue from 'vue';
import VueRouter from 'vue-router';
import krRouterInput from 'kr-vue/router/router-input';
import krRouter from 'kr-vue/router/router';

import home from './home/index.vue'
import homeindex from './homeindex/index.vue'
import lp from './lp/index.vue'
import org from './org/index.vue'
import gp from './gp/index.vue'
import fund from './fund/index.vue'

import finance from './finance-report/index.vue'
import industry from './industry/index.vue'
import investor from './investor/index.vue'
import organization from './organization/index.vue'
import redashData from './redashData/index.vue'

Vue.use(VueRouter);

let routes =[
    {
        path: '/finance-report',
        component: finance,
        name: '',
        hidden: true
    },
    {
        path: '/industry',
        component: industry,
        name: '',
        hidden: true
    },
    {
        path: '/investor',
        component: investor,
        name: '',
        hidden: true
    },
    {
        path: '/organization',
        component: organization,
        name: '',
        hidden: true
    },
    {
        path: '/redashData',
        component: redashData,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: home,
        name: '',
    },
    {
        path: '/',
        self_path: '/',
        component: home,
        name: '首页',
        iconCls: 'el-icon-setting',
        children: [{
                path: 'homeindex',
                self_path: '/homeindex',
                component: homeindex,
                name: '首页'
            }
        ]
    },
    {
        path: '/lp',
        self_path: '/lp',
        component: home,
        name: 'LP',
        iconCls: 'el-icon-setting',
        children: [{
                path: 'list',
                self_path: '/lp/list',
                component: lp,
                name: 'LP列表'
            }
        ]
    },
    {
        path: '/org',
        self_path: '/org',
        component: home,
        name: 'ORG',
        iconCls: 'el-icon-menu',
        children: [{
                path: 'list',
                self_path: '/org/list',
                component: org,
                name: '机构列表'
            }
        ]
    },
    {
        path: '/gp',
        self_path: '/gp',
        component: home,
        name: 'GP',
        iconCls: 'el-icon-picture',
        children: [{
                path: 'list',
                self_path: '/gp/list',
                component: gp,
                name: 'GP列表'
            }
        ]
    },
    {
        path: '/fund',
        self_path: '/fund',
        component: home,
        name: '基金',
        iconCls: 'el-icon-setting',
        children: [{
                path: 'list',
                self_path: '/fund/list',
                component: fund,
                name: '基金列表'
            }
        ]
    }
];

export default new VueRouter({
    // 默认路由配置
    routes
    // routes:[
    //     {path:'/',redirect:'/home'},
    // ]
// }));
});
