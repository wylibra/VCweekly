<template>
    <div :class="[$style.root,$style.detailPage]">
        <el-row :class="[$style.margin20]">
            <el-col :span="24" :class="$style.breadcrumbContainer">
                <el-breadcrumb separator="/" :class="$style.breadcrumbInner">
                    <el-breadcrumb-item>
                        <a href="/#/fund/list">基金列表</a>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <a href="/#/fund/detail">基金详情</a>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row :class="[$style.margin20]">
            <el-col :span="24">
                <div :class="$style.detailPanel">
                    <div :class="[$style.panelHeader,$style.clearfix]">
                        <h2 :class="$style.title">{{$route.params.name}}</h2>
                        <span :class="$style.tag">基金</span>
                        <span :class="$style.marginLeft100">
                            所属机构： 
                            <a href="/#/org/detail/经纬中国">经纬中国</a>
                            <!-- <a :href="`/#/org/detail/${}`">经纬中国</a> -->
                        </span>
                    </div>
                    <div :class="$style.panelContent">
                        <div>
                            <a href="">查看工商信息</a>
                            <a href="">查看AMAC信息</a>
                        </div>
                        <div style="height: 350px;">
                            <el-col :span="12">
                                <div id="fundIndustryChart" :class="$style.chartClass"></div>
                            </el-col>
                            <el-col :span="12">
                                <div id="fundPhaseChart" :class="$style.chartClass"></div>
                            </el-col>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div :class="$style.detailPanel">
                    <div :class="[$style.panelHeader,$style.clearfix]">
                        <h2 :class="$style.title">基金关系</h2>
                    </div>
                    <div :class="$style.panelContent">
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">基金关系树</div>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">amac基金管理人：上海旌卓投资管理有限公司</div>
                            <manager :org-name="$route.params.name"></manager>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">工商挖掘GP：上海经熠投资管理有限公司</div>
                            <div :class="$style.lineHeight">工商挖掘路径：上海经熠投资管理有限公司-->上海创鋆投资管理合伙企业（有限合伙）</div>
                            <div :class="$style.lineHeight">基金股东情况：</div>
                            <holder :cname="$route.params.name"></holder>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">基金对外投资：</div>
                            <invest :cname="$route.params.name"></invest>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import echarts from 'echarts'
    import { getHolderData, getInvestData } from "wrapper/http"
    import manager from '../_manager/index'
    import holder from '../_holder/index'
    import invest from '../_invest/index'
    export default{
        props:{

        },
        components:{
            manager,holder,invest
        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                tableData: [{
                date: '上海创鋆投资管理合伙企业（有限合伙）',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '上海创鋆投资管理合伙企业（有限合伙）',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }],
            };
        },
        mounted: function() {
            document.title = '基金详情';
            console.log(this.$route.params);
            this.fundIndustryChart();
            this.fundPhaseChart();
        },
        methods: {
            fundIndustryChart() {
                var fundIndustryChart = echarts.init(document.getElementById('fundIndustryChart'));
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
                    fundIndustryChart.setOption(optionInvestRel);
            },
            fundPhaseChart() {
                var fundPhaseChart = echarts.init(document.getElementById('fundPhaseChart'));
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
                    fundPhaseChart.setOption(optionInvestRel);
            }
        }
    }
</script>
<style lang="less" module>
    @import  "~view/theme.less";
    .root{

    }
</style>