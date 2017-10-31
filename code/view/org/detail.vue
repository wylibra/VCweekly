<template>
    <div :class="[$style.root,$style.detailPage]">
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
import d3 from "d3";
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

          // var width = 1000, height = 1000;

          // //定义数据转换函数
          // var tree = d3.layout.tree().size([width, height - 200]);
          // //定义对角线生成器diagonal
          // var diagonal = d3.svg.diagonal().projection(function(d) {
          //   return [d.y, d.x];
          // });

          // //定义svg
          // var svg = d3
          //   .select("body")
          //   .append("svg")
          //   .attr("width", width)
          //   .attr("height", height)
          //   .append("g")
          //   .attr("transform", "translate(40,0)");

          // //读取json文件，进行绘图
          //   var nodes = tree.nodes(result.data);
          //   var links = tree.links(nodes);

          //   //画点
          //   var node = svg
          //     .selectAll(".node")
          //     .data(nodes)
          //     .enter()
          //     .append("g")
          //     .attr("class", "node")
          //     .attr("transform", function(d) {
          //       return "translate(" + d.y + "," + d.x + ")";
          //     });
          //   //加圈圈
          //   node.append("circle").attr("r", 4.5);
          //   //加文字
          //   node
          //     .append("text")
          //     .attr("dx", function(d) {
          //       return d.children ? -8 : 8;
          //     })
          //     .attr("dy", 3)
          //     .style("text-anchor", function(d) {
          //       return d.children ? "end" : "start";
          //     })
          //     .text(function(d) {
          //       return d.name;
          //     });

          //   //画线
          //   var line = svg
          //     .selectAll("link")
          //     .data(links)
          //     .enter()
          //     .append("path")
          //     .attr("class", "link")
          //     .attr("d", diagonal);
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

}
</style>