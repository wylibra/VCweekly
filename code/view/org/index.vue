<template>
    <div :class="$style.root">
        <el-row :class="[$style.margin20]">
            <el-col :span="7">
                <el-input placeholder="请输入机构名称搜索" v-model="searchkey" @keyup.enter.native="sendData">
                    <el-button slot="append" icon="search" @click="sendData"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row :class="$style.margin20">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%" :empty-text="emptyText">
                <el-table-column label="机构名称" inline-template>
                    <a :href="`/#/org/detail/${row.name}`">{{row.name}}</a>
                </el-table-column>
                <el-table-column
                prop="entity_num"
                label="实体数量">
                </el-table-column>
                <el-table-column
                prop="gp_num"
                label="GP数量">
                </el-table-column>
                <el-table-column
                prop="funding_num"
                label="基金数量">
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
    import { getOrgListData } from "wrapper/http";
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
            document.title = '机构列表';
            this.getOrgListData();
        },
        methods: {
            sendData() {

            },
            getOrgListData() {
                var _this = this;
                var sendData = {
                    cmd: "get_org_list",
                    page: _this.pageSet.currentPage,
                    page_size: _this.pageSet.pageSize
                };
                _this.emptyText = '加载中...';
                getOrgListData(sendData)
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
                this.getOrgListData();                
            },
            handleCurrentChange(val) {
                this.pageSet.currentPage = val;
                this.getOrgListData();
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