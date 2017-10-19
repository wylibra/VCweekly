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
