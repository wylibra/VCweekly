<template>
    <div :class="[$style.root,$style.detailPage]">
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
                            总投资额：32588.1万 人民币   共投资11个机构
                        </span>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div :class="$style.detailPanel">
                    <div :class="[$style.panelHeader,$style.clearfix]">
                        <h2 :class="$style.title">对外投资</h2>
                    </div>
                    <div :class="$style.panelContent">
                        <div :class="$style.section" v-for="(item, index) in investData">
                            <div :class="$style.lineHeight">{{item.name}}</div>
                            <el-table
                                :data="item.tableData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="基金名称" inline-template>
                                    <a :href="`/#/fund/detail/${row.date}`">{{row.date}}</a>
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="投资时间"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="投资金额">
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
                investData: [{
                    name: '经纬中国',
                    tableData: [{
                        date: '上海创鋆投资管理合伙企业（有限合伙）',
                        name: '2017-10-10',
                        address: '3000万'
                        },{
                        date: '上海创鋆投资管理合伙企业（有限合伙）',
                        name: '2017-10-10',
                        address: '3000万'
                        },{
                        date: '上海创鋆投资管理合伙企业（有限合伙）',
                        name: '2017-10-10',
                        address: '3000万'
                        },{
                        date: '上海创鋆投资管理合伙企业（有限合伙）',
                        name: '2017-10-10',
                        address: '3000万'
                        }]
                }, {
                    name: '险峰长青',
                    tableData: [{
                        date: '上海创鋆投资管理合伙企业（有限合伙）',
                        name: '2017-10-10',
                        address: '3000万'
                        },{
                        date: '上海创鋆投资管理合伙企业（有限合伙）',
                        name: '2017-10-10',
                        address: '3000万'
                        },{
                        date: '上海创鋆投资管理合伙企业（有限合伙）',
                        name: '2017-10-10',
                        address: '3000万'
                        }]
                }],
                
            };
        },
        mounted: function() {
            document.title = 'LP详情';
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