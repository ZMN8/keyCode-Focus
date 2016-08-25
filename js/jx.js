/**
 * Created by Administrator on 2016/8/25.
 */
var inputNode=document.getElementsByTagName("input")[0];
var ulNode=document.getElementsByTagName("ul")[0];
var liNodes=ulNode.getElementsByTagName("li");

function clearBlock(str){//去除字符左右的空格
    return str=str.replace(/^(\s*)|(\s*)$/g,"") ;
}
function transfromFun(str){//转义
    str=str.replace(/>/g,"&gt");
    return str=str.replace(/</g,"&lt");
}

inputNode.onfocus=function(){
    var val=clearBlock(this.value);
    if(val=="添加标签，用空格或回车确认"){
        this.value="";
        this.style.color="#000";
    }
}
inputNode.onblur=function(){
    var val=clearBlock(this.value);
    if(val==""){
        this.value="添加标签，用空格或回车确认";
        this.style.color="#d8d8d8";
    }
};

inputNode.onkeypress=function(e){//keypress不识别组合键
    var event=window.event||e;
    var keyCode=event.keyCode||event.which;
    var val=clearBlock(this.value);//去除空格
    console.log("val: "+val);
    val=transfromFun(val);//转义，防止恶意代码植入
    console.log("val: "+val);


    if(keyCode==13 ||keyCode==32){//32表示回车键 13表示空格键
        if(val==""){
            this.value="";
            return alert("请输入内容");
        }

        if(val.length>12){
            this.value="";
            return alert("内容过长");
        }
        for(m=0;m<liNodes.length;m++){
            var spanNode=liNodes[m].getElementsByTagName("span")[0];
            if(spanNode.innerHTML==val){
                this.value="";
                return alert("内容不能重复！");
            }
        }
        var liNode=document.createElement("li");
        liNode.innerHTML="<span>"+val+"</span>";
        var iNode=document.createElement("i");
        iNode.onclick=function(){
            this.parentNode.parentNode.removeChild(this.parentNode);
        };
        iNode.innerHTML="x";
        liNode.appendChild(iNode);
        ulNode.appendChild(liNode);
        this.value="";
    }

};
