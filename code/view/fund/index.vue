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
                <el-table-column label="基金名称" inline-template>
                    <a :href="`/#/fund/detail/${row.name}`">{{row.name}}</a>
                </el-table-column>
                <el-table-column
                prop="name"
                label="对外投资">
                </el-table-column>
                <el-table-column
                prop="invest_num"
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
    import { getFundData } from "wrapper/http";
    export default{
        props:{

        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                searchkey: '',
                tableData: [],
                pageSet: {
                    pageSizes: [10, 20, 30, 40], // 分页
                    pageSize: 20, // 
                    total: 0,  // 总页数
                    currentPage: 1
                },
            };
        },
        mounted: function() {
            document.title = '基金列表';
            this.getFundData();
        },
        methods: {
            sendData() {

            },
            getFundData() {
                var _this = this;
                var sendData = {
                    cmd: "get_funding_list",
                    page: _this.pageSet.currentPage,
                    page_size: _this.pageSet.pageSize
                };
                getFundData(sendData)
                    .then(result => {
                    _this.tableData = result.data;
                    _this.pageSet.total = result.total || 100;
                    })
                    .catch(err => {
                    console.log(err);
                    });
            },
            handleSizeChange(val) {
                this.pageSet.pageSize = val;
                this.getFundData();
            },
            handleCurrentChange(val) {
                this.pageSet.currentPage = val;
                this.getFundData();
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