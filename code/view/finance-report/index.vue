<template>
    <div :class="$style.root">
        <div :class="$style.block">
            <span>融资事件时间范围： </span>
            <el-date-picker v-model="datevalue" type="daterange" placeholder="选择融资时间范围" @change="setDate">
            </el-date-picker>
            &nbsp;&nbsp;
            <el-button type="primary" @click="submitBtn">确定</el-button>
        </div>
        <el-collapse v-model="activeNames">
            <el-collapse-item title="投资事件总结" name="1">
                <div>
                    <el-select v-model="areaValue" placeholder="请选择国内/国外" @change="areaValueChange()">
                        <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value">
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
                    <el-select v-model="industyValue" placeholder="请选择领域" @change="industyValueChange()">
                        <el-option v-for="item in locale.industy" :key="item.value" :label="item.name" :value="item.value">
                        </el-option>
                    </el-select>
                    <div id="phaseChartOfIndusty" :class="$style.chartClass"></div>
                    <!-- 某领域金额分布 -->
                    <div id="amountChart" :class="$style.chartClass"></div>
                </div>
            </el-collapse-item>
        </el-collapse>
        <br/>
        <SaveImg :table-name="table"></SaveImg>
        <div :class="$style.companys" id="table">
            <h3>{{industyName}}领域获投事件简介</h3>
            <table>
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'
import {getTableData} from 'wrapper/http'
import echarts from 'echarts'
import BackToTop from '../_backToTop/index'
import SaveImg from '../_saveImg/index'
export default {
    props: {
    },
    components: {
        BackToTop,SaveImg
    },
    data: function() {
        return {
            table: 'table',
            myBackToTopStyle: {
                right: '50px',
                bottom: '50px',
                width: '40px',
                height: '40px',
                'border-radius': '4px',
                'line-height': '45px', // 请保持与高度一致以垂直居中
                background: '#e7eaf1'// 按钮的背景颜色
            },
            textStyleTitle: {
                color: '#595959',
                fontSize: '14',
                fontFamily: 'Microsoft YaHei'
            },
            textStyle: {
                color: '#7F7F7F',
                fontSize: '12',
                fontFamily: 'Microsoft YaHei'
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
            bannerData: {
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
    mounted: function() {
        document.title = '融资周报';
        // this.$nextTick(function () {
        //  _this.table = document.getElementById('table')
        // });
    },
    methods: {
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
            for (var i = 0; i < length; i++) {
                if (srcData[i].value) {
                    dataNonull.push(srcData[i]);
                }
            }
            return dataNonull;
        },
        // 排序
        sortData: function(property, flag) {
            return function(obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                if (flag == 1) {
                    return value1 - value2;     // 升序
                } else {
                    return value2 - value1;     // 降序
                }
            }
        },
        submitBtn: function() {
            if (this.datevalue == ',' || this.datevalue == '') {
                return;
            }
            this.areaValueChange();
            this.industyValueChange();
        },
        // 设置投资事件时间
        setDate() {
            if (this.datevalue == ',' || this.datevalue == '') {
                this.bannerData.startTime = '';
                this.bannerData.endTime = '';
                this.bannerData.startTimeMd = '';
                this.bannerData.endTimeMd = '';
                this.bannerData.startTimeup = '';
                this.bannerData.endTimeup = '';
            } else {
                var start = new Date((this.datevalue[0]).format('yyyy/MM/dd')).getTime();
                var end = new Date((this.datevalue[1]).format('yyyy/MM/dd')).getTime();
                if ((end - start) !== 6 * 24 * 60 * 60 * 1000) {
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
                this.bannerData.startTimeup = new Date(start - 7 * 24 * 60 * 60 * 1000).format('yyyy-MM-dd');
                this.bannerData.endTimeup = new Date(start - 24 * 60 * 60 * 1000).format('yyyy-MM-dd');
                this.bannerData.startTimeupMd = new Date(start - 7 * 24 * 60 * 60 * 1000).format('M.d');
                this.bannerData.endTimeupMd = new Date(start - 24 * 60 * 60 * 1000).format('M.d');
            }
        },
        // 投资事件总结
        areaValueChange: function() {
            if (this.datevalue == ',' || this.datevalue == '') {
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
            var nameArr = [];
            var valueArr = [];
            axios.get('/api/investment/countIndustryByTime', { params: sendData })
                .then(function(response) {
                    var dataNonull = _this.filtersData(response.data.data);// 去除value＝0的数据
                    dataNonull = dataNonull.sort(_this.sortData("value")); // 排序
                    for (var i = 0; i < dataNonull.length; i++) {
                        nameArr.push(dataNonull[i].name);
                        valueArr.push(dataNonull[i].value);
                    }
                    var industyChart = echarts.init(document.getElementById('industyChart'));
                    var optionIndusty = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-' + _this.bannerData.endTimeMd + '）' + _this.areaOptions[_this.areaValue - 1].label + '各领域获投数量',
                            x: 'center',
                            textStyle: _this.textStyleTitle
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
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: nameArr,
                                axisTick: { //坐标轴刻度相关设置
                                    show: false
                                },
                                axisLabel: {   //坐标轴刻度标签的相关设置
                                    interval: 0,
                                    formatter: function(value) {
                                        return value.split("").join("\n");
                                    },
                                    // rotate:-90,//倾斜度 -90 至 90 默认为0  
                                    margin: 10,
                                    textStyle: _this.textStyle
                                },
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitLine: { // y轴分割线
                                    show: false
                                },
                                axisTick: { //坐标轴刻度相关设置
                                    show: false
                                },
                                axisLabel: {
                                    textStyle: _this.textStyle
                                },
                            }
                        ],
                        series: [
                            {
                                name: '融资数量',
                                type: 'bar',
                                barWidth: 10, // 柱状图的宽度
                                barGap: '10%', // 系列bar之间的距离设置
                                data: valueArr,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top',
                                            textStyle: _this.textStyle
                                        }
                                    }
                                }
                            }
                        ]
                    };
                    industyChart.setOption(optionIndusty);
                })
                .catch(function(error) {
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
            var nameArr1 = [];
            var nameArr2 = [];
            var valueArr1 = [];
            var valueArr2 = [];
            var nameObj1 = {};
            var nameObj2 = {};
            var dataProportion = [];
            axios.all([
                axios.get('/api/investment/countIndustryByTime', { params: sendData1 }),
                axios.get('/api/investment/countIndustryByTime', { params: sendData2 })
            ])
                .then(axios.spread(function(Resp1, Resp2) {
                    var dataNonull1 = _this.filtersData(Resp1.data.data);// 去除value＝0的数据
                    dataNonull1 = dataNonull1.sort(_this.sortData("value")); // 排序
                    for (var i = 0; i < dataNonull1.length; i++) {
                        nameArr1.push(dataNonull1[i].name);
                        nameObj1[dataNonull1[i].name] = dataNonull1[i].value;
                    }
                    var dataNonull2 = _this.filtersData(Resp2.data.data);// 去除value＝0的数据
                    dataNonull2 = dataNonull2.sort(_this.sortData("value")); // 排序
                    for (var j = 0; j < dataNonull2.length; j++) {
                        nameArr2.push(dataNonull2[j].name);
                        nameObj2[dataNonull2[j].name] = dataNonull2[j].value;
                    }
                    function unique(arr) {
                        var tmp = new Array();
                        for (var i in arr) {
                            if (tmp.indexOf(arr[i]) == -1) {
                                tmp.push(arr[i]);
                            }
                        }
                        return tmp;
                    }
                    nameArr1 = unique(nameArr1.concat(nameArr2));
                    for (var n = 0; n < nameArr1.length; n++) {
                        valueArr1.push(nameObj1[nameArr1[n]] || 0);
                        valueArr2.push(nameObj2[nameArr1[n]] || 0);
                        var tempVal = 0;
                        if (valueArr2[n] == 0) {
                            tempVal = '-';// 上上周＝0
                        } else if (valueArr1[n] == 0) {
                            tempVal = '-100'; // 上周＝0
                        } else {
                            tempVal = (valueArr1[n] - valueArr2[n]) / valueArr2[n] * 100;
                        }
                        dataProportion.push(Math.round(tempVal));
                    }
                    var industyChart2 = echarts.init(document.getElementById('industyChart2'));
                    var optionIndusty2 = {
                        title: {
                            text: '前两周' + _this.areaOptions[_this.areaValue - 1].label + '各领域获投公司数量',
                            x: 'center',
                            textStyle: _this.textStyleTitle
                            // itemGap: '100',
                            // padding:[0,0,210,0]
                        },
                        legend: {
                            data: ['上上周（' + _this.bannerData.startTimeupMd + '-' + _this.bannerData.endTimeupMd + '）', '上周（' + _this.bannerData.startTimeMd + '-' + _this.bannerData.endTimeMd + '）'],
                            bottom: 0,
                            textStyle: _this.textStyle
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
                        tooltip: {
                            trigger: 'axis'
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: nameArr1,
                                axisTick: { //坐标轴刻度相关设置
                                    show: false
                                },
                                axisLabel: {   //坐标轴刻度标签的相关设置
                                    interval: 0,
                                    formatter: function(value) {
                                        return value.split("").join("\n");
                                    },
                                    // rotate:-90,//倾斜度 -90 至 90 默认为0  
                                    margin: 10,
                                    textStyle: _this.textStyle
                                },
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '',
                                splitLine: { // y轴分割线
                                    show: false
                                },
                                axisTick: { //坐标轴刻度相关设置
                                    show: false
                                },
                                axisLabel: {
                                    textStyle: _this.textStyle
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
                        series: [
                            {
                                name: '上上周（' + _this.bannerData.startTimeupMd + '-' + _this.bannerData.endTimeupMd + '）',
                                type: 'bar',
                                barWidth: 10,
                                barGap: '0%', // 系列bar之间的距离设置
                                color: ['#0076D0'],
                                itemStyle: {
                                    normal: {
                                        label: { // 柱状图显示数值
                                            show: true,
                                            position: 'top',
                                            textStyle: _this.textStyle
                                        }
                                    }
                                },
                                data: valueArr2
                            },
                            {
                                name: '上周（' + _this.bannerData.startTimeMd + '-' + _this.bannerData.endTimeMd + '）',
                                type: 'bar',
                                barWidth: 10,
                                color: ['#3796d8'],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: 'top',
                                            textStyle: _this.textStyle
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
                .catch(function(error) {
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
            axios.get('/api/investment/countPhaseByTime', { params: sendData })
                .then(function(response) {
                    var dataNonull = _this.filtersData(response.data.data);// 去除value＝0的数据
                    var phaseChart = echarts.init(document.getElementById('phaseChart'));
                    var optionPhase = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-' + _this.bannerData.endTimeMd + '）' + _this.areaOptions[_this.areaValue - 1].label + '获投事件轮次分布',
                            x: 'center',
                            textStyle: _this.textStyleTitle
                        },
                        toolbox: {  // 工具内容
                            show: true,
                            feature: {
                                saveAsImage: {
                                    pixelRatio: 2
                                }   // 保存图片
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series: [
                            {
                                name: '轮次',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: dataNonull,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    },
                                    normal: {
                                        label: {
                                            show: true,
                                            // formatter: '{b} \n{d}%',
                                            formatter: '{b} {d}%',
                                            textStyle: _this.textStyle
                                        },
                                        color: function(params) {
                                            var colorList = [
                                                '#0076D0', '#43A8E0', '#22BA6F', '#41CC5D', '#FFA300',
                                                '#F2CE00', '#FF6000', '#FF7020', '#A6A6A6', '#D9D9D9',
                                                '#c1beff', '#c2e7ff', '#fabdff', '#0076D0', '#43A8E0', '#22BA6F', '#41CC5D', '#FFA300',
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
                .catch(function(error) {
                    console.log(error);
                })
        },

        // 某领域投资事件分析
        areaValueIndustyChange: function() {
            console.log(this.areaValueIndusty);
        },
        industyValueChange: function() {
            if (this.datevalue == ',' || this.datevalue == '') {
                return;
            }
            for (var i = 0; i < this.locale.industy.length; i++) {
                if (this.locale.industy[i].value == this.industyValue) {
                    this.industyName = this.locale.industy[i].name;
                }
            }
            this.getPhaseDataOfIndusty();
            this.getAmountData();
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
            axios.get('/api/investment/countMergeIndustryByTime', { params: sendData })
                .then(function(response) {
                    var dataNonull = _this.filtersData(response.data.data);// 去除value＝0的数据
                    var phaseChartOfIndusty = echarts.init(document.getElementById('phaseChartOfIndusty'));
                    var optionPhase = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-' + _this.bannerData.endTimeMd + '）' + _this.industyName + '领域获投轮次分布',
                            x: 'center',
                            textStyle: _this.textStyleTitle
                        },
                        tooltip: {
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
                        series: [
                            {
                                name: '轮次',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: dataNonull,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    },
                                    normal: {
                                        label: {
                                            show: true,
                                            formatter: '{b} {d}%',
                                            textStyle: _this.textStyle
                                        },
                                        color: function(params) {
                                            var colorList = [
                                                '#0076D0', '#43A8E0', '#22BA6F', '#41CC5D', '#FFA300',
                                                '#F2CE00', '#FF6000', '#FF7020', '#A6A6A6', '#D9D9D9',
                                                '#c1beff', '#c2e7ff', '#fabdff', '#0076D0', '#43A8E0', '#22BA6F', '#41CC5D', '#FFA300',
                                                '#F2CE00', '#FF6000', '#FF7020', '#A6A6A6', '#D9D9D9',
                                                '#c1beff', '#c2e7ff', '#fabdff'
                                            ];
                                            return colorList[params.dataIndex]
                                        },
                                        labelLine: { show: true }
                                    }
                                }
                            }
                        ]
                    };
                    phaseChartOfIndusty.setOption(optionPhase);
                })
                .catch(function(error) {
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
            axios.get('/api/investment/countMergeIndustryAmountInvestByTime', { params: sendData })
                .then(function(response) {
                    var dataNonull = response.data.data;
                    for (var i = 0; i < dataNonull.length; i++) {
                        if (dataNonull[i].name.indexOf('美元') > -1) {
                            valueArrM.push(dataNonull[i].value);
                        } else if (dataNonull[i].name.indexOf('人民币') > -1) {
                            valueArrR.push(dataNonull[i].value);
                        } else if (dataNonull[i].name.indexOf('未披露') > -1) {
                            wplValue = dataNonull[i].value;
                        }
                    }
                    valueArrM.reverse();// 亿 千万 百万  改为 百万 千万 亿 
                    valueArrR.reverse();
                    for (var j = 0; j < nameArr.length; j++) {
                        if (valueArrM[j] == 0 && valueArrR[j] == 0) {
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
                    console.log('name' + nameArrTemp);
                    console.log('valueM' + valueArrMTemp);
                    console.log('valueR' + valueArrRTemp);
                    var amountChart = echarts.init(document.getElementById('amountChart'));
                    var optionAmount = {
                        title: {
                            text: '上周（' + _this.bannerData.startTimeMd + '-' + _this.bannerData.endTimeMd + '）' + _this.industyName + '领域获投金额分布',
                            x: 'center',
                            textStyle: _this.textStyleTitle
                        },
                        legend: {
                            data: ['美元', '人民币', '金额未披露的融资数量：' + wplValue],
                            bottom: 0,
                            textStyle: _this.textStyle
                        },
                        toolbox: {  // 工具内容
                            show: true,
                            feature: {
                                saveAsImage: {
                                    pixelRatio: 2
                                }   // 保存图片
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter: function(params, ticket, callback) {
                                var res = '融资数量';
                                // var res = params[0].name ;
                                for (var i = 0, l = params.length; i < l; i++) {
                                    res += '<br/>' + params[i].name + params[i].seriesName + ' : ' + Math.abs(params[i].value);
                                }
                                setTimeout(function() {
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
                            axisLabel: {
                                textStyle: _this.textStyle,
                                formatter: function(value) { return Math.abs(value); } //坐标轴显示的数值都取绝对值
                            }
                        },
                        yAxis: {
                            type: 'category',
                            axisTick: { //坐标轴刻度相关设置
                                show: false
                            },
                            axisLabel: {
                                textStyle: _this.textStyle
                            },
                            data: nameArrTemp
                        },
                        series: [
                            {
                                name: '人民币',
                                type: 'bar',
                                barWidth: 15,
                                stack: '总量',
                                color: ['#0076D0'],
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right',
                                        textStyle: _this.textStyle
                                    }
                                },
                                data: valueArrRTemp
                            },
                            {
                                name: '美元',
                                type: 'bar',
                                barWidth: 15,
                                stack: '总量',
                                color: ['#F2CE00'],
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'left',
                                        textStyle: _this.textStyle,
                                        formatter: function(v) { return Math.abs(v.data) }
                                    }
                                },
                                data: valueArrMTemp
                            },
                            {
                                name: '金额未披露的融资数量：' + wplValue,
                                type: 'bar',
                                stack: '总量',
                                data: []
                            }
                        ]
                    };
                    window.onresize = amountChart.resize;
                    amountChart.setOption(optionAmount);
                })
                .catch(function(error) {
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
            getTableData(sendData).then(result=>{
                _this.companysData = result.data;
                for (var i = 0; i < _this.companysData.length; i++) {
                    var famount = _this.companysData[i].finance_amount;
                    if (famount.indexOf('未披露') > -1) {
                        _this.companysData[i].finance_amount = '未披露';
                    } else {
                        if (famount.indexOf('人民币') > -1) {
                            _this.companysData[i].finance_amount = '¥ ' + famount.split('人民币')[0];
                        }
                        if (famount.indexOf('美元') > -1) {
                            _this.companysData[i].finance_amount = '$ ' + famount.split('美元')[0];
                        }
                    }
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    }
}
</script>
<style lang="less" module>
/*
        静态资源引用方法
        background: ~"url(view/.assets/image/demo.png)"
    */

@import (optional, reference) "~view/theme.less";
.root {
    font-family: 'Microsoft YaHei';
    color: #848484;
    width: 985px;
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
            color: #0076D0;
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            padding: 20px;
        }
        table {
            thead th {
                background-color: #0076D0;
                color: #fff;
                font-size: 16px;
                text-align: center;
                padding: 15px 0;
                font-weight: 700; // border-top:2px solid #6c90c4;
            }
            tbody tr {
                font-size: 15px;
                &:last-child {
                    border-bottom: 2px solid #0076D0;
                }
                td {
                    color: #595959;
                    font-size: 16px;
                    padding: 15px 5px; // border-right:1px solid #b2c7e1;
                    vertical-align: middle;
                    line-height: 20px;
                    &:last-child {
                        border-right: none;
                    }
                }
            }
            tbody tr:nth-child(odd) {
                background-color: #F2F2F2;
            }
            tbody tr:nth-child(even) td {
                border-right: none;
            }
        }
    }
    a {
        text-decoration: none;
        color: #fff;
    }
}
</style>

