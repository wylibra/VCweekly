import axios from 'axios';

let baseURL='api';

const config={
    baseURL:baseURL,
    timeout:5000,
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    },
    transformResponse:(data)=>{
        let result=JSON.parse(data);
        return result;
    }
};
const instance=axios.create(config);
export function getTableData(extra){
    return instance.get('/investment/countInfoInvestByTime',{ params:  extra}).then(result=>{
        return result.data;
    });
}
// 机构详情-树
export function getOrgData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}
// gp详情-股东信息，基金详情-股东信息
export function getHolderData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}
// gp详情-对外投资，基金详情-对外投资
export function getInvestData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}
// fund 列表
export function getFundData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}
// gp 列表
export function getGpData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}
