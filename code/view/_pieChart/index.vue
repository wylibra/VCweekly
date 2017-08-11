<template>
    <div :class="$style.root">
        <div id="pieChart" style="width: 600px;height:400px;"></div>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default{
        props:{

        },
        components:{
        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                phaseArr: [{
                    name: '天使轮',
                    value: 18
                }, {
                    name: 'Pre-A轮',
                    value: 15
                }, {
                    name: 'A轮',
                    value: 13
                }, {
                    name: 'A+轮',
                    value: 4
                }, {
                    name: 'B轮',
                    value: 9
                }, {
                    name: 'C轮',
                    value: 5
                }, {
                    name: 'D轮及以后',
                    value: 4
                }, {
                    name: '战略投资',
                    value: 8
                }, {
                    name: '定增',
                    value: 4
                }, {
                    name: '新三板',
                    value: 10
                }, {
                    name: '并购',
                    value: 5
                }, {
                    name: '上市',
                    value: 3
                }]
            };
        },
        mounted:function(){
            this.getData();
        },
        methods:{
            getData: function(){
                var pieChart = document.getElementById('pieChart');
                var optionpieOption = {
                    title: {
                        text: '上周（7.1-7.7）国内获投事件轮次分布',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    // color:['#43A8E0', '#0076D0', '＃22BA6F', '＃41CC5D', '#FFA300', '#F2CE00', '#FF6000', '#FF7020', 'A6A6A6', '#D9D9D9'],
                    series : [
                        {
                            name: '轮次',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: this.phaseArr,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                normal:{ 
                                    label:{ 
                                        show: true, 
                                        formatter: '{b} {d}%' 
                                    }, 
                                    labelLine :{show:true} 
                                }
                            }
                        }
                    ]
                };
                pieChart.setOption(pieOption);
            }
        }
    }
</script>
<style lang="less" module>
    /*
        静态资源引用方法
        background: ~"url(view/.assets/image/demo.png)"
    */
    @import (optional,reference) "~view/theme.less";
    .root{

    }
</style>