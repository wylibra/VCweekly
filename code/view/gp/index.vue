<template>
    <div :class="$style.root">
        <el-row :class="[$style.margin20]">
            <el-col :span="7">
                <el-input placeholder="请输入GP名称搜索" v-model="searchkey" @keyup.enter.native="sendData">
                    <el-button slot="append" icon="search" @click="sendData"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row :class="$style.margin20">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%" :empty-text="emptyText">
                <el-table-column label="GP名称" inline-template>
                    <a :href="`/#/gp/detail/${row.name}`">{{row.name}}</a>
                </el-table-column>
                <el-table-column
                prop="invest_num"
                label="管理基金">
                </el-table-column>
                <el-table-column
                prop="address"
                label="待补充投资事件">
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
    import { getGpListData } from "wrapper/http";
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
                emptyText: '加载中...',
                pageSet: {
                    pageSizes: [20, 50, 100], // 分页
                    pageSize: 20, // 
                    total: 0,  // 总页数
                    currentPage: 1
                },
            };
        },
        mounted: function() {
            document.title = 'GP列表';
            this.getGpListData();
        },
        methods: {
            sendData() {

            },
            getGpListData() {
                var _this = this;
                var sendData = {
                    cmd: "get_gp_list",
                    page: _this.pageSet.currentPage,
                    page_size: _this.pageSet.pageSize
                };
                this.emptyText = '加载中...';
                getGpListData(sendData)
                    .then(result => {
                        _this.tableData = result.data;
                        _this.pageSet.total = result.total;
                        if (_this.pageSet.total === 0) {
                            _this.emptyText = '暂无数据';
                        }
                    })
                    .catch(err => {
                    console.log(err);
                    });
            },
            handleSizeChange(val) {
                this.pageSet.pageSize = val;
                this.getGpListData();
            },
            handleCurrentChange(val) {
                this.pageSet.currentPage = val;
                this.getGpListData();
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