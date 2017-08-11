const path=require('path2');

function getParentPath(path){
    var result=path.replace(/\/[^/]+$/,'');
    if(result.length<1||result.length==path.length){
        return null;
    }
    return result;
}
function getName(path){
    var result=/\/([^/]+)$/.exec(path);
    if(result==null)return path;
    else{
        return result[1];
    }
}
function flat(obj){
    function travel(obj,p){
        if(Array.isArray(obj)){
            obj.forEach(function(item){
                var newItem={
                    ...item
                };
                delete newItem.children;
                if(typeof p=='string'){
                    newItem.path=path.join(p,newItem.path);
                }
                result.push(newItem);
                if(item.children){
                    travel(item.children,newItem.path);
                }
            });
        }
    }
    var result=[];
    travel(obj,null);
    return result;
}
function merge(src,target){
    var obj={};
    src.forEach(function(item){
        obj[item.path]=item;
    });
    target.forEach(function(item){
        obj[item.path]=item;
    })
    return Object.keys(obj).map(function(key){
        return obj[key];
    })
}
module.exports=function (origin,routes){
    routes=routes.filter(function(route){return route!=null});
    routes=merge(routes,flat(origin.routes));
    var routesArray=[],
        routesMap={};
    routes.sort(function(a,b){
        return a.path.length-b.path.length;
    });
    routes.forEach(route=>{
        const {path}=route;
        const parentPath=getParentPath(path);
        const self=getName(path);

        if(!route.redirect){
            route.children=[];
            routesMap[path]=route;
        }

        if(parentPath!=null){
            route.path=self;
            if(!routesMap[parentPath])return;
            routesMap[parentPath].children.push(route);
        }
        else{
            routesArray.push(route);
        }
    });
    origin.routes=routesArray;
    return origin;
};