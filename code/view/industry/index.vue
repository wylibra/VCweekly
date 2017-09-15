<template>
    <div :class="$style.root">
        <div :class="$style.industry">
            <h3>{{industry}} 行业</h3>
            <el-collapse v-model="activeNames">
                <el-collapse-item title="机构" name="1">
                    <table>
                        <thead>
                            <tr>
                                <th>机构名称</th>
                                <th>投资金额</th>
                            </tr>
                        </thead>
                        <tbody v-for="item in IndustryOrgData">
                            <tr>
                                <td>
                                    <div :class="$style.isclicked" @click="goToOrganization(item.name)"> {{item.name}}</div>
                                </td>
                                <td>
                                    {{item.value}}
                                </td>
                            </tr>  
                        </tbody> 
                    </table> 
                    <div :class="$style.block" v-show="IndustryOrgData.length">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageSetOrg.currentPage"
                        :page-sizes="pageSetOrg.pageSizes"
                        layout="total, sizes, prev, pager, next, jumper"
                        :page-count="pageSetOrg.total">
                        </el-pagination>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="lp" name="2">
                    <table>
                        <thead>
                            <tr>
                                <th>投资人</th>
                                <th>投资金额</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in orgPathData" v-show="orgPathData.length">
                            <tr>
                                <td>
                                    <div :class="$style.isclicked" @click="goToInvestor(item.name)"> {{item.name}}</div>
                                </td>
                                <td>{{item.value}}</td>
                            </tr>  
                        </tbody> 
                    </table> 
                    <div :class="$style.block" v-show="IndustryOrgData.length">
                        <el-pagination
                        @size-change="handleSizeChangeLp"
                        @current-change="handleCurrentChangeLp"
                        :current-page="pageSetLp.currentPage"
                        :page-sizes="pageSetLp.pageSizes"
                        layout="total, sizes, prev, pager, next, jumper"
                        :page-count="pageSetLp.total">
                        </el-pagination>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import axios from 'axios'
    export default{
        props:{

        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                activeNames: ['1', '2'],
                industry: this.$route.query.industry || '教育',
                IndustryOrgData: [],
                pageSetOrg: {
                    pageSizes: [20, 30, 40], // 分页
                    pageSize: 20, // 
                    total: 0,  // 总页数
                    currentPage: 1
                },

                orgPathData: [],
                pageSetLp: {
                    pageSizes: [20, 30, 40], // 分页
                    pageSize: 20, // 
                    total: 0,  // 总页数
                    currentPage: 1
                },
            };
        },
        mounted: function () {
            document.title = '行业';
            this.getIndustryOrgData();
            this.getOrgPathData();
        },
        methods: {
            getIndustryOrgData: function () {
                var _this = this;
                var sendData = {
                    cmd: 'get_lp_info',
                    industry_org: _this.industry,
                    page: _this.pageSetOrg.currentPage,
                    pagesize: _this.pageSetOrg.pageSize,
                }
                axios.get('http://data-internaltest.corp.36kr.com/crm', {params: sendData})
                .then(function (response) {
                    _this.IndustryOrgData = response.data.data;
                    _this.pageSetOrg.total = response.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            handleSizeChange(val) {
                this.pageSetOrg.pageSize = val;
                this.getIndustryOrgData();
            },
            handleCurrentChange(val) {
                this.pageSetOrg.currentPage = val;
                this.getIndustryOrgData();
            },


            getOrgPathData: function () {
                var _this = this;
                var sendData = {
                    cmd: 'get_lp_info',
                    industry_lp: _this.industry,
                    page: _this.pageSetLp.currentPage,
                    pagesize: _this.pageSetLp.pageSize,
                }
                axios.get('http://data-internaltest.corp.36kr.com/crm', {params: sendData})
                .then(function (response) {
                    _this.orgPathData = response.data.data;
                    _this.pageSetLp.total = response.data.total;
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            handleSizeChangeLp(val) {
                this.pageSetLp.pageSize = val;
                this.getOrgPathData();
            },
            handleCurrentChangeLp(val) {
                this.pageSetLp.currentPage = val;
                this.getOrgPathData();
            },

            goToInvestor: function (cell) {
                this.$router.push({path: '/investor', query: {invest: cell}});
            },
            goToOrganization: function (cell) {
                this.$router.push({path: '/organization', query: {org: cell}});
            },
        }
    }
</script>
<style lang="less" module>
    @import (optional,reference) "~view/theme.less";
    .root{
        .isclicked {
            cursor: pointer;
            &:hover {
                color: #045cf1;
            }
        }
        .industry {
            width:1080px;
            margin: 60px auto;
            h3 {
                color: #235fc5;
                font-size: 20px;
                font-weight: 700;
                text-align: center;
                padding: 20px;
            }
            table {
                width: 100%;
                thead th{
                    color: #235fc5;
                    text-align: center;
                    padding: 15px 0;
                    font-weight: 700;
                    border-top:2px solid #6c90c4;
                    border-bottom:2px solid #6c90c4;
                }
                tbody tr {
                    line-height: 20px;
                    color: #5a5958;
                    font-size: 15px;
                    border-bottom:1px solid #6c90c4;
                    &:last-child {
                        border-bottom:2px solid #6c90c4;
                    }
                    td {
                        padding: 15px 5px;
                        border-right:1px solid #b2c7e1;
                        &:last-child {
                            border-right:none;
                        }
                    }
                    .name {
                        font-weight: 800;
                        color: #bf2305;
                    }
                    .investpath {
                        margin-bottom: 10px;
                    }
                }
            }
        }
        .block {
            margin: 20px auto;
            width: 500px;
        }
    }
</style>