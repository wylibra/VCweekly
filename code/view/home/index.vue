<template>
    <div :class="$style.root">
        <el-row :class="$style.container">
            <!--顶部-->
            <el-col :span="24" :class="$style.header">
                <el-col :span="1" :class="$style.logo">
                    <i class="el-icon-menu"></i>
                </el-col>
                <el-col :span="10">{{collapsed?'':sysName}}</el-col>
            </el-col>
            <el-col :span="24" :class="$style.main">
                <!--左侧导航-->
                <aside :class="{[$style.showSidebar]:!collapsed}">
                    <!--展开折叠开关-->
                    <div :class="[$style.menuToggle]" @click.prevent="collapseFun">
                        <i class="el-icon-arrow-left" v-show="!collapsed"></i>
                        <i class="el-icon-arrow-right" v-show="collapsed"></i>
                    </div> 
                    <!--导航菜单-->
                    <el-menu default-active="0" router :collapse="collapsed">
                        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                            <!-- <el-submenu v-if="item.children&&item.children.length>1" :index="index+''">
                                <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
                                <el-menu-item v-for="term in item.children" :key="term.path" :index="term.self_path" v-if="!item.hidden"
                                                :class="$route.path==term.path?'is-active':''">
                                    <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
                                </el-menu-item>
                            </el-submenu> -->
                            <el-menu-item v-if="item.children" :index="item.children[0].self_path"
                                        :class="$route.path==item.children[0].path?'is-active':''">
                            <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
                    <!-- <el-menu default-active="0" class="el-menu-vertical-demo" :collapse="collapsed">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="$router.push('/home/lp')">
                            <i class="el-icon-setting"></i>
                            <span slot="title">LP列表</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-menu"></i>
                            <span slot="title">机构列表</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">GP列表</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <i class="el-icon-menu"></i>
                            <span slot="title">基金列表</span>
                        </el-menu-item>
                    </el-menu> -->
                </aside>
                <!--右侧内容区域-->
                <section :class="$style.contentContainer">
                    <el-col :span="24" :class="$style.breadcrumbContainer">
                        <!-- <el-breadcrumb separator="/" :class="$style.breadcrumbInner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                <a :href="`/#${item.path}`">{{item.name}}</a>
                            </el-breadcrumb-item>
                        </el-breadcrumb> -->
                    </el-col>
                    <el-col :span="24" :class="$style.contentWrapper">
                        <transition name="fade" mode="out-in">
                            <router-view>

                            </router-view>
                        </transition>
                    </el-col>
                </section>
        </el-col>
        </el-row>
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
                sysName: '数据产品化',
                collapsed: false
            };
        },
        methods: {
            //折叠导航栏
            collapseFun: function() {
                this.collapsed = !this.collapsed;
            }
        },
        mounted() {
           console.log(this.$router.options.routes);
        }
    }
</script>
<style lang="less" module>
    @import (optional,reference) "~view/theme.less";
    .root{
        .container {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            .header {
                height: 60px;
                line-height: 60px;
                background-color: #324157;
                color: #bfcbd9;
                .logo {
                    height: 60px;
                    padding-left: 20px;
                }
            }
            .main {
                display: flex;
                position: absolute;
                top: 60px;
                bottom: 0;
                overflow: hidden;
                aside {
                    min-width: 64px;
                    background: #eef1f6;
                    &::-webkit-scrollbar {
                        display: none;
                    }
                    &.showSidebar {
                        overflow-x: hidden;
                        overflow-y: auto;
                        min-width: 180px;
                    }
                    .el-menu {
                        width: 180px;
                        height: 100%;
                    }
                    .el-menu--collapse {
                        width: 60px;
                        height: 100%;
                    }
                    .el-menu .el-menu-item, .el-submenu .el-submenu__title {
                        height: 46px;
                        line-height: 46px;
                    }
                }
                .contentContainer {
                    width: 100%;
                    overflow-y: scroll;
                    padding: 20px;
                    .breadcrumbContainer {
                        padding: 12px 0;
                        .title {
                            width: 200px;
                            float: left;
                            color: #475669;
                        }
                        .breadcrumbInner {
                            float: right;
                        }
                    }
                    .contentWrapper {
                        background-color: #fff;
                        box-sizing: border-box;
                    }
                }
            }
            .menuToggle {
                background: #4A5064;
                text-align: center;
                color: #bfcbd9;
                height: 50px;
                line-height: 50px;
                cursor: pointer;
            }
        }
    }
</style>