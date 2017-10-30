<template>
    <div :class="$style.root">
        <el-row :class="[$style.margin20]">
            <el-col :span="7">
                <el-input placeholder="请输入基金名称搜索" v-model="searchkey" @keyup.enter.native="sendData">
                    <el-button slot="append" icon="search" @click="sendData"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row :class="$style.margin20">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column label="基金名称" width="180" inline-template>
                    <a :href="`/#/fund/detail/${row.name}`">{{row.name}}</a>
                </el-table-column>
                <el-table-column
                prop="name"
                label="对外投资"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="工商投资案例">
                </el-table-column>
                <el-table-column
                prop="address"
                label="缺失投资案例">
                </el-table-column>
            </el-table>
        </el-row>
        <div :class="$style.block" v-show="tableData.length">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageSet.currentPage"
            :page-sizes="pageSet.pageSizes"
            layout="total, sizes, prev, pager, next, jumper"
            :page-count="pageSet.total">
            </el-pagination>
        </div>
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
                searchkey: '',
                tableData: [{
                date: '2016-05-02',
                name: '基金1',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '基金12',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '基金13',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '基金14',
                address: '上海市普陀区金沙江路 1516 弄'
                }],
                pageSet: {
                    pageSizes: [10, 20, 30, 40], // 分页
                    pageSize: 10, // 
                    total: 100,  // 总页数
                    currentPage: 1
                },
            };
        },
        mounted: function() {
            document.title = '基金列表';
        },
        methods: {
            sendData() {

            },
            handleSizeChange(val) {
                this.pageSet.pageSize = val;
            },
            handleCurrentChange(val) {
                this.pageSet.currentPage = val;
            },
        }
    }
</script>
<style lang="less" module>
    @import (optional,reference) "~view/theme.less";
    .root{
        .margin20 {
            margin-bottom: 20px;
        }
    }
</style>