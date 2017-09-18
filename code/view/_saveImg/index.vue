<template>
    <div :class="$style.root">
        <el-button type="primary" @click="saveBtn"><a  target="_blank" id="down_button">保存图片</a></el-button>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import html2canvas from 'html2canvas'
    import download from 'downloadjs'
    export default{
        props:{
            tableName: {
                type: String
            } 
        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh')
            };
        },
        methods: {
            saveBtn: function(e) {
                var table = document.getElementById(this.tableName);
                html2canvas(table, {
                    onrendered: function(canvas) {
                        var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url  
                        download(imgUri, "table.png", "image/png");
                    },
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