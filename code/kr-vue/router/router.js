module.exports=[,{
    path:'/finance-report',
    component:function(resolve){
        require.ensure(['view/finance-report'],function(){
            resolve(require('view/finance-report/index.vue').default)
        },'finance-report')
    }
},{
    path:'/investor',
    component:require('view/investor/index.vue').default
},{
    path:'/organization',
    component:require('view/organization/index.vue').default
},{
    path:'/industry',
    component:require('view/industry/index.vue').default
},{
    path:'/redashData',
    component:require('view/redashData/index.vue').default
},{
    path:'/home',
    component:function(resolve){
        require.ensure(['view/home'],function(){
            resolve(require('view/home/index.vue').default)
        },'home')
    }
}
,{
    path:'/lp',
    component:require('view/lp/index.vue').default
},{
    path:'/org',
    component:require('view/org/index.vue').default
},{
    path:'/gp',
    component:require('view/gp/index.vue').default
},{
    path:'/fund',
    component:require('view/fund/index.vue').default
}
,{
    path:'/homeindex',
    component:require('view/homeindex/index.vue').default
}];