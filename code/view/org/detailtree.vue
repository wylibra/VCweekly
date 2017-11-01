<template>
    <div :class="$style.root">
        <div id="tree" style="width:200%;height:100%;"></div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { getOrgData } from "wrapper/http";
import Raphael from "treant-js/vendor/raphael.js";
window.Raphael = Raphael;
import { Treant } from 'treant-js';

export default {
  props: {},
  components: {},
  data: function() {
    return {
      locale: require("./.assets/locale/zh"),
      hasPro: 1,
      tableData: [],
    };
  },
  mounted: function() {
    document.title = "关系树";
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
          getArray(_this.tableData);
          function getArray(data) {
            let tempData = [];
            data.forEach(function(item, index) {
              tempData.push(item);
              tempData[index].text = {};
              tempData[index].text.name = item.name;
              if (item.children.length) {
                getArray(item.children);
              }
            });
          }
          console.log(_this.tableData);
          var config =  {
              chart: {
                  container: "#tree",
                  rootOrientation: "WEST",
                  connectors: {
                    type: "curve"
                  }
              },
              nodeStructure: {
                  text: { name: _this.$route.params.name },
                  children: _this.tableData
              }
          }
          new Treant(config);
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
  font-size: 12px;
}
</style>