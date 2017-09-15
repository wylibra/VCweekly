<template>
    <div :class="$style.root">
        <div :class="$style.organization">
            <h3>{{org}} 信息列表</h3>
            <el-collapse v-model="activeNames">
                <el-collapse-item title="机构 详情" name="1">
                    <table>
                        <thead>
                            <tr>
                                <th v-show="organizationObj.gp.length">gp</th>
                                <th v-show="organizationObj.nodes.length">投资实体</th>
                                <th v-show="organizationObj.suppl_com.length">已发现投资事件</th>
                                <th>覆盖情况</th>
                                <th v-show="organizationObj.uncover_com.length">未发现投资事件</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div v-for="cell in organizationObj.gp" :class="$style.investpath" v-show="organizationObj.gp.length">
                                        <div :class="$style.isclicked" @click="goToInvestor(cell)">{{cell}}</div>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="cell in organizationObj.nodes" :class="$style.investpath" v-show="organizationObj.nodes.length">
                                        <div >{{cell}}</div>
                                    </div>
                                </td>
                                <td>
                                    <div v-for="cell in organizationObj.suppl_com" :class="$style.investpath" v-show="organizationObj.suppl_com.length">
                                        <div >{{cell}}</div>
                                    </div>
                                </td>
                                <td>
                                    {{organizationObj.cover}}
                                </td>
                                <td>
                                    <div v-for="cell in organizationObj.uncover_com" :class="$style.investpath" v-show="organizationObj.uncover_com.length">
                                        <div >{{cell}}</div>
                                    </div>
                                </td>
                            </tr>  
                        </tbody> 
                    </table> 
                </el-collapse-item>
                <el-collapse-item title="机构 投资路径" name="2">
                    <table>
                        <thead>
                            <tr>
                                <th>投资实体</th>
                                <th>被投公司</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in orgPathData" v-show="orgPathData.length">
                            <tr>
                                <td>
                                    {{item.name}}
                                </td>
                                <td>
                                    <div v-for="cell in item.invest_coms" :class="$style.investpath">
                                        <div >{{cell.name}}</div>
                                    </div>
                                </td>
                            </tr>  
                            <tr v-show="noData">
                                <td colspan="2" style="text-align: center;">暂无相关数据</td>
                            </tr>
                        </tbody> 
                    </table> 
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import axios from 'axios'
    import router from 'view/router';
    export default{
        props:{

        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                activeNames: ['1', '2'],
                organizationObj: {},
                orgPathData: [],
                org: this.$route.query.org || '经纬中国',
                noData: false
            };
        },
        mounted: function () {
            document.title = '机构详情';
            this.getData();
            this.getOrgPathData();
        },
        methods: {
            getData: function () {
                var _this = this;
                var sendData = {
                    cmd: 'get_lp_info',
                    org: _this.org
                }
                axios.get('http://data-internaltest.corp.36kr.com/crm', {params: sendData})
                .then(function (response) {
                    _this.organizationObj = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            getOrgPathData: function () {
                var _this = this;
                var sendData = {
                    cmd: 'get_lp_info',
                    org_path: _this.org
                }
                axios.get('http://data-internaltest.corp.36kr.com/crm', {params: sendData})
                .then(function (response) {
                    _this.orgPathData = response.data.data;
                    _this.noData = response.data.data.length ? false: true;
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            goToInvestor: function (cell) {
                this.$router.push({path: '/investor', query: {invest: cell}});
            }
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
        .organization {
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
    }
</style>