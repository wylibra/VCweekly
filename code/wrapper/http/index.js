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
// 机构 列表
export function getOrgListData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}
// 机构详情-树
export function getOrgData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}

// gp 列表
export function getGpListData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}
// gp详情，基金详情 通用股东信息接口
export function getHolderData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}
// gp详情，基金详情 通用对外投资接口
export function getInvestData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}
// gp详情,基金详情 通用获取高管信息接口
export function getManagerData(extra){
    return instance.get('http://192.168.3.27:10188',{ params: extra}).then(result=>{
        return result.data;
    })
}
// gp详情 基金从业人员接口
export function getAmacPersonData(extra){
    return instance.get('http://192.168.3.27:10188',{ params: extra}).then(result=>{
        return result.data;
    })
}

// 基金 列表
export function getFundListData(extra){
    return instance.get('http://192.168.3.27:10188',{ params:  extra}).then(result=>{
        return result.data;
    });
}
