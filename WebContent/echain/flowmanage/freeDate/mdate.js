function $(s){return document.getElementById(s);}

var lunarInfo=new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)
var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);//每月的天数
var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至")
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758)
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十')
var nStr2 = new Array('初','十','廿','卅','　')
//var monthName = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
var monthName = new Array("1","2","3","4","5","6","7","8","9","10","11","12");

//国历节日 *表示放假日
var sFtv = new Array(
"0101*元旦",
"0214 情人节",
"0308 妇女节",
"0312 植树节",
"0315 消费者权益日",
"0401 愚人节",
"0501 劳动节",
"0504 青年节",
"0512 护士节",
"0601 儿童节",
"0701 建党节",
"0801 建军节",
"0909 毛泽东逝世纪念",
"0910 教师节",
"0928 孔子诞辰",
"1001*国庆节",
"1006 老人节",
"1024 联合国日",
"1225 圣诞节",
"1226 毛泽东诞辰纪念")

//农历节日 *表示放假日
var lFtv = new Array(
"0101*春节",
"0115 元宵节",
"0505 端午节",
"0707 七夕节",
"0715 中元节",
"0815 中秋节",
"0909 重阳节",
"1208 腊八节",
"1224 小年",
"0100*除夕")

//某月的第几个星期几
var wFtv = new Array(
"0520 母亲节")

function lYearDays(y) {
   var i, sum = 348;
   for(i=0x8000; i>0x8; i>>=1)sum += (lunarInfo[y-1900]&i)?1:0;
   return(sum+leapDays(y))
}

function leapDays(y) {
   if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29)
   else return(0)
}

function leapMonth(y) {
   return(lunarInfo[y-1900] & 0xf)
}

function monthDays(y,m) {
   return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 )
}

function Lunar(objDate) {

   var i, leap=0, temp=0
   var baseDate = new Date(1900,0,31)
   var offset   = (objDate - baseDate)/86400000

   this.dayCyl = offset + 40
   this.monCyl = 14

   for(i=1900; i<2050 && offset>0; i++) {
      temp = lYearDays(i)
      offset -= temp
      this.monCyl += 12
   }

   if(offset<0) {
      offset += temp;
      i--;
      this.monCyl -= 12
   }

   this.year = i
   this.yearCyl = i-1864

   leap = leapMonth(i) 
   this.isLeap = false

   for(i=1; i<13 && offset>0; i++) {
      
      if(leap>0 && i==(leap+1) && this.isLeap==false)
         { --i; this.isLeap = true; temp = leapDays(this.year); }
      else
         { temp = monthDays(this.year, i); }

     
      if(this.isLeap==true && i==(leap+1)) this.isLeap = false

      offset -= temp
      if(this.isLeap == false) this.monCyl ++
   }

   if(offset==0 && leap>0 && i==leap+1)
      if(this.isLeap)
         { this.isLeap = false; }
      else
         { this.isLeap = true; --i; --this.monCyl;}

   if(offset<0){ offset += temp; --i; --this.monCyl; }

   this.month = i
   this.day = offset + 1
}

function solarDays(y,m) {
   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28)
   else
      return(solarMonth[m])
}
function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12])
}

function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {

      this.isToday    = false;
      this.sYear      = sYear;
      this.sMonth     = sMonth;
      this.sDay       = sDay;
      this.week       = week;
      this.lYear      = lYear;
      this.lMonth     = lMonth;
      this.lDay       = lDay;
      this.isLeap     = isLeap;
      this.cYear      = cYear;
      this.cMonth     = cMonth;
      this.cDay       = cDay;

      this.color      = '';

      this.lunarFestival = ''; //农历节日
      this.solarFestival = ''; //国历节日
      this.solarTerms    = ''; //节气

}

function sTerm(y,n) {
   var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) )
   return(offDate.getUTCDate())
}

function calendar(y,m) {
   var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2
   var lDPOS = new Array(3)
   var n = 0
   var firstLM = 0
   sDObj = new Date(y,m,1)            //当月一日日期
   this.length    = solarDays(y,m)    //国历当月天数
   this.firstWeek = sDObj.getDay()    //国历当月1日星期几
   for(var i=0;i<this.length;i++) {
      if(lD>lX) {
         sDObj = new Date(y,m,i+1)    //当月一日日期
         lDObj = new Lunar(sDObj)     //农历
         lY    = lDObj.year           //农历年
         lM    = lDObj.month          //农历月
         lD    = lDObj.day            //农历日
         lL    = lDObj.isLeap         //农历是否闰月
         lX    = lL? leapDays(lY): monthDays(lY,lM) //农历当月最後一天

         if(n==0) firstLM = lM
         lDPOS[n++] = i-lD+1
      }

      //sYear,sMonth,sDay,week,
      //lYear,lMonth,lDay,isLeap,
      //cYear,cMonth,cDay
      this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                               lY, lM, lD++, lL,
                               cyclical(lDObj.yearCyl) ,cyclical(lDObj.monCyl), cyclical(lDObj.dayCyl++) )


      if((i+this.firstWeek)%7==0)   this[i].color = '#CDBC71'  //周日颜色
      if((i+this.firstWeek)%14==13) this[i].color = '#CDBC71'  //周休二日颜色
   }
   
   tmp1=sTerm(y,m*2)-1
   tmp2=sTerm(y,m*2+1)-1
   this[tmp1].solarTerms = solarTerm[m*2]
   this[tmp2].solarTerms = solarTerm[m*2+1]
   if(m==3) this[tmp1].color = 'red' //清明颜色
//公历节日
   for(i in sFtv)
      if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)){
         if(Number(RegExp.$1)==(m+1)) {
            this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' '
            if(RegExp.$3=='*') this[Number(RegExp.$2)-1].color = 'red'
         }
      }
//特殊节日
   for(i in wFtv)
      if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            tmp1=Number(RegExp.$2)
            tmp2=Number(RegExp.$3)
            this[((this.firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' '
         }
   //农历节日
   for(i in lFtv)
      if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
         tmp1=Number(RegExp.$1)-firstLM
         if(tmp1==-11) tmp1=1
         if(tmp1 >=0 && tmp1<n) {
            tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1
            if( tmp2 >= 0 && tmp2<this.length) {
               this[tmp2].lunarFestival += RegExp.$4 + ' '
               if(RegExp.$3=='*') this[tmp2].color = 'red'
            }
         }
      }

   //今日
   if(y==tYy && m==tMm)this[tD-1].isToday = true

}

//====================== 中文日期
function cDay(d){
   var s;

   switch (d) {
      case 10:
         s = '初十'; break;
      case 20:
         s = '二十'; break;
         break;
      case 30:
         s = '三十'; break;
         break;
      default :
         s = nStr2[Math.floor(d/10)];
         s += nStr1[d%10];
   }
   return(s);
}

///////////////////////////////////////////////////////////////////////////////

var cld;

function drawCld(SY,SM) {
   var i,sD,s,size,disYMD;
   var isart;//是否非工作日（周末、节假日）
   cld = new calendar(SY,SM);
   $("GZ").innerHTML =  cyclical(SY-1900+36) + '年('+Animals[(SY-4)%12]+')';
   $("YMBG").innerHTML = SY + "年" + monthName[SM] + "月";
   for(i=0;i<42;i++) {
      sObj=$('SD'+ i);//公历
      lObj=$('LD'+ i);//农历
	  tdObj=$('TD'+ i);//单元格

      sObj.className = '';
	  tdObj.className = '';

      sD = i - cld.firstWeek;

      if(sD>-1 && sD<cld.length) { 
		 isart=false;
		  //是否有文章
		  //alert(arrArtdate);
		for(j in arrArtdate){
			b=arrArtdate[j];
			if(b.substring(0,4)==SY&&b.substring(4,6)==SM+1&&b.substring(6,8)==sD+1)isart=true;
		 }
		 disYMD=SY;//显示8为日期格式,如20090808
		 disYMD+=SM<9?("0"+(SM+1)):""+(SM+1);
		 disYMD+=sD<9?("0"+(sD+1)):""+(sD+1);
		 
         if(isart){
			 sObj.innerHTML = (sD+1)+" <img src='echain/flowmanage/freeDate/close.gif' style='cursor:hand' alt='点击设置为工作日' onClick=\"doSetWorkDate("+disYMD+")\">";
			 sObj.color = '#CDBC71' 
			 tdObj.className="freeDateTD";
		 }
		 else{
			 sObj.innerHTML = (sD+1)+" <img src='echain/flowmanage/freeDate/dot.gif' style='cursor:hand' alt='点击设置为非工作日' onClick=\"doSetFreeDate("+disYMD+")\">";
		 }

         if(cld[sD].isToday) sObj.className = 'todayColor'; 
         sObj.style.color = cld[sD].color; 

         if(cld[sD].lDay==1) 
            lObj.innerHTML = '<b>'+(cld[sD].isLeap?'闰':'') + cld[sD].lMonth + '月' + (monthDays(cld[sD].lYear,cld[sD].lMonth)==29?'小':'大')+'</b>';
         else 
            lObj.innerHTML = cDay(cld[sD].lDay);

         s=cld[sD].lunarFestival;
		 sObj.title=s;
         if(s.length>0) { 
            if(s.length>6) s = s.substr(0, 4)+'..';
            s = s.fontcolor('#6FC2FF');
         }
         else { //国历节日
            s=cld[sD].solarFestival;
			sObj.title=s;
            if(s.length>0) {
               size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?8:4;
               if(s.length>size+2) s = s.substr(0, size)+'…';
               s = s.fontcolor('#6FC2FF');
            }
            else { //廿四节气
               s=cld[sD].solarTerms;
			   sObj.title=s;
               if(s.length>0) s = s.fontcolor('limegreen');
            }
         }
         if(s.length>0) lObj.innerHTML = s;else sObj.title =lObj.innerHTML;

      }
      else { //非日期
         sObj.innerHTML = '';
         lObj.innerHTML = '';
      }
	  
   }
}



function changeCld() {

   drawCld(mYear,mMonth);
}

function pushBtm(K) {
   switch (K){
      case 'YU' :
		 mYear--;
		 if(mYear<1900)mYear=1900;
         break;
      case 'YD' :
         mYear++;
	     if(mYear>2050)mYear=2050;
         break;
      case 'MU' :
         mMonth--;
		 if(mMonth<0){
			 mMonth=11;
			 mYear--;
			 document.submitForm.action = "monitorservlet?method=echainflowmanage&actionType=freedate&subType=getFreeDate";
   			 document.submitForm.year.value =mYear;
   			 document.submitForm.month.value =mMonth+1;
			 document.submitForm.submit();
		 }
         break;
      case 'MD' :
		 mMonth++;
		 if(mMonth>11){
			 mMonth=0;
			 mYear++;
			 document.submitForm.action = "monitorservlet?method=echainflowmanage&actionType=freedate&subType=getFreeDate";
   			 document.submitForm.year.value =mYear;
   			 document.submitForm.month.value =mMonth+1;
			 document.submitForm.submit();
		 }
         break;
      default :

   }
   document.submitForm.year.value =mYear;
   document.submitForm.month.value =mMonth+1;
   changeCld();
}

var Today = new Date();//初始化当前时间
var tY = Today.getFullYear();//年份，4位，2009，变量
var tM = Today.getMonth();//月份，2位，08，变量
var tYy = Today.getFullYear();//年份，静态
var tMm = Today.getMonth();//月份，静态
var tD = Today.getDate();//日子，2位，12
var mYear=tY,mMonth=tM;
//////////////////////////////////////////////////////////////////////////////

function initial(_date,year,month) {
if(year!=null)
tY=year;
if(month!=null)
tM=(month-1);
mYear=tY;
mMonth=tM;
//alert("year="+year+";month="+month+";tY="+tY+";tM="+tM);
var shtml="<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"border-collapse: collapse\" bgcolor=\"#F6F8F8\"  border=\"0\" id=\"datetable\">\n";
shtml+="	  <tr align=\"center\" bgcolor=\"#EDF2F2\" style=\"color:#A6AA97\">\n";
shtml+="		<td width=\"90\" height=\"30\">日</td>\n";
shtml+="		<td width=\"90\">一</td>\n";
shtml+="		<td width=\"90\">二</td>\n";
shtml+="		<td width=\"90\">三</td>\n";
shtml+="		<td width=\"90\">四</td>\n";
shtml+="		<td width=\"90\">五</td>\n";
shtml+="		<td width=\"90\">六</td></tr>\n";
for(i=0;i<6;i++) {
shtml+="	  <tr align=\"center\" height=\"45\">\n";
	for(j=0;j<7;j++) {
		gNum = i*7+j

		shtml+="	  <td id=\"TD"+gNum+"\" nowrap=\"nowrap\">\n";

		shtml+="<font id=\"SD" + gNum +"\" size=\"2\"  face=\"Arial Black\"";
		if(j == 0||j == 6)shtml+=" color=\"#CDBC71\"";else shtml+=" color=\"#A6AA97\""
		
		shtml+=" TITLE=\"\"> d</font><br /><font id=\"LD" + gNum + "\" style=\"font-size:9pt\"> f</font></td>";

	  }
shtml+="	  </tr>\n";
}
shtml+="</table>";
document.getElementById(_date).innerHTML=shtml;
drawCld(tY,tM);
}