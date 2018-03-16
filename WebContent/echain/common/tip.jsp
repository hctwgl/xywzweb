<%@page contentType="text/html; charset=utf-8" %>
<style>span,table{font-size:10pt;margin:0pt}</style>
<script>
var count=0
function down1()
{
cleft=table1.style.pixelLeft
ctop=table1.style.pixelTop
cx=event.clientX
cy=event.clientY
count=1
}

function move1()
{
if(count==1)
 {table1.style.pixelLeft=cleft+event.clientX-cx
 table1.style.pixelTop=ctop+event.clientY-cy}
}

function up1()
{
count=0
}

function closewin()
{
table1.style.display='none'
}
function showhelp(title,content)
{
titlekey.innerText=title
message.innerText=content
table1.style.display=''
}
</script>
<table id=table1 bordercolorlight=#d8d0c8 bordercolordark=#808080 border=2 style=display:none;position:absolute;width:400;height:300;left:230;top:50;background-color:#c0c0c0;>
<tr><td style=vertical-align:top>
<span id=span1 onselectstart="return false" style="cursor:move;width:450;background-color:#002468;color:white" onmousedown=down1() onmouseup=up1() onmousemove=move1()>&nbsp;eChain Help

<span style=width:330;height:8;background:#002468></span>
<span id=x style="color:black;background:#d8d0c8;width:18;height:8;vertical-align:middle;text-align:center;padding:0;margin:2;cursor:hand;border-style:outset;border-width:2" onclick="closewin()">X</span></span>
<br>
<span style=width:10;background-color:#c0c0c0;height:200></span>

<span id=span2 style=border-style:solid;border-width:1;border-color:#808080;width:60;background-color:#808080;height:210><br>&nbsp;&nbsp;<b><font color=white>帮助</font></b>
</span>

<span style=border-style:solid;border-width:1;border-color:#808080;width:370;background-color:white;height:30;position:absolute;><br><h3><b>&nbsp;&nbsp;<span id=titlekey>帮助主题</span></b></h3></span>
<span id=call style=border-style:solid;border-width:1;border-color:#808080;width:370;background-color:white;height:160;text-align:left;>
<br>&nbsp;<span id=message style=width:350;height:130;background:white>这里显示帮助内容</span>
</span><br><br>
<span style=width:390;height:5;background:#c0c0c0></span>
<span><input type=button value="关闭" style="background-color:#F4F9FF;cursor:hand;BORDER: #B7BAC1 1pt solid;" onclick="closewin()"></span>
</td></tr>
</table>
<img src="<%=request.getContextPath() %>/echain/common/tips.gif" width="27" height="36">
                                                                                              
