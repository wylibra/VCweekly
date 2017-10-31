<template>
    <div :class="$style.root">
        <el-row :class="[$style.margin20]">
            <el-col :span="24" :class="$style.breadcrumbContainer">
                <el-breadcrumb separator="/" :class="$style.breadcrumbInner">
                    <el-breadcrumb-item>
                        <a href="/#/org/list">机构列表</a>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        <a href="/#/org/detail">机构详情</a>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row :class="[$style.margin20]">
            <el-col :span="24">
                <div :class="$style.detailPanel">
                    <div :class="[$style.panelHeader,$style.clearfix]">
                        <h2 :class="$style.title">{{$route.params.name}}</h2>
                        <span :class="$style.tag">机构</span>
                    </div>
                    <div :class="$style.panelContent">
                        <div :class="[$style.section,$style.lp]">
                            <div>对应LP</div>
                            <span>
                                <a href="">曹国</a>   
                            </span>
                             <span>
                                <a href="">左野绫</a>   
                            </span>
                            <span>
                                <a href="">曹国</a>   
                            </span>
                            <span>
                                <a href="">左野绫</a>   
                            </span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div :class="$style.detailPanel">
                    <div :class="[$style.panelHeader,$style.clearfix]">
                        <h2 :class="$style.title">投资关系树</h2>
                        <el-switch
                            :class="$style.hasPro"
                            v-model="hasPro"
                            on-text="包含项目"
                            off-text="不包含项目"
                            :on-value="1"
                            :off-value="0" :width="100">
                        </el-switch>
                    </div>
                    <div :class="$style.panelContent">
                        <div :class="$style.section">
                            <el-tree :data="children" :default-expand-all="true"></el-tree>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div :class="$style.detailPanel">
                    <div :class="[$style.panelHeader,$style.clearfix]">
                        <h2 :class="$style.title">投资列表</h2>
                    </div>
                    <div :class="$style.panelContent">
                        <div :class="$style.section">
                            <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%">
                                <el-table-column label="GP" inline-template>
                                    <a :href="`/#/gp/detail/${row.name}`">{{row.name}}</a>
                                </el-table-column>
                                 <el-table-column label="基金" inline-template>
                                    <div v-for="item in row.children">
                                        <a :href="`/#/fund/detail/${item.name}`">{{item.name}}</a>
                                    </div>
                                </el-table-column>
                                <el-table-column label="对外投资" inline-template>
                                    <div v-for="item in row.children">
                                        <div v-show="item.children.length">{{item.name}}对外投资如下：</div>
                                        <div v-for="cell in item.children">
                                            <a :href="`/#/fund/detail/${cell.name}`">{{cell.name}}</a>
                                        </div>
                                    </div>
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="是否覆盖">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { getOrgData } from "wrapper/http";
export default {
  props: {},
  components: {},
  data: function() {
    return {
      locale: require("./.assets/locale/zh"),
      searchkey: "",
      hasPro: 1,
      tableData: [
        {
          date: "王小虎",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "王小虎",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "王小虎",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "王小虎",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      children: [
        {
          fund_type: "gp",
          agency: "经纬中国",
          label: "上海旌卓投资管理有限公司",
          legal: "DAVIDSUTUONGSING",
          children: []
        },
        {
          fund_type: "gp",
          agency: "经纬中国",
          label: "上海长竹投资管理有限公司",
          children: [
            {
              label: "上海思娱投资合伙企业（有限合伙）",
              legal: "上海长竹投资管理有限公司",
              children: []
            },
            {
              fund_type: "funding",
              agency: "经纬中国",
              label: "上海麒翼投资管理合伙企业（有限合伙）",
              legal: "上海长竹投资管理有限公司",
              children: [
                {
                  label: "上海麒翼智娱投资合伙企业（有限合伙）",
                  legal: "上海麒翼投资管理合伙企业（有限合伙）",
                  children: []
                },
                {
                  fund_type: "funding",
                  agency: "经纬中国",
                  label: "上海麒翼明娱创业投资合伙企业（有限合伙）",
                  legal: "上海麒翼投资管理合伙企业（有限合伙）",
                  children: [
                    {
                      label: "森林映画（北京）文化传媒有限公司",
                      legal: "林望",
                      children: []
                    },
                    {
                      label: "上海奔汇信息技术有限公司",
                      legal: "祝惠",
                      children: []
                    },
                    {
                      label: "北京若森数字科技有限公司",
                      legal: "张轶弢",
                      children: []
                    },
                    {
                      label: "杭州进学教育咨询有限公司",
                      legal: "吴佳斯",
                      children: []
                    }
                  ]
                },
                {
                  fund_type: "funding",
                  agency: "经纬中国",
                  label: "上海麒翼智娱创业投资合伙企业（有限合伙）",
                  legal: "上海麒翼投资管理合伙企业（有限合伙）",
                  children: [
                    {
                      label: "上海奔汇信息技术有限公司",
                      legal: "祝惠",
                      children: []
                    },
                    {
                      label: "上海牛趣网络科技有限公司",
                      legal: "龚毅",
                      children: []
                    },
                    {
                      label: "上海辰湾物流科技有限公司",
                      legal: "吴峰",
                      children: []
                    },
                    {
                      label: "上海怒豆网络科技有限公司",
                      legal: "郭贤婷",
                      children: []
                    },
                    {
                      label: "广州拓衡信息科技有限公司",
                      legal: "林伟",
                      children: []
                    },
                    {
                      label: "上海晴歌信息技术有限公司",
                      legal: "亓明",
                      children: []
                    },
                    {
                      label: "北京美至网络科技有限公司",
                      legal: "贾文龙",
                      children: []
                    },
                    {
                      label: "蓝马（北京）科技有限公司",
                      legal: "乔培合",
                      children: []
                    },
                    {
                      label: "上海狸猫网络科技有限公司",
                      legal: "苏挺",
                      children: []
                    },
                    {
                      label: "深圳市游迷天下科技有限公司",
                      legal: "余文锋",
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          fund_type: "gp",
          agency: "经纬中国",
          label: "北京经纬美创科技有限公司",
          legal: "肖萍",
          children: [
            {
              label: "北京大米科技有限公司",
              legal: "米雯娟",
              children: []
            },
            {
              label: "杭州卡考网络科技有限公司",
              legal: "黄卫新",
              children: []
            },
            {
              label: "上海卡考网络科技有限公司",
              legal: "黄卫新",
              children: []
            },
            {
              label: "北京百川快线网络科技有限公司",
              legal: "蒋燕玲",
              children: []
            },
            {
              label: "北京拜克洛克科技有限公司",
              legal: "戴威",
              children: []
            },
            {
              label: "广州拓衡信息科技有限公司",
              legal: "林伟",
              children: []
            },
            {
              label: "深圳市辣妈帮科技有限公司",
              legal: "金赞",
              children: []
            },
            {
              label: "北京易点淘网络技术有限公司",
              legal: "纪鹏程",
              children: []
            },
            {
              label: "荣昌耀华网络技术（北京）有限公司",
              legal: "张荣耀",
              children: []
            },
            {
              label: "上海布鲁爱电子商务有限公司",
              legal: "相海齐",
              children: []
            }
          ]
        }
      ]
    };
  },
  mounted: function() {
    document.title = "机构详情";
    // console.log(this.$route.params);
    this.getData();
  },
  methods: {
    getData() {
      var _this = this;
      var sendData = {
        cmd: "get_org_info",
        org: _this.$route.params.name
      };
      getOrgData(sendData)
        .then(result => {
          _this.tableData = result.data.children;
          console.log(result.data.children);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" module>
@import "~view/theme.less";
.root {
  .margin20 {
    margin-bottom: 20px;
  }
  .detail-panel {
    color: @baseColor;
    font-size: @basefont;
    padding: 20px 0;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    background-color: #fff;
    margin-bottom: 10px;
    .panel-header {
      margin-bottom: 21px;
      line-height: 30px;
      .title {
        position: relative;
        padding-left: 30px;
        font-size: 16px;
        color: #373552;
        display: inline-block;
        float: left;
        &:before {
          position: absolute;
          top: 0;
          left: 0;
          content: " ";
          width: 2px;
          height: 30px;
          background-color: #20a0ff;
        }
      }
      .tag {
        color: #ffb30a;
        margin-left: 10px;
        font-size: 13px;
        padding: 0px 5px;
        border: 1px solid #ffb30a;
        border-radius: 10px;
      }
      .hasPro {
        margin-left: @marginL10;
      }
    }
    .panel-content {
      padding: 0 30px;
      .section {
      }
      .lp {
        div {
          font-size: 16px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>