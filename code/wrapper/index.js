import axios from 'axios';
const config={
    baseURL:'/api',
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
export function applyTry(extra){
    // return instance.post('/jingdata/apply',extra).then(result=>{
    //     return result.data;
    // });
}
