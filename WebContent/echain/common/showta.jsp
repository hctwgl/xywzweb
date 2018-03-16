<%@page contentType="text/html; charset=utf-8" %>
<style>span,table{font-size:10pt;margin:0pt}</style>
<script>
var count=0;
function down1(){
cleft=table1.style.pixelLeft;
ctop=table1.style.pixelTop;
cx=event.clientX;
cy=event.clientY;
count=1;
}

function move1(){
if(count==1){
	table1.style.pixelLeft=cleft+event.clientX-cx;
 	table1.style.pixelTop=ctop+event.clientY-cy;
}
}

function up1(){
count=0;
}

function closewin(){
table1.style.display='none';
}
function showta(id){
document.getElementById("message").value=document.getElementById(id).value;
table1.style.display='';
}
</script>
<table id=table1 bordercolorlight=#d8d0c8 bordercolordark=#808080 border=1 style=display:none;position:absolute;width:500;height:300;left:200;top:100;background-color:#c0c0c0;>
<tr><td style=vertical-align:top>
<span id=span1 onselectstart="return false" style="cursor:move;width:550;background-color:#002468;color:white" onmousedown=down1() onmouseup=up1() onmousemove=move1()>&nbsp;eChain意见查看
<span style=width:418;height:8;background:#002468></span>
<span id=x style="color:black;background:#d8d0c8;width:18;height:8;vertical-align:middle;text-align:center;padding:0;margin:2;cursor:hand;border-style:outset;border-width:2" onclick="closewin()">X</span>
</span>
<br>
<textarea id='message' rows=16 cols=75 style='background-color:#fafafa'></textarea>
<span style=width:510;height:5;background:#c0c0c0></span>
<span><input type=button value="关闭" style="background-color:#F4F9FF;cursor:hand;BORDER: #B7BAC1 1pt solid;" onclick="closewin()"></span>
</td></tr>
</table>