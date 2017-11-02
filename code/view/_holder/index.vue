<template>
    <div :class="$style.root">
        <el-table
            :data="holderData"
            stripe
            style="width: 100%">
            <el-table-column label="股东" inline-template>
                <a :href="`/#/org/detail/${row.name}`">{{row.name}}</a>
            </el-table-column>
            <el-table-column
            prop="percent"
            label="出资比例">
            </el-table-column>
            <el-table-column
            prop="amount"
            label="认缴出资">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import { getHolderData } from "wrapper/http"
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
                holderData: []
            };
        },
        mounted:function(){
            this.getHolderData();
        },
        methods:{
            getHolderData() {
                var _this = this;
                var sendData = {
                    cmd: "get_com_holder",
                    cname: _this.cname
                };
                getHolderData(sendData)
                .then(result => {
                    _this.holderData = result.data.result;
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