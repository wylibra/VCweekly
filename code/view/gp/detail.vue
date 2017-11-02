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
                            <holder :cname="$route.params.name"></holder>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">对外投资：</div>
                            <invest :cname="$route.params.name"></invest>
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
                            <manager :org-name="$route.params.name"></manager>
                        </div>
                        <div :class="$style.section">
                            <div :class="$style.lineHeight">基金从业人员：</div>
                            <amacPerson :org-name="$route.params.name"></amacPerson>
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
    import amacPerson from '../_amacPerson/index'
    import holder from '../_holder/index'
    import invest from '../_invest/index'
    export default{
        props:{

        },
        components:{
            manager,amacPerson,holder,invest
        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                tableData: [{
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

    }
</style>