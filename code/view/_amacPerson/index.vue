<template>
    <div :class="$style.root">
        <el-table
            :data="amacPersonData"
            stripe
            style="width: 100%">
            <el-table-column label="姓名" inline-template>
                <a :href="`/#/org/detail/${row.name}`">{{row.name}}</a>
            </el-table-column>
            <el-table-column
            prop="pti_type"
            label="从业资格类别">
            </el-table-column>
            <el-table-column
            prop="start_date"
            label="证书取得日期">
            </el-table-column>
                <el-table-column
            prop="end_date"
            label="证书有效日期">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import { getAmacPersonData } from "wrapper/http"
    export default{
        props:{
            orgName: {
                type: String
            } 
        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                amacPersonData: []
            };
        },
        mounted:function(){
            this.getAmacPersonData();
        },
        methods:{
            getAmacPersonData() {
                var _this = this;
                var sendData = {
                    cmd: "get_amac_person",
                    org_name: _this.orgName
                };
                getAmacPersonData(sendData)
                .then(result => {
                    _this.amacPersonData = result.data;
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