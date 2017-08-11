module.exports=[,{
    path:'/finance-report',
    component:function(resolve){
        require.ensure(['view/finance-report'],function(){
            resolve(require('view/finance-report/index.vue').default)
        },'finance-report')
    }
}];