<template>
    <div :class="$style.root">
        <div :class="$style.block">
            <span>融资事件时间范围： </span>
            <el-date-picker
            v-model="datevalue"
            type="daterange"
            placeholder="选择融资时间范围" @change="setDate">
            </el-date-picker>
            &nbsp;&nbsp;
            <el-button type="primary" @click="submitBtn">确定</el-button>
        </div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="投资事件总结" name="1">
                <div>
                    <el-select v-model="areaValue" placeholder="请选择国内/国外" @change="areaValueChange()">
                        <el-option
                        v-for="item in areaOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- 行业 对应融资事件数量 -->
                    <div id="industyChart" :class="$style.chartClass"></div>
                    <!-- 行业 2周 对应融资事件数量 -->
                    <div id="industyChart2" :class="$style.chartClass"></div>
                    <div id="phaseChart" :class="$style.chartClass"></div>
                </div>
            </el-collapse-item>
            <el-collapse-item title="国外内各领域投融资简析" name="2">
                <div>
                    <!-- 轮次 对应融资事件比例 -->
                    <!-- <el-select v-model="areaValueIndusty" placeholder="请选择国内/国外" @change="areaValueIndustyChange()">
                        <el-option
                        v-for="item in areaOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                    <el-select v-model="industyValue" placeholder="请选择领域" @change="industyValueChange()">
                        <el-option
                        v-for="item in locale.industy"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <div id="phaseChartOfIndusty" :class="$style.chartClass"></div>
                    <!-- 某领域金额分布 -->
                    <div id="amountChart" :class="$style.chartClass"></div>
                    <!-- 某领域子领域获投 -->
                    <!-- <div id="subIndustryChart" :class="$style.chartClass"></div> -->
                    <!-- 某领域获投地域 -->
                    <!-- <div id="mapChart" :class="$style.chartClass" style="width:800px;height:600px;"></div> -->
                </div>
            </el-collapse-item>
        </el-collapse>
        <div :class="$style.companys">
            <h3>{{industyName}}领域获投事件简介</h3>
            <table >
                <thead>
                    <tr>
                        <th style="width: 120px;">公司名</th>
                        <th style="width: 200px;">简介</th>
                        <th style="width: 80px;">轮次</th>
                        <th style="width: 225px;">投资方</th>
                        <th style="width: 100px;">金额</th>
                        <th style="width: 100px;">子领域</th>
                        <th style="width: 80px;">地域</th>
                        <th style="width: 180px;">相似项目</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in companysData">
                        <td>{{item.name?item.name:'-'}}</td>
                        <td>{{item.brief?item.brief:'-'}}</td>
                        <td>{{item.phase?item.phase:'-'}}</td>
                        <td>
                            <div v-for="cell in item.investor" v-if="item.investor.length">{{cell}}</div>
                            <div v-if="!item.investor.length">-</div>
                        </td>
                        <td>{{item.finance_amount?item.finance_amount:'-'}}</td>
                        <td>
                            <div v-for="cell in item.field" v-if="item.field.length">{{cell}}</div>
                            <div v-if="!item.field.length">-</div>
                        </td>
                        <td>{{item.address?item.address:'-'}}</td>
                        <td>
                            <div v-for="cell in item.similar_company" v-if="item.similar_company.length">{{cell}}</div>
                            <div v-if="!item.similar_company.length">-</div>
                        </td>
                    </tr> 
                </tbody> 
            </table> 
        </div>
        <back-to-top :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
        <router-view></router-view>
    </div>
</template>
<script>
    Date.prototype.format = function(format) {
        var date = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
                if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                }
        }
        return format;
    }
    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import axios from 'axios'
    import echarts from 'echarts'
    import BackToTop from '../_backToTop/index';
    // import 'echarts/map/js/china.js'
    // import 'echarts/lib/chart/scatter/ScatterView.js'
    export default{
        props:{
        },
        components:{
            BackToTop
        },
        data:function(){
            return {
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1'// 按钮的背景颜色
                },
                locale: require('./.assets/locale/zh'),
                activeNames: ['1', '2'],
                datevalue: '', // 时间
                industyName: '',
                // 国内外select
                areaOptions: [{
                    label: '国内',
                    value: 1
                }, {
                    label: '国外',
                    value: 2
                }, {
                    label: '国内外',
                    value: 3
                }],
                // 时间存储
                bannerData:{
                    startTime: '',
                    endTime: '',
                    startTimeMd: '',
                    endTimeMd: '',
                    startTimeup: '',
                    endTimeup: ''
                }, 
                areaValue: 1, // 投资事件chart 国内 国外 默认国内
                areaValueIndusty: 3, // 某领域投资事件chart 国内 国外   默认国内外           
                industyValue: 221, // 某领域投资事件chart 领域select 默认企业服务
                companysData: []
            };
        },
        mounted: function () {
            document.title = '融资周报';
        },
        methods:{
            showError() {
                this.$message({
                    message: '请筛选一周的日期',
                    type: 'warning'
                });
            },
            showSuccess() {
                this.$message({
                    message: '筛选成功',
                    type: 'success'
                });
            },
            // 过滤数据
            filtersData: function(srcData) {
                var length = srcData.length;
                var dataNonull = [];
                for(var i = 0; i < length; i++) {
                    if (srcData[i].value) {
                        dataNonull.push(srcData[i]);
                    }
                }
                return dataNonull;
            },
            // 排序
            sortData: function(property, flag) {
                return function(obj1,obj2){
                    var value1 = obj1[property];
                    var value2 = obj2[property];
                    if(flag == 1) {
                        return value1 - value2;     // 升序
                    } else {
                        return value2 - value1;     // 降序
                    }
                }
            },
            submitBtn: function() {
                if(this.datevalue == ',' || this.datevalue == '') {
                    return;
                }
                this.areaValueChange();
                this.industyValueChange();
            },
            // 设置投资事件时间
            setDate() {
                if(this.datevalue == ',' || this.datevalue == '') {
                    this.bannerData.startTime = '';
                    this.bannerData.endTime = '';
                    this.bannerData.startTimeMd = '';
                    this.bannerData.endTimeMd = '';
                    this.bannerData.startTimeup = '';
                    this.bannerData.endTimeup = '';
                } else {
                    var start = new Date((this.datevalue[0]).format('yyyy/MM/dd')).getTime();
                    var end = new Date((this.datevalue[1]).format('yyyy/MM/dd')).getTime();
                    if ((end - start) !== 6*24*60*60*1000) {
                        this.showError();
                        this.datevalue = '';
                        return;
                    } else {
                        this.showSuccess();
                    }
                    this.bannerData.startTime = (this.datevalue[0]).format('yyyy-MM-dd');
                    this.bannerData.endTime = (this.datevalue[1]).format("yyyy-MM-dd");
                    this.bannerData.startTimeMd = (this.datevalue[0]).format("M.d");
                    this.bannerData.endTimeMd = (this.datevalue[1]).format("M.d");
                    this.bannerData.startTimeup = new Date(start - 7*24*60*60*1000).format('yyyy-MM-dd');
                    this.bannerData.endTimeup = new Date(start - 24*60*60*1000).format('yyyy-MM-dd');
                    this.bannerData.startTimeupMd = new Date(start - 7*24*60*60*1000).format('M.d');
                    this.bannerData.endTimeupMd = new Date(start - 24*60*60*1000).format('M.d');
                }
            },
            // 投资事件总结
            areaValueChange: function() {
                if(this.datevalue == ',' || this.datevalue == '') {
                    return;
                }
                this.getIndustyData()
                this.getIndustyData2()
                this.getPhaseData()
            },
            getIndustyData: function() {
                var _this = this;
                var sendData = {
                    area: this.areaValue,
                    startTime: this.bannerData.startTime,
                    endTime: this.bannerData.endTime
                }
                var nameArr =[];
                var valueArr = [];
                axios.get('/api/investment/countIndustryByTime', {params: sendData})
                .then(function (response) {
                    var dataNonull = _this.filtersData(response.data.data);// 去除value＝0的数据
                    dataNonull = dataNonull.sort(_this.sortData("value")); // 排序
                    for(var i = 0; i < dataNonull.length;i++) {
                        nameArr.push(dataNonull[i].name);    
                        valueArr.push(dataNonull[i].value);                  
                    }
                    var industyChart = echarts.init(document.getElementById('industyChart'));
                    var optionIndusty = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-'+ _this.bannerData.endTimeMd + '）' + _this.areaOptions[_this.areaValue - 1].label + '各领域获投数量',
                            x:'center'
                        },
                        toolbox: {  // 工具内容
                            show: true,
                            feature: {
                                saveAsImage: {
                                    pixelRatio: 2
                                }   // 保存图片
                            }
                        },
                        grid: {
                            bottom: '10%',
                            containLabel: true
                        },
                        color: ['#0076D0'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data :  nameArr,
                                axisTick: { //坐标轴刻度相关设置
                                    show: false
                                }, 
                                axisLabel:{   //坐标轴刻度标签的相关设置
                                    interval:0,  
                                    formatter:function(value)  
                                    {  
                                        return value.split("").join("\n");  
                                    },
                                    // rotate:-90,//倾斜度 -90 至 90 默认为0  
                                    margin:10,  
                                    textStyle:{  
                                        color:"#000"  
                                    }  
                                }, 
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                splitLine: { // y轴分割线
                                    show: false
                                },
                                axisTick: { //坐标轴刻度相关设置
                                    show: false
                                }
                            }
                        ],
                        series : [
                            {
                                name:'融资数量',
                                type:'bar',
                                barWidth: 10, // 柱状图的宽度
                                barGap: '10%', // 系列bar之间的距离设置
                                data: valueArr,
                                itemStyle: {
                                    normal:{ 
                                        label:{ 
                                            show: true,
                                            position: 'top',
                                            textStyle: {
                                                color: '#000'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    };
                    industyChart.setOption(optionIndusty);
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            getIndustyData2: function() {
                var _this = this;
                var sendData1 = {
                    area: this.areaValue,
                    startTime: this.bannerData.startTime,
                    endTime: this.bannerData.endTime
                }
                var sendData2 = {
                    area: this.areaValue,
                    startTime: this.bannerData.startTimeup,
                    endTime: this.bannerData.endTimeup
                }
                var nameArr1 =[];
                var nameArr2 =[];
                var valueArr1 = [];
                var valueArr2 = [];
                var nameObj1 = {};
                var nameObj2 = {};
                var dataProportion = [];
                axios.all([
                    axios.get('/api/investment/countIndustryByTime', {params: sendData1}),
                    axios.get('/api/investment/countIndustryByTime', {params: sendData2})
                ])
                .then(axios.spread(function (Resp1, Resp2) {
                    var dataNonull1 = _this.filtersData(Resp1.data.data);// 去除value＝0的数据
                    dataNonull1 = dataNonull1.sort(_this.sortData("value")); // 排序
                    for(var i = 0; i < dataNonull1.length;i++) {
                        nameArr1.push(dataNonull1[i].name);   
                        nameObj1[dataNonull1[i].name] = dataNonull1[i].value;
                    }
                    var dataNonull2 = _this.filtersData(Resp2.data.data);// 去除value＝0的数据
                    dataNonull2 = dataNonull2.sort(_this.sortData("value")); // 排序
                    for(var j = 0; j < dataNonull2.length;j++) {
                        nameArr2.push(dataNonull2[j].name);
                        nameObj2[dataNonull2[j].name] = dataNonull2[j].value;
                    }
                    function unique(arr){
                        var tmp = new Array();
                        for(var i in arr){
                            if(tmp.indexOf(arr[i])==-1){
                                tmp.push(arr[i]);
                            }
                        }
                        return tmp;
                    }
                    nameArr1 = unique(nameArr1.concat(nameArr2));
                    for(var n=0; n < nameArr1.length;n++) {
                        valueArr1.push(nameObj1[nameArr1[n]] || 0);
                        valueArr2.push(nameObj2[nameArr1[n]] || 0);
                        var tempVal = 0;
                        if (valueArr2[n] == 0) {
                            tempVal = '-';// 上上周＝0
                        } else if(valueArr1[n] == 0) {
                            tempVal = '-100'; // 上周＝0
                        } else {
                            tempVal = (valueArr1[n] - valueArr2[n])/valueArr2[n] * 100;
                        }
                        dataProportion.push(Math.round(tempVal));
                    }
                    var industyChart2 = echarts.init(document.getElementById('industyChart2'));
                    var optionIndusty2 = {
                        title : {
                            text: '前两周' + _this.areaOptions[_this.areaValue - 1].label + '各领域获投公司数量',
                            x: 'center',
                            // itemGap: '100',
                            // padding:[0,0,210,0]
                        },
                        legend: {
                            data: ['上上周（' + _this.bannerData.startTimeupMd + '-'+ _this.bannerData.endTimeupMd + '）', '上周（' + _this.bannerData.startTimeMd + '-'+ _this.bannerData.endTimeMd + '）'],
                            bottom: 0
                        },
                        toolbox: {  // 工具内容
                            show: true,
                            feature: {
                                saveAsImage: {
                                    pixelRatio: 2
                                }   // 保存图片
                            }
                        },
                        grid: {
                            bottom: '10%',
                            containLabel: true
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : nameArr1,
                                axisTick: { //坐标轴刻度相关设置
                                    show: false
                                }, 
                                axisLabel:{   //坐标轴刻度标签的相关设置
                                    interval:0,  
                                    formatter:function(value)  
                                    {  
                                        return value.split("").join("\n");  
                                    },
                                    // rotate:-90,//倾斜度 -90 至 90 默认为0  
                                    margin:10,  
                                    textStyle:{  
                                        color:"#000"  
                                    }  
                                }, 
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name: '',
                                splitLine: { // y轴分割线
                                    show: false
                                },
                                axisTick: { //坐标轴刻度相关设置
                                    show: false
                                }, 
                            },
                            // {
                            //     type: 'value',
                            //     name: '涨幅比例',
                            //     // min: -100,
                            //     // max: 100,
                            //     interval: 100,
                            //     axisLabel: {
                            //         formatter: '{value} %'
                            //     },
                            //     show: false
                            // }
                        ],
                        series : [
                            {
                                name:'上上周（' + _this.bannerData.startTimeupMd + '-'+ _this.bannerData.endTimeupMd + '）',
                                type:'bar',
                                barWidth: 10,
                                barGap: '0%', // 系列bar之间的距离设置
                                color: ['#0076D0'],
                                itemStyle: {
                                    normal:{ 
                                        label:{ // 柱状图显示数值
                                            show: true,
                                            position: 'top',
                                            textStyle: {
                                                color: '#000'
                                            }
                                        }
                                    }
                                },
                                data: valueArr2
                            },
                            {
                                name:'上周（' + _this.bannerData.startTimeMd + '-'+ _this.bannerData.endTimeMd + '）',
                                type:'bar',
                                barWidth: 10,
                                color: ['#3796d8'],
                                itemStyle: {
                                    normal:{ 
                                        label:{ 
                                            show: true,
                                            position: 'top',
                                            textStyle: {
                                                color: '#000'
                                            }
                                        }
                                    }
                                },
                                data: valueArr1                          
                            },
                            // {
                            //     name: '环比增长',
                            //     type: 'scatter',
                            //     yAxisIndex: 1,
                            //     symbolOffset: [0, -10], // 位置的偏移 水平 垂直
                            //     itemStyle: {
                            //         emphasis: {
                            //             shadowBlur: 10,
                            //             shadowOffsetX: 0,
                            //             shadowColor: 'rgba(0, 0, 0, 0.5)'
                            //         },
                            //         normal:{ 
                            //             // 图形及标注颜色
                            //             color: function (params) {
                            //                 if(params.value < 0) {
                            //                     return 'red';
                            //                 } else if(params.value >= 100) {
                            //                     return '#235fc5';
                            //                 } else {
                            //                     return '#222';
                            //                 }
                            //             },
                            //             label:{ 
                            //                 show: true, 
                            //                 position: 'top',
                            //                 formatter: '{c}%',
                            //                 textStyle: {
                            //                     // color: 'green',
                            //                 }
                            //             }
                            //         }
                            //     },
                            //     data: dataProportion
                            // }
                        ]
                    };
                    industyChart2.setOption(optionIndusty2);
                }))
                .catch(function (error) {
                    console.log(error);
                });
            },
            getPhaseData: function() {
                var _this = this;
                var sendData = {
                    area: this.areaValue,
                    startTime: this.bannerData.startTime,
                    endTime: this.bannerData.endTime,
                    industry: -1
                }
                axios.get('/api/investment/countPhaseByTime', {params: sendData})
                .then(function (response) {
                    var dataNonull = _this.filtersData(response.data.data);// 去除value＝0的数据
                    var phaseChart = echarts.init(document.getElementById('phaseChart'));
                    var optionPhase = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-'+ _this.bannerData.endTimeMd + '）' + _this.areaOptions[_this.areaValue - 1].label + '获投事件轮次分布',
                            x:'center'
                        },
                        toolbox: {  // 工具内容
                            show: true,
                            feature: {
                                saveAsImage: {
                                    pixelRatio: 2
                                }   // 保存图片
                            }
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series : [
                            {
                                name: '轮次',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data: dataNonull,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    },
                                    normal:{ 
                                        label:{ 
                                            show: true, 
                                            // formatter: '{b} \n{d}%',
                                            formatter: '{b} {d}%',
                                            textStyle: {
                                                color: '#000'
                                            }
                                        },
                                        color: function (params) {
                                            var colorList = [
                                                '#0076D0', '#43A8E0', '#22BA6F', '#41CC5D', '#FFA300',
                                                '#F2CE00', '#FF6000', '#FF7020', '#A6A6A6', '#D9D9D9',
                                                '#c1beff', '#c2e7ff', '#fabdff'];
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                }
                            }
                        ]
                    };
                    phaseChart.setOption(optionPhase);
                })
                .catch(function (error) {
                    console.log(error);
                })
            },

            // 某领域投资事件分析
            areaValueIndustyChange: function() {
                console.log(this.areaValueIndusty);
            },
            industyValueChange: function() {
                if(this.datevalue == ',' || this.datevalue == '') {
                    return;
                }
                for(var i = 0;i<this.locale.industy.length;i++) {
                    if(this.locale.industy[i].value == this.industyValue) {
                        this.industyName = this.locale.industy[i].name;
                    }
                }
                this.getPhaseDataOfIndusty();
                this.getAmountData();
                // this.getSubIndustryChart();
                // this.getMapChart();
                this.getData();
            },
            getPhaseDataOfIndusty: function() {
                var _this = this;
                var sendData = {
                    area: this.areaValue,
                    startTime: this.bannerData.startTime,
                    endTime: this.bannerData.endTime,
                    industry: this.industyValue
                }
                axios.get('/api/investment/countMergeIndustryByTime', {params: sendData})
                .then(function (response) {
                    var dataNonull = _this.filtersData(response.data.data);// 去除value＝0的数据
                    var phaseChartOfIndusty = echarts.init(document.getElementById('phaseChartOfIndusty'));
                    var optionPhase = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-'+ _this.bannerData.endTimeMd + '）'+ _this.industyName + '领域获投轮次分布',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        toolbox: {  // 工具内容
                            show: true,
                            feature: {
                                saveAsImage: {
                                    pixelRatio: 2
                                }   // 保存图片
                            }
                        },
                        series : [
                            {
                                name: '轮次',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data: dataNonull,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    },
                                    normal:{ 
                                        label:{ 
                                            show: true, 
                                            formatter: '{b} {d}%',
                                            textStyle: {
                                                color: '#000'
                                            }
                                        }, 
                                        color: function (params) {
                                            var colorList = [
                                                '#0076D0', '#43A8E0', '#22BA6F', '#41CC5D', '#FFA300',
                                                '#F2CE00', '#FF6000', '#FF7020', '#A6A6A6', '#D9D9D9',
                                                '#c1beff', '#c2e7ff', '#fabdff' 
                                            ];
                                            return colorList[params.dataIndex]
                                        },
                                        labelLine :{show:true} 
                                    }
                                }
                            }
                        ]
                    };
                    phaseChartOfIndusty.setOption(optionPhase);
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            getAmountData: function() {
                var _this = this;
                var sendData = {
                    // area: this.areaValue,
                    startTime: this.bannerData.startTime,
                    endTime: this.bannerData.endTime,
                    industry: this.industyValue
                }
                var nameArr = ['百万级', '千万级', '亿元级'];
                var nameArrTemp = [];
                var valueArrMTemp = [];
                var valueArrRTemp = [];
                var valueArrM = [];
                var valueArrR = [];
                var wplValue = '';
                axios.get('/api/investment/countMergeIndustryAmountInvestByTime', {params: sendData})
                .then(function (response) {
                    var dataNonull = response.data.data;
                    for(var i = 0; i < dataNonull.length;i++) {
                        if (dataNonull[i].name.indexOf('美元') > -1) {
                            valueArrM.push(dataNonull[i].value);
                        } else if (dataNonull[i].name.indexOf('人民币') > -1) {
                            valueArrR.push(dataNonull[i].value);
                        } else if(dataNonull[i].name.indexOf('未披露') > -1) {
                            wplValue = dataNonull[i].value;
                        }
                    }
                    valueArrM.reverse();// 亿 千万 百万  改为 百万 千万 亿 
                    valueArrR.reverse();
                    for(var j = 0; j < nameArr.length; j++) {
                        if(valueArrM[j] == 0 && valueArrR[j] == 0) {
                        } else {
                            nameArrTemp.push(nameArr[j]);
                            if (valueArrM[j] == 0) {
                                valueArrMTemp.push('');
                            } else {
                                valueArrMTemp.push(-valueArrM[j]);
                            }
                            if (valueArrR[j] == 0) {
                                valueArrRTemp.push('');
                            } else {
                                valueArrRTemp.push(valueArrR[j]);
                            }
                        }
                    }
                    console.log('name'+nameArrTemp);
                    console.log('valueM' +valueArrMTemp);
                    console.log('valueR' +valueArrRTemp);
                    var amountChart = echarts.init(document.getElementById('amountChart'));
                    var optionAmount = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-'+ _this.bannerData.endTimeMd + '）' + _this.industyName + '领域获投金额分布',
                            x:'center'
                        },
                        legend: {
                            data:[ '美元', '人民币', '金额未披露的融资数量：' + wplValue],
                            bottom: 0
                        },
                        toolbox: {  // 工具内容
                            show: true,
                            feature: {
                                saveAsImage: {
                                    pixelRatio: 2
                                }   // 保存图片
                            }
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter: function (params, ticket, callback) {
                                var res = '融资数量' ;
                                // var res = params[0].name ;
                                for (var i = 0, l = params.length; i < l; i++) {
                                    res += '<br/>' + params[i].name + params[i].seriesName + ' : ' + Math.abs(params[i].value) ;     
                                }
                                setTimeout(function () {
                                    // 仅为了模拟异步回调
                                    callback(ticket, res);
                                }, 500)
                                return 'loading...';
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '10%', // 图表距离
                            containLabel: true
                        },
                        xAxis: {
                            show: true,
                            type: 'value',
                            // name: '温度',
                            // nameGap: -30,
                            // nameLocation: 'end',
                            // splitLine: { // y轴分割线
                            //     show: false
                            // },
                            axisTick: { //坐标轴刻度相关设置
                                show: false
                            },
                            axisLabel : { 
                                formatter: function (value){return Math.abs(value);} //坐标轴显示的数值都取绝对值
                            } 
                        },
                        yAxis: {
                            type: 'category',
                            axisTick: { //坐标轴刻度相关设置
                                show: false
                            },
                            data: nameArrTemp                        
                        },
                        series: [
                            {
                                name:'人民币',
                                type:'bar',
                                barWidth: 15,
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right',
                                        textStyle: {
                                            color: '#000'
                                        },
                                    }
                                },
                                data: valueArrRTemp 
                            },
                            {
                                name:'美元',
                                type:'bar',
                                barWidth: 15,
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'left',
                                        textStyle: {
                                            color: '#000'
                                        },
                                        formatter:function(v){return Math.abs(v.data)}
                                    }
                                },
                                data: valueArrMTemp  
                            },
                            {
                                name: '金额未披露的融资数量：' + wplValue,
                                type:'bar',
                                stack: '总量',
                                data: [] 
                            }
                        ]
                    };
                    window.onresize = amountChart.resize;
                    amountChart.setOption(optionAmount);
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            // 单向柱状图金额
            getAmountData1: function() {
                var _this = this;
                var sendData = {
                    // area: this.areaValue,
                    startTime: this.bannerData.startTime,
                    endTime: this.bannerData.endTime,
                    industry: this.industyValue
                }
                var nameArr = [];
                var valueArr = [];
                axios.get('/api/investment/countAmountInvestByTime', {params: sendData})
                .then(function (response) {
                    var dataNonull = _this.filtersData(response.data.data);// 去除value＝0的数据
                    dataNonull = dataNonull.sort(_this.sortData("value", 1)); // 升序排序
                    var wplName = ''; // 未披露数据不排序
                    var wplValue = '';
                    for(var i = 0; i < dataNonull.length;i++) {
                        if(dataNonull[i].name !='未披露') {
                            nameArr.push(dataNonull[i].name);    
                            valueArr.push(dataNonull[i].value); 
                        } else if (dataNonull[i].name =='未披露'){
                            wplName = dataNonull[i].name;    
                            wplValue = dataNonull[i].value; 
                        }         
                    }
                    nameArr.unshift(wplName);
                    valueArr.unshift(wplValue);
                    var amountChart = echarts.init(document.getElementById('amountChart'));
                    var optionAmount = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-'+ _this.bannerData.endTimeMd + '）' + _this.industyName + '领域获投金额分布',
                            x:'center'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            show: false,
                            type: 'value',
                            splitLine: { // y轴分割线
                                show: false
                            },
                            axisTick: { //坐标轴刻度相关设置
                                show: false
                            },
                        },
                        yAxis: {
                            type: 'category',
                            axisTick: { //坐标轴刻度相关设置
                                show: false
                            },
                            axisLabel:{   //坐标轴刻度标签的相关设置
                                margin: -40,  
                            }, 
                            data: nameArr                        
                        },
                        series: [
                            {
                                name: '数量',
                                type: 'bar',
                                barWidth: 15,
                                itemStyle: {
                                    normal:{ 
                                        label:{ 
                                            show: true,
                                            position: 'right',
                                            textStyle: {
                                                color: '#000'
                                            }
                                        },
                                        color: function (params) {
                                            var colorList = [
                                                '#0076D0', '#43A8E0', '#22BA6F', '#41CC5D', '#FFA300',
                                                '#F2CE00', '#FF6000', '#FF7020', '#A6A6A6', '#D9D9D9'
                                            ];
                                            colorList.reverse();
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                },
                                data: valueArr                           
                            }
                        ]
                    };
                    amountChart.setOption(optionAmount);
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            getSubIndustryChart: function() {
                var _this = this;
                var sendData = {
                    area: this.areaValue,
                    startTime: this.bannerData.startTime,
                    endTime: this.bannerData.endTime,
                    industry: this.industyValue
                }
                var nameArr = [];
                var valueArr = [];
                axios.get('/api/investment/countFinanceAmountInvestment', {params: sendData})
                .then(function (response) {
                    var dataNonull = _this.filtersData(response.data.data);// 去除value＝0的数据
                    dataNonull = dataNonull.sort(_this.sortData("value", 1)); // 升序排序
                    for(var i = 0; i < dataNonull.length;i++) {
                        nameArr.push(dataNonull[i].name);    
                        valueArr.push(dataNonull[i].value);                  
                    }
                    var subIndustryChart = echarts.init(document.getElementById('subIndustryChart'));
                    var optionSubIndustry = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-'+ _this.bannerData.endTimeMd + '）' + _this.industyName + '领域获投子领域',
                            x:'center'
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            show: false,
                            type: 'value',
                            // position: 'top',
                            splitLine: { // y轴分割线
                                show: false
                            },
                            axisTick: { //坐标轴刻度相关设置
                                show: false
                            },
                        },
                        yAxis: {
                            type: 'category',
                            axisTick: { //坐标轴刻度相关设置
                                show: false
                            },
                            data: nameArr                       
                        },
                        series: [
                            {
                                name: '数量',
                                type: 'bar',
                                barWidth: 15,
                                itemStyle: {
                                    normal:{ 
                                        label:{ 
                                            show: true,
                                            position: 'right',
                                            textStyle: {
                                                color: '#000'
                                            }
                                        },
                                        color: function (params) {
                                            var colorList = [
                                                "#D9D9D9", "#A6A6A6", "#FF7020", "#FF6000", "#F2CE00", 
                                                "#FFA300", "#41CC5D", "#22BA6F", "#43A8E0", "#0076D0"
                                            ];
                                            return colorList[params.dataIndex]
                                        },
                                    }
                                },
                                rotate: 30,
                                data: valueArr                        
                            }
                        ]
                    };
                    subIndustryChart.setOption(optionSubIndustry);
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            getMapChart: function() {
                var _this = this;
                var sendData = {
                    startTime: this.bannerData.startTime,
                    endTime: this.bannerData.endTime,
                    industry: this.industyValue
                }
                axios.get('/api/investment/countCityInvestment', {params: sendData})
                .then(function (response) {
                    var dataNonull = response.data.data;// 去除value＝0的数据
                    var mapChart = echarts.init(document.getElementById('mapChart'));
                    var geoCoordMap = {
                        '新乡市':[35.18,113.52],
                        '宿州':[116.97,33.63],
                        '澳门':[113.5,22.2],
                        '海门':[121.15,31.89],
                        '鄂尔多斯':[109.781327,39.608266],
                        '招远':[120.38,37.35],
                        '舟山':[122.207216,29.985295],
                        '齐齐哈尔':[123.97,47.33],
                        '盐城':[120.13,33.38],
                        '赤峰':[118.87,42.28],
                        '青岛':[120.33,36.07],
                        '乳山':[121.52,36.89],
                        '金昌':[102.188043,38.520089],
                        '泉州':[118.58,24.93],
                        '莱西':[120.53,36.86],
                        '日照':[119.46,35.42],
                        '胶南':[119.97,35.88],
                        '南通':[121.05,32.08],
                        '拉萨':[91.11,29.97],
                        '云浮':[112.02,22.93],
                        '梅州':[116.1,24.55],
                        '文登':[122.05,37.2],
                        '上海':[121.48,31.22],
                        '攀枝花':[101.718637,26.582347],
                        '威海':[122.1,37.5],
                        '承德':[117.93,40.97],
                        '厦门':[118.1,24.46],
                        '汕尾':[115.375279,22.786211],
                        '潮州':[116.63,23.68],
                        '丹东':[124.37,40.13],
                        '太仓':[121.1,31.45],
                        '曲靖':[103.79,25.51],
                        '烟台':[121.39,37.52],
                        '福州':[119.3,26.08],
                        '瓦房店':[121.979603,39.627114],
                        '即墨':[120.45,36.38],
                        '抚顺':[123.97,41.97],
                        '玉溪':[102.52,24.35],
                        '张家口':[114.87,40.82],
                        '阳泉':[113.57,37.85],
                        '莱州':[119.942327,37.177017],
                        '湖州':[120.1,30.86],
                        '汕头':[116.69,23.39],
                        '昆山':[120.95,31.39],
                        '宁波':[121.56,29.86],
                        '湛江':[110.359377,21.270708],
                        '揭阳':[116.35,23.55],
                        '荣成':[122.41,37.16],
                        '连云港':[119.16,34.59],
                        '葫芦岛':[120.836932,40.711052],
                        '常熟':[120.74,31.64],
                        '东莞':[113.75,23.04],
                        '河源':[114.68,23.73],
                        '淮安':[119.15,33.5],
                        '泰州':[119.9,32.49],
                        '南宁':[108.33,22.84],
                        '营口':[122.18,40.65],
                        '惠州':[114.4,23.09],
                        '江阴':[120.26,31.91],
                        '蓬莱':[120.75,37.8],
                        '韶关':[113.62,24.84],
                        '嘉峪关':[98.289152,39.77313],
                        '广州':[113.23,23.16],
                        '延安':[109.47,36.6],
                        '太原':[112.53,37.87],
                        '清远':[113.01,23.7],
                        '中山':[113.38,22.52],
                        '昆明':[102.73,25.04],
                        '寿光':[118.73,36.86],
                        '盘锦':[122.070714,41.119997],
                        '长治':[113.08,36.18],
                        '深圳':[114.07,22.62],
                        '珠海':[113.52,22.3],
                        '宿迁':[118.3,33.96],
                        '咸阳':[108.72,34.36],
                        '铜川':[109.11,35.09],
                        '平度':[119.97,36.77],
                        '佛山':[113.11,23.05],
                        '海口':[110.35,20.02],
                        '江门':[113.06,22.61],
                        '章丘':[117.53,36.72],
                        '肇庆':[112.44,23.05],
                        '大连':[121.62,38.92],
                        '临汾':[111.5,36.08],
                        '吴江':[120.63,31.16],
                        '石嘴山':[106.39,39.04],
                        '沈阳':[123.38,41.8],
                        '苏州':[120.62,31.32],
                        '茂名':[110.88,21.68],
                        '嘉兴':[120.76,30.77],
                        '长春':[125.35,43.88],
                        '胶州':[120.03336,36.264622],
                        '银川':[106.27,38.47],
                        '张家港':[120.555821,31.875428],
                        '三门峡':[111.19,34.76],
                        '锦州':[121.15,41.13],
                        '南昌':[115.89,28.68],
                        '柳州':[109.4,24.33],
                        '三亚':[109.511909,18.252847],
                        '自贡':[104.778442,29.33903],
                        '吉林':[126.57,43.87],
                        '阳江':[111.95,21.85],
                        '泸州':[105.39,28.91],
                        '西宁':[101.74,36.56],
                        '宜宾':[104.56,29.77],
                        '呼和浩特':[111.65,40.82],
                        '成都':[104.06,30.67],
                        '大同':[113.3,40.12],
                        '镇江':[119.44,32.2],
                        '桂林':[110.28,25.29],
                        '张家界':[110.479191,29.117096],
                        '宜兴':[119.82,31.36],
                        '北海':[109.12,21.49],
                        '西安':[108.95,34.27],
                        '金坛':[119.56,31.74],
                        '东营':[118.49,37.46],
                        '牡丹江':[129.58,44.6],
                        '遵义':[106.9,27.7],
                        '绍兴':[120.58,30.01],
                        '扬州':[119.42,32.39],
                        '常州':[119.95,31.79],
                        '潍坊':[119.1,36.62],
                        '重庆':[106.54,29.59],
                        '台州':[121.420757,28.656386],
                        '南京':[118.78,32.04],
                        '滨州':[118.03,37.36],
                        '贵阳':[106.71,26.57],
                        '无锡':[120.29,31.59],
                        '本溪':[123.73,41.3],
                        '克拉玛依':[84.77,45.59],
                        '渭南':[109.5,34.52],
                        '马鞍山':[118.48,31.56],
                        '宝鸡':[107.15,34.38],
                        '焦作':[113.21,35.24],
                        '句容':[119.16,31.95],
                        '北京':[116.46,39.92],
                        '徐州':[117.2,34.26],
                        '衡水':[115.72,37.72],
                        '包头':[110,40.58],
                        '绵阳':[104.73,31.48],
                        '乌鲁木齐':[87.68,43.77],
                        '枣庄':[117.57,34.86],
                        '杭州':[120.19,30.26],
                        '淄博':[118.05,36.78],
                        '鞍山':[122.85,41.12],
                        '溧阳':[119.48,31.43],
                        '库尔勒':[86.06,41.68],
                        '安阳':[114.35,36.1],
                        '开封':[114.35,34.79],
                        '济南':[117,36.65],
                        '德阳':[104.37,31.13],
                        '温州':[120.65,28.01],
                        '九江':[115.97,29.71],
                        '邯郸':[114.47,36.6],
                        '临安':[119.72,30.23],
                        '兰州':[103.73,36.03],
                        '沧州':[116.83,38.33],
                        '临沂':[118.35,35.05],
                        '南充':[106.110698,30.837793],
                        '天津':[117.2,39.13],
                        '富阳':[119.95,30.07],
                        '泰安':[117.13,36.18],
                        '诸暨':[120.23,29.71],
                        '郑州':[113.65,34.76],
                        '哈尔滨':[126.63,45.75],
                        '聊城':[115.97,36.45],
                        '芜湖':[118.38,31.33],
                        '唐山':[118.02,39.63],
                        '平顶山':[113.29,33.75],
                        '邢台':[114.48,37.05],
                        '德州':[116.29,37.45],
                        '济宁':[116.59,35.38],
                        '荆州':[112.239741,30.335165],
                        '宜昌':[111.3,30.7],
                        '义乌':[120.06,29.32],
                        '丽水':[119.92,28.45],
                        '洛阳':[112.44,34.7],
                        '秦皇岛':[119.57,39.95],
                        '株洲':[113.16,27.83],
                        '石家庄':[114.48,38.03],
                        '莱芜':[117.67,36.19],
                        '常德':[111.69,29.05],
                        '保定':[115.48,38.85],
                        '湘潭':[112.91,27.87],
                        '金华':[119.64,29.12],
                        '岳阳':[113.09,29.37],
                        '长沙':[113,28.21],
                        '衢州':[118.88,28.97],
                        '廊坊':[116.7,39.53],
                        '菏泽':[115.480656,35.23375],
                        '合肥':[117.27,31.86],
                        '武汉':[114.31,30.52],
                        '大庆':[125.03,46.58]
                    };
                    var convertData = function (data) {
                        var res = [];
                        for (var i = 0; i < data.length; i++) {
                            var tempName = data[i].name.split('市')[0];
                            var geoCoord = geoCoordMap[tempName];
                            if (geoCoord) {
                                res.push({
                                    name: data[i].name,
                                    value: geoCoord.concat(data[i].value)
                                });
                            }
                        }
                        return res;
                    };
                    var optionMap = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-'+ _this.bannerData.endTimeMd + '）'+ _this.industyName + '领域获投地域',
                            left: 'center'
                        },
                        tooltip : {
                            trigger: 'item'
                        },
                        geo: {
                            map: 'china',
                            label: { // 
                            normal: {
                                    color: 'red',
                                    areaColor: '#000',
                                    borderColor: '#6eade3',
                                    borderWidth: '1'
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    color: '#f4e925',
                                    areaColor: '#fff',
                                    borderColor: '#6eade3',
                                    borderWidth: '1'
                                },
                                emphasis: {
                                    areaColor: '#fff'
                                }
                            }
                        },
                        series : [
                            {
                                name: '融资事件',
                                type: 'scatter',
                                coordinateSystem: 'geo',
                                symbolSize: function (val) {
                                    // console.log(val);// value值 [116.46, 39.92, 6]
                                    return val[2]*3;
                                },
                                itemStyle:{
                                    normal:{
                                        color: function (params) {
                                            var colorList = [
                                                '#0076D0', '#43A8E0', '#22BA6F', '#41CC5D', '#FFA300',
                                                '#F2CE00', '#FF6000', '#FF7020', '#A6A6A6', '#D9D9D9'
                                            ];
                                            return colorList[params.dataIndex]
                                        },
                                    }
                                },
                                label: {
                                    normal: {
                                        formatter: function(param) {
                                            var valArr = (param.value).toString().split(',')[2]
                                            return param.name + '\n' + valArr 
                                        },
                                        position: 'right',
                                        textStyle: {
                                            color: '#333'
                                        },
                                        show: true
                                    }
                                },
                                data: convertData(dataNonull.sort(function (a, b) {
                                    return (b.value - a.value);
                                })),
                                zlevel: 1
                            }
                        ]
                    };
                    mapChart.setOption(optionMap);
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            // 获取表格数据
            getData: function() {
                var _this = this;
                var sendData = {
                    startTime: this.bannerData.startTime,
                    endTime: this.bannerData.endTime,
                    industry: this.industyValue
                }
                axios.get('/api/investment/countInfoInvestByTime', {params: sendData})
                .then(function (response) {
                    _this.companysData = response.data.data;
                    for(var i = 0;i < _this.companysData.length;i++) {
                        var famount = _this.companysData[i].finance_amount;
                        if (famount.indexOf('未披露') > -1) {
                            _this.companysData[i].finance_amount = '未披露';
                        } else {
                            if(famount.indexOf('人民币') > -1) {
                                _this.companysData[i].finance_amount = '¥ ' + famount.split('人民币')[0];
                            }
                            if(famount.indexOf('美元') > -1) {
                                _this.companysData[i].finance_amount = '$ ' + famount.split('美元')[0];
                            }
                        }
                        
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
</script>
<style lang="less" module>
    /*
        静态资源引用方法
        background: ~"url(view/.assets/image/demo.png)"
    */
    @import (optional,reference) "~view/theme.less";
    .root{
        width:985px;
        margin: 60px auto;
        .block {
            margin-bottom: 10px;
        }
        .chartClass {
            min-width: 800px;
            min-height: 400px;
            margin-top: 50px;
        }
        .companys {
            margin-top: 30px;
            h3 {
                color: #235fc5;
                font-size: 20px;
                font-weight: 700;
                text-align: center;
                padding: 20px;
            }
            table {
                thead th{
                    color: #235fc5;
                    text-align: center;
                    padding: 15px 0;
                    font-weight: 700;
                    border-top:2px solid #6c90c4;
                    border-bottom:2px solid #6c90c4;
                }
                tbody tr {
                    font-size: 15px;
                    &:last-child {
                        border-bottom:2px solid #6c90c4;
                    }
                    td {
                        color: #5a5958;
                        padding: 15px 5px;
                        border-right:1px solid #b2c7e1;
                        vertical-align: middle;
                        line-height: 20px;
                        &:last-child {
                            border-right:none;
                        }
                    }
                }
                tbody tr:nth-child(odd) {
                    background-color: #d3e0ee;
                }
                tbody tr:nth-child(even) td{
                    border-right: none;
                }
            }
        }
    }
</style>

