<template>
    <div :class="$style.root">
        <el-table
            :data="investData"
            stripe
            style="width: 100%">
            <el-table-column label="投资公司" inline-template>
                <a :href="`/#/org/detail/${row.name}`">{{row.name}}</a>
            </el-table-column>
            <el-table-column
            prop="oper_name"
            label="投资时间">
            </el-table-column>
            <el-table-column
            prop="address"
            label="投资金额">
            </el-table-column>
            <el-table-column
            prop="name"
            label="投资占比">
            </el-table-column>
            <el-table-column
            prop="name"
            label="是否匹配">
            </el-table-column>
        </el-table>

        <!-- <el-table
            :data="investData"
            stripe
            style="width: 100%">
            <el-table-column label="被投资企业名称" inline-template>
                <a :href="`/#/org/detail/${row.name}`">{{row.name}}</a>
            </el-table-column>
            <el-table-column
            prop="oper_name"
            label="被投资法定代表人">
            </el-table-column>
            <el-table-column
            prop="oper_name"
            label="注册资本">
            </el-table-column>
            <el-table-column
            prop="oper_name"
            label="投资数额">
            </el-table-column>
            <el-table-column
            prop="daoper_namete"
            label="投资占比">
            </el-table-column>
                <el-table-column
            prop="satrt_date"
            label="注册时间">
            </el-table-column>
                <el-table-column
            prop="satrt_date"
            label="状态">
            </el-table-column>
        </el-table> -->
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import { getInvestData } from 'wrapper/http'
    export default{
        props:{
            cname: {
                type: String
            }
        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                investData: []
            };
        },
        mounted:function(){
            this.getInvestData();
        },
        methods:{
            getInvestData() {
                var _this = this;
                var sendData = {
                    cmd: "get_com_invest",
                    cname: _this.cname
                };
                getInvestData(sendData)
                .then(result => {
                    _this.investData = result.data.result;
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }

    }
</script>
<style lang="less" module>
    @import (optional,reference) "~view/theme.less";
    .root{

    }
</style>