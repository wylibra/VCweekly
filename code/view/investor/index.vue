<template>
    <div :class="$style.root">
        <div :class="$style.investor">
            <h3>投资人 投资信息列表</h3>
             <div :class="$style.search">
                <el-input placeholder="请输入搜索内容" v-model="searchkey" @keyup.enter="sendData">
                    <el-button slot="append" icon="search" @click="sendData"></el-button>
                </el-input>
            </div> 
            <table >
                <thead>
                    <tr>
                        <th style="width: 171px;">投资人</th>
                        <th style="width: 262px;">投资信息</th>
                        <th style="width: 216px;">投资机构</th>
                        <th style="width: 431px;">投资行业</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in investorData" v-show="investorData.length">
                        <td :class="$style.name">
                            {{item.name?item.name:'-'}}
                        </td>
                        <td>
                            <div v-for="cell in item.investpath" :class="$style.investpath">
                                <div v-show="cell.org_name">名称：{{cell.org_name}}</div>
                                <div v-show="cell.org_node">机构：{{cell.org_node}}</div>
                                <div v-show="cell.org_money">金额：{{cell.org_money}}</div>
                                <div v-show="cell.org_time">时间：{{cell.org_time}}</div>
                            </div>
                        </td>
                        <td>
                            <div v-for="cell in item.organization">
                                {{cell.name}}
                                {{cell.value}}
                            </div>
                        </td>
                        <td>
                            <div :id="index" :class="$style.chartClass"></div>
                        </td>
                    </tr>  
                    <tr v-show="noData">
                        <td colspan="4" style="text-align: center;">暂无相关数据</td>
                    </tr>
                </tbody> 
            </table> 
            <div :class="$style.block" v-show="investorData.length">
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
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import axios from 'axios'
    import echarts from 'echarts'
    export default{
        props:{

        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                investorData: [],
                pageSet: {
                    pageSizes: [10, 20, 30, 40], // 分页
                    pageSize: 10, // 
                    total: 0,  // 总页数
                    currentPage: 1
                },
                searchkey: '',
                noData: false
            };
        },
        mounted: function () {
            document.title = '投资列表';
           this.getData();
        },
        methods:{
            getData: function() {
                var _this = this;
                var sendData = {
                    cmd: 'get_lp_info',
                    page: _this.pageSet.currentPage,
                    pagesize: _this.pageSet.pageSize,
                    searchkey: _this.searchkey                    
                }
                _this.noData = false;
                axios.get('http://data-internaltest.corp.36kr.com/crm', {params: sendData})
                .then(function (response) {
                    _this.investorData = response.data.data;
                    _this.noData = response.data.data.length ? false: true;
                    _this.pageSet.total = response.data.total;
                    var len = _this.investorData.length;
                    setTimeout(function() {
                        for(var i=0; i<len; i++) {
                            var industryData = _this.investorData[i].industry;
                            console.log(document.getElementById(i));
                            var industryChart = echarts.init(document.getElementById(i));
                            var option = {
                                tooltip : {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                series : [
                                    {
                                        name: '行业',
                                        type: 'pie',
                                        radius : '55%',
                                        center: ['50%', '60%'],
                                        data: industryData,
                                        itemStyle: {
                                            emphasis: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            },
                                            normal:{ 
                                                label:{ 
                                                    show: true, 
                                                    formatter: '{b} {c}',
                                                    textStyle: {
                                                        color: '#000'
                                                    }
                                                },
                                            }
                                        }
                                    }
                                ]
                            };
                            industryChart.setOption(option);
                        }
                    }, 0);
                })  
                .catch(function (error) {
                    console.log(error);
                })
            },
            handleSizeChange(val) {
                this.pageSet.pageSize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.pageSet.currentPage = val;
                this.getData();
            },
            sendData: function() {
                this.pageSet.currentPage = 1;
                this.getData();
            }
        }
    }
</script>
<style lang="less" module>
    @import (optional,reference) "~view/theme.less";
    .root{
        .chartClass {
            min-width: 420px;
            min-height: 200px;
        }
        .investor {
            width:1080px;
            margin: 60px auto;
            .search {
                margin: 20px 0 20px 650px;
                .select{
                    width: 110px;
                }
            }
            h3 {
                color: #235fc5;
                font-size: 20px;
                font-weight: 700;
                text-align: center;
                padding: 20px;
            }
            table {
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
                        vertical-align: middle;
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
            .block {
                margin: 20px auto;
                width: 500px;
            }
        }
    }
</style>