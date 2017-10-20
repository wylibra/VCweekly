<template>
    <div :class="$style.root">
        <el-carousel indicator-position="none" :autoplay="false" :interval="10000" :height="carouselHeight">
            <el-carousel-item v-for="(item,index) in teamArr" :key="index" >
                <el-row :class="$style.header">
                    {{item.name}}
                </el-row>
                <div>
                    <el-row>
                        <el-col :span="12" v-for="(cell,j) in item.imgArr" :key="j">
                            <iframe :src="cell" width="100%" :height="iframeHeight" scrolling="no"></iframe>
                        </el-col>
                    </el-row>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    export default{
        props:{

        },
        components:{

        },
        data:function(){
            return {
                locale: require('./.assets/locale/zh'),
                iframeHeight: (window.innerHeight -55),
                // iframeHeight: 100,
                carouselHeight: window.innerHeight + 'px',
                teamArr: [{
                    name: '北京团队',
                    imgArr: [
                        'http://redash.corp.36kr.com/embed/query/1012/visualization/553?api_key=gV4EswjZWDpttuwX7uLYfeHWoqXkgPXOQpo5yoDn',
                        'http://redash.corp.36kr.com/embed/query/1013/visualization/555?api_key=XqTPsS9OPQ3g6PSgrz9hL2kM36GhkVsKEhFheaoD',
                    ]
                },{
                    name: '北京团队',
                    imgArr: [
                        'http://redash.corp.36kr.com/embed/query/1033/visualization/578?api_key=1fg693s67EwLTF8cMCeJstL4Tx7YBJh2TLP9qvZJ',
                        'http://redash.corp.36kr.com/embed/query/1034/visualization/580?api_key=Z10T5pa3I3xRLrYkqDti4TM0bhkzaTc2zSU1R4va'
                    ]
                }, {
                    name: '天津团队',
                    imgArr: [
                        'http://redash.corp.36kr.com/embed/query/999/visualization/529?api_key=OtPBBPiEZDjBL3rVdzthcX93dmRgVQHgXX1PsPqf',
                        'http://redash.corp.36kr.com/embed/query/1007/visualization/544?api_key=F6vOY9SvfZ0e37EvKBEq0xDQXxcPbMpsUC79Kl8s',
                    ]
                },  {
                    name: '天津团队',
                    imgArr: [
                        'http://redash.corp.36kr.com/embed/query/1002/visualization/535?api_key=g4MYfyy9KanBZOOHABCyjrUu76NqgKlwzYc53DO8',
                        'http://redash.corp.36kr.com/embed/query/1003/visualization/537?api_key=ENbovmEOD5Hfihz8NOh3RsluqKTDK0I8miwNyMD0'
                    ]
                }],
                teamIndex: 0
            };
        },
        mounted:function(){
            function load() {
                setTimeout(function(){
                    window.location.reload();
                },60000);
            }
            // load();
        },
        created:function(){

        },
        methods: {
        
        }
    }

</script>
<style lang="less" module>
    @import (optional,reference) "~view/theme.less";
    html {
        overflow: hidden;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .root{
        color: #767676;
        background-color: #edecec;
        .header {
            line-height: 55px;
            background: #fff;
            font-size: 20px;
            padding-left: 10px;
        }
        .day {
            margin: 10px 0 0 10px;
            background-color: #fff;
            .dayHeader {
                line-height: 55px;
                font-size: 18px;
                padding-left: 10px;
                border-bottom: 1px solid #ccc;
            }
            .dayBody {
                padding: 20px;
            }
        }
    }
</style>