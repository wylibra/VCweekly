<template>
    <div :class="[$style.root,$style.detailPage]">
        <el-row :class="[$style.margin20]">
            <el-col :span="24" :class="$style.breadcrumbContainer">
                <el-breadcrumb separator="/" :class="$style.breadcrumbInner">
                    <el-breadcrumb-item>
                        <a href="/#/gp/list">GP列表</a>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <a href="/#/gp/detail">GP详情</a>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row :class="[$style.margin20]">
            <el-col :span="24">
                <div :class="$style.detailPanel">
                    <div :class="[$style.panelHeader,$style.clearfix]">
                        <h2 :class="$style.title">{{$route.params.name}}</h2>
                        <span :class="$style.tag">GP</span>
                    </div>
                    <div :class="$style.panelContent">
                        <div :class="$style.section">
                            <a href="">查看工商信息</a>
                            <a href="">查看AMAC信息</a>
                        </div>
                        <div :class="[$style.section,$style.lp]">
                            <div>对应LP</div>
                            <span>
                                <a href="/#/lp/detail/经纬中国">曹国熊</a>   
                            </span>
                             <span>
                                <a href="">左野绫</a>   
                            </span>
                            <span>
                                <a href="">曹国</a>   
                            </span>
                            <span>
                                <a href="">左野绫</a>   
                            </span>
                        </div>
                       
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div :class="$style.detailPanel">
                    <div :class="[$style.panelHeader,$style.clearfix]">
                        <h2 :class="$style.title">基本信息</h2>
                    </div>
                    <div :class="$style.panelContent">
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">所属机构：上海旌卓投资管理有限公司</div>
                            <div :class="$style.lineHeight">法人代表：经纬（杭州）投资管理有限公司</div>
                            <div :class="$style.lineHeight">股东信息：</div>
                            <el-table
                                :data="gpHolderData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="股东" width="180" inline-template>
                                    <a :href="`/#/org/detail/${row.name}`">{{row.name}}</a>
                                </el-table-column>
                                <el-table-column
                                prop="percent"
                                label="出资比例"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="amount"
                                label="认缴出资">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">对外投资：</div>
                            <el-table
                                :data="gpInvestData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="被投资企业名称" width="180" inline-template>
                                    <a :href="`/#/org/detail/${row.name}`">{{row.name}}</a>
                                </el-table-column>
                                <el-table-column
                                prop="oper_name"
                                label="被投资法定代表人"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="oper_name"
                                label="注册资本">
                                </el-table-column>
                                <el-table-column
                                prop="oper_name"
                                label="投资数额">
                                </el-table-column>
                                 <el-table-column
                                prop="daoper_namete"
                                label="投资占比">
                                </el-table-column>
                                 <el-table-column
                                prop="satrt_date"
                                label="注册时间">
                                </el-table-column>
                                 <el-table-column
                                prop="satrt_date"
                                label="状态">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">基金列表：</div>
                            <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="基金编号" width="180" inline-template>
                                    <a :href="`/#/org/detail/${row.date}`">{{row.date}}</a>
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="基金名称"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="成立时间">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="备案时间">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">高管情况：</div>
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
                            <div :class="$style.lineHeight">基金从业人员：</div>
                            <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="姓名" width="180" inline-template>
                                    <a :href="`/#/org/detail/${row.date}`">{{row.date}}</a>
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="从业资格类别"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="证书取得日期">
                                </el-table-column>
                                 <el-table-column
                                prop="name"
                                label="证书有效日期">
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
    import { getGpHolderData, getGpInvestData } from "wrapper/http"
    export default{
        props:{

        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                gpHolderData: [],
                gpInvestData: [],
                tableData: [{
                date: '王小虎',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '王小虎',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '王小虎',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '王小虎',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }],
            };
        },
        mounted: function() {
            document.title = 'GP详情';
            console.log(this.$route.params);
            this.getGpHolderData();
            this.getGpInvestData();
        },
        methods: {
            getGpHolderData() {
                var _this = this;
                var sendData = {
                    cmd: "get_com_holder",
                    cname: _this.$route.params.name
                };
                getGpHolderData(sendData)
                .then(result => {
                    _this.gpHolderData = result.data.result;
                })
                .catch(err => {
                    console.log(err);
                });
            },
            getGpInvestData() {
                var _this = this;
                var sendData = {
                    cmd: "get_com_invest",
                    cname: _this.$route.params.name
                };
                getGpInvestData(sendData)
                .then(result => {
                    _this.gpInvestData = result.data.result;
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