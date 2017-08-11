// 自定义命令 key 命令  desc命令描述  default 执行操作
module.exports={
    key:'test',
    desc:'test',
    default:function(){
        console.log(this.util);
    }
};