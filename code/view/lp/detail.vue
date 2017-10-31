<template>
    <div :class="$style.root">
        <el-row :class="[$style.margin20]">
            <el-col :span="24" :class="$style.breadcrumbContainer">
                <el-breadcrumb separator="/" :class="$style.breadcrumbInner">
                    <el-breadcrumb-item>
                        <a href="/#/lp/list">LP列表</a>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <a href="/#/lp/detail">LP详情</a>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row :class="[$style.margin20]">
            <el-col :span="24">
                <div :class="$style.detailPanel">
                    <div :class="[$style.panelHeader,$style.clearfix]">
                        <h2 :class="$style.title">{{$route.params.name}}</h2>
                        <span :class="$style.tag">LP</span>
                        <span :class="$style.marginLeft100">
                            所属机构： 
                            <a href="">经纬中国</a>
                        </span>
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
                                :data="tableData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="股东" width="180" inline-template>
                                    <a :href="`/#/org/detail/${row.date}`">{{row.date}}</a>
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="出资比例"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="认缴出资">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">对外投资：</div>
                            <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="被投资企业名称" width="180" inline-template>
                                    <a :href="`/#/org/detail/${row.date}`">{{row.date}}</a>
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="被投资法定代表人"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="注册资本">
                                </el-table-column>
                                <el-table-column
                                prop="date"
                                label="投资数额">
                                </el-table-column>
                                 <el-table-column
                                prop="date"
                                label="投资占比">
                                </el-table-column>
                                 <el-table-column
                                prop="date"
                                label="注册时间">
                                </el-table-column>
                                 <el-table-column
                                prop="date"
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
    export default{
        props:{

        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
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
        },
        methods: {
        }
    }
</script>
<style lang="less" module>
    @import  "~view/theme.less";
    .root{
        .margin20 {
            margin-bottom: 20px;
        }
        .detail-panel {
            color: @baseColor;
            font-size: @basefont;
            padding: 20px 0;
            border: 1px solid #EAEAEA;
            border-radius: 4px;
            background-color: #FFF;
            margin-bottom: 10px;
            .panel-header {
                margin-bottom: 21px;
                line-height: 30px;
                .title {
                    position: relative;
                    padding-left: 30px;
                    font-size: 16px;
                    color: #373552;
                    display: inline-block;
                    float: left;
                    &:before {
                        position: absolute;
                        top: 0;
                        left: 0;
                        content: " ";
                        width: 2px;
                        height: 30px;
                        background-color: #20a0ff;
                    }
                }
                .tag {
                    color: #FFB30A;
                    margin-left: 10px;
                    font-size: 13px;
                    padding: 0px 5px;
                    border: 1px solid #FFB30A;
                    border-radius: 10px;
                }
                .marginLeft100 {
                    margin-left: 100px;
                }
            }
            .panel-content {
                padding: 0 30px;
                .section {
                    margin-bottom:20px;
                    .lineHeight {
                        line-height: 30px;
                    }
                }
                .lp {
                    div {
                        font-size: 16px;
                        line-height: 30px;
                    }
                }
            }
        }
        .chartClass {
            min-width: 350px;
            min-height: 350px;
        }
    }
</style>