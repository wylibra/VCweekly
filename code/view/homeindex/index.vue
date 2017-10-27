<template>
    <div :class="$style.root">
        <el-col :span="24">
            <el-card class="box-card">
                <div slot="header" class="clearfix" style="text-align: center;">
                    <span style="line-height: 36px;">{{title}}</span>
                </div>
                <div>
                    <div :class="$style.investRelData">
                        <div>总节点数：{{relData.total}}</div>
                    
                        <div>认识的节点数：{{relData.total}} <br/>
                            <span>
                                「其中GP: {{relData.total}}个，基金{{relData.total}}个」
                            </span>    
                        </div>
                        <div>总节点数：{{relData.total}}</div>
                        <div>总节点数：{{relData.total}}</div>
                        <div>总节点数：{{relData.total}}</div>
                    </div>
                    <div id="investRelChart" :class="$style.chartClass"></div>
                </div>
            </el-card>
        </el-col>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import echarts from 'echarts'
    export default{
        props:{

        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                title: '投资关系工商挖掘',
                relData: {
                    total: 330000
                },
                investRelData: [{
                    name: '22',
                    value: '33'
                }]
            };
        },
        mounted: function() {
            document.title = '首页';
            this.getInvestRelChart();
        },
        methods: {
            getInvestRelChart() {
                var investRelChart = echarts.init(document.getElementById('investRelChart'));
                    var optionInvestRel = {
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series : [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:335, name:'直接访问'},
                                    {value:310, name:'邮件营销'},
                                    {value:234, name:'联盟广告'},
                                    {value:135, name:'视频广告'},
                                    {value:1548, name:'搜索引擎'}
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    investRelChart.setOption(optionInvestRel);
            }
        }
    }
</script>
<style lang="less" module>
    @import (optional,reference) "~view/theme.less";
    .root{
        .investRelData {
            text-align: center;
            padding: 40px;
            div {
                padding:10px 0;
                span {
                    padding-left: 165px;
                }
            }
        }
        .chartClass {
            min-width: 800px;
            min-height: 400px;
        }
    }
</style>