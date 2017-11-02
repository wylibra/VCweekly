<template>
    <div :class="$style.root">
        <el-table
            :data="managerData"
            stripe
            style="width: 100%">
            <el-table-column label="高管姓名" inline-template>
                <a :href="`/#/org/detail/${row.person_name}`">{{row.person_name}}</a>
            </el-table-column>
            <el-table-column
            prop="position"
            label="职务">
            </el-table-column>
            <el-table-column inline-template label="是否具有基金从业资格">
                <span>{{row.has_qualification===1?'是':'否'}}</span>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import { getManagerData } from "wrapper/http"
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
                managerData: []
            };
        },
        mounted:function(){
            this.getManagerData();
        },
        methods:{
            getManagerData() {
                var _this = this;
                var sendData = {
                    cmd: "get_organization_manager",
                    org_name: _this.orgName
                };
                getManagerData(sendData)
                .then(result => {
                    _this.managerData = result.data;
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