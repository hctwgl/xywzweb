$(function(){                
	function sizeHtml(){
	    var size = $(window).width()/16;
	    size = size>40?40:size;
	    $("html").css("font-size",size+"px");
	}
	sizeHtml();
	$(window).resize(function(){
	    sizeHtml();
	})
    $(".dialogTxt a").click(function(){
        $(".dialog").hide();
    })
    $(".dialogbg").click(function(){
        $(".dialog").hide();
    })
})
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r!=null){ 
		return unescape(r[2]);
	}else{ 
		return null;
	} //返回参数值
} 
/*提示框*/
function Hide(txt){
	$(".dialogImg").hide();
	$(".dialog").show();
	$(".dialogTxt").show();
	$(".dialog .dialogTxt span").text(txt);
}
function checkIdcardNotNull(idcard){
    var Errors=new Array(
        "ture",
        "呦！身份证号位数不对哦",
        "呦！这个身份证号是假的吧",
        "呦！还没有输入身份证号呀"
    );
    var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
    var idcard,Y,JYM;
    var S,M;
    var thisid = idcard;
    var idcard_array = new Array();

    //验证空
    if(idcard == ''){
        return false;
    }

    idcard_array = idcard.split("");
    //地区检验
    if(area[parseInt(idcard.substr(0,2))]==null) {
        return false;
    }
    if (idcard.substr(0,6) == "000000" || idcard.substr(0,6) == "111111" || idcard.substr(0,6) == "222222" || idcard.substr(0,6) == "333333" || idcard.substr(0,6) == "444444" || idcard.substr(0,6) == "555555" || idcard.substr(0,6) == "666666" || idcard.substr(0,6) == "777777" || idcard.substr(0,6) == "888888" || idcard.substr(0,6) == "999999")  {return false;}
    if (idcard.substr(0,6) == "123456" || idcard.substr(0,6) == "234567" || idcard.substr(0,6) == "345678" || idcard.substr(0,6) == "456789" || idcard.substr(0,6) == "567890" || idcard.substr(0,6) == "012345" || idcard.substr(0,6) == "543210" || idcard.substr(0,6) == "432109" || idcard.substr(0,6) == "321098" || idcard.substr(0,6) == "210987" || idcard.substr(0,6) == "109876" || idcard.substr(0,6) == "098765" || idcard.substr(0,6) == "987654" || idcard.substr(0,6) == "876543" || idcard.substr(0,6) == "765432")  {
        return false;}
    if (idcard.substr(0,6) == "121212" || idcard.substr(0,6) == "131313" || idcard.substr(0,6) == "141414" || idcard.substr(0,6) == "151515" || idcard.substr(0,6) == "161616" || idcard.substr(0,6) == "171717" || idcard.substr(0,6) == "181818" || idcard.substr(0,6) == "191919" || idcard.substr(0,6) == "101010")  {return false;}
    if (idcard.substr(0,6) == "212121" || idcard.substr(0,6) == "232323" || idcard.substr(0,6) == "242424" || idcard.substr(0,6) == "252525" || idcard.substr(0,6) == "262626" || idcard.substr(0,6) == "272727" || idcard.substr(0,6) == "282828" || idcard.substr(0,6) == "292929" || idcard.substr(0,6) == "202020")  {return false;}
    if (idcard.substr(0,6) == "313131" || idcard.substr(0,6) == "323232" || idcard.substr(0,6) == "343434" || idcard.substr(0,6) == "353535" || idcard.substr(0,6) == "363636" || idcard.substr(0,6) == "373737" || idcard.substr(0,6) == "383838" || idcard.substr(0,6) == "393939" || idcard.substr(0,6) == "303030")  {return false;}
    if (idcard.substr(0,6) == "414141" || idcard.substr(0,6) == "424242" || idcard.substr(0,6) == "434343" || idcard.substr(0,6) == "454545" || idcard.substr(0,6) == "464646" || idcard.substr(0,6) == "474747" || idcard.substr(0,6) == "484848" || idcard.substr(0,6) == "494949" || idcard.substr(0,6) == "404040")  {return false;}
    if (idcard.substr(0,6) == "515151" || idcard.substr(0,6) == "525252" || idcard.substr(0,6) == "535353" || idcard.substr(0,6) == "545454" || idcard.substr(0,6) == "565656" || idcard.substr(0,6) == "575757" || idcard.substr(0,6) == "585858" || idcard.substr(0,6) == "595959" || idcard.substr(0,6) == "505050")  {return false;}
    if (idcard.substr(0,6) == "616161" || idcard.substr(0,6) == "626262" || idcard.substr(0,6) == "636363" || idcard.substr(0,6) == "646464" || idcard.substr(0,6) == "656565" || idcard.substr(0,6) == "676767" || idcard.substr(0,6) == "686868" || idcard.substr(0,6) == "696969" || idcard.substr(0,6) == "606060")  {return false;}
    if (idcard.substr(0,6) == "717171" || idcard.substr(0,6) == "727272" || idcard.substr(0,6) == "737373" || idcard.substr(0,6) == "747474" || idcard.substr(0,6) == "757575" || idcard.substr(0,6) == "767676" || idcard.substr(0,6) == "787878" || idcard.substr(0,6) == "797979" || idcard.substr(0,6) == "707070")  {return false;}
    if (idcard.substr(0,6) == "818181" || idcard.substr(0,6) == "828282" || idcard.substr(0,6) == "838383" || idcard.substr(0,6) == "848484" || idcard.substr(0,6) == "858585" || idcard.substr(0,6) == "868686" || idcard.substr(0,6) == "878787" || idcard.substr(0,6) == "898989" || idcard.substr(0,6) == "808080")  {return false;}
    if (idcard.substr(0,6) == "919191" || idcard.substr(0,6) == "929292" || idcard.substr(0,6) == "939393" || idcard.substr(0,6) == "949494" || idcard.substr(0,6) == "959595" || idcard.substr(0,6) == "969696" || idcard.substr(0,6) == "979797" || idcard.substr(0,6) == "989898" || idcard.substr(0,6) == "909090")  {return false;}
    //身份号码位数及格式检验
    switch(idcard.length){
        case 15:
            if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
                ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
            } else {
                ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
            }
            if(ereg.test(idcard)) {
                return true;
            } else {

                return false;
            }
            break;
        case 18:
            //18位身份号码检测
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
                ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
            } else {
                ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
            }
            if(ereg.test(idcard)){//测试出生日期的合法性
                //计算校验位
                S =   (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                    + parseInt(idcard_array[7]) * 1
                    + parseInt(idcard_array[8]) * 6
                    + parseInt(idcard_array[9]) * 3 ;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y,1);//判断校验位
                if(M == idcard_array[17] || (M == 'X' && idcard_array[17] == 'x')) { //检测ID的校验位
                    return true;
                }else {
                    return false;
                }
            }else {

                return false;
            }
            break;
        default:

            return false;
            break;
    }
}