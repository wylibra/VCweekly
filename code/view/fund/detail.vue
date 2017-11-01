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
                            <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="高管姓名" width="180" inline-template>
                                    <a :href="`/#/org/detail/${row.date}`">{{row.date}}</a>
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="职务"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="是否具有基金从业资格">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">工商挖掘GP：上海经熠投资管理有限公司</div>
                            <div :class="$style.lineHeight">工商挖掘路径：上海经熠投资管理有限公司-->上海创鋆投资管理合伙企业（有限合伙）</div>
                            <div :class="$style.lineHeight">基金股东情况：</div>
                            <el-table
                                :data="fundHolderData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="股东" inline-template>
                                    <a :href="`/#/org/detail/${row.name}`">{{row.name}}</a>
                                </el-table-column>
                                <el-table-column
                                prop="percent"
                                label="出资比例">
                                </el-table-column>
                                <el-table-column
                                prop="amount"
                                label="认缴出资">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">基金对外投资：</div>
                            <el-table
                                :data="fundInvestData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="投资公司" inline-template>
                                    <a :href="`/#/org/detail/${row.name}`">{{row.name}}</a>
                                </el-table-column>
                                <el-table-column
                                prop="oper_name"
                                label="投资时间">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="投资金额">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="投资占比">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="是否匹配">
                                </el-table-column>
                            </el-table>
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
    export default{
        props:{

        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                fundHolderData: [],
                fundInvestData: [],
                tableData: [{
                date: '上海创鋆投资管理合伙企业（有限合伙）',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '上海创鋆投资管理合伙企业（有限合伙）',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '上海创鋆投资管理合伙企业（有限合伙）',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
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
            this.getFundHolderData();
            this.getFundInvestData();
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
            },
            getFundHolderData() {
                var _this = this;
                var sendData = {
                    cmd: "get_com_holder",
                    cname: _this.$route.params.name
                };
                getHolderData(sendData)
                .then(result => {
                    _this.fundHolderData = result.data.result;
                })
                .catch(err => {
                    console.log(err);
                });
            },
            getFundInvestData() {
                var _this = this;
                var sendData = {
                    cmd: "get_com_invest",
                    cname: _this.$route.params.name
                };
                getInvestData(sendData)
                .then(result => {
                    _this.fundInvestData = result.data.result;
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>
<style lang="less" module>
    @import  "~view/theme.less";
    .root{

    }
</style>