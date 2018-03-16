/***
 * 功能描述：产品展示
 *  作者 ：lan
 *  时间 ：2015-03-03
 *  版本 ：v1.0.0
 */

function loadData(swiper) {
	var el = document.getElementById('productzs');
	var li = {};


	var sql = "select PRODUCT_NAME,PIC_ADDR,PRODUCT_ID from OCRM_F_PD_PICLIB_MAINTENANCE where ISSUCSYNC=1 and STATUS=1 and TYPE=1 ";
	query(crmApp,sql,function(res){
		var data = res.rows;
		alert(sql);
		if(data != null && data.length > 0){
			for (var i = 0; i < data.length; i++) {
				li[i] = '<div class="swiper-slide"><div id="Gallery" class="imMenuR " onclick="">'
					+ '	<a href="'+data.item(i).PIC_ADDR+'">'
					+ '<img class="imMenuI" src="'+data.item(i).PIC_ADDR+'"  alt="'+data.item(i).PRODUCT_NAME+'"  /></a></div></div>'
					;
				swiper.appendSlide(li[i],'swiper-slide','div');
		
			}
	}
		   	
});


//	var picDiv1='<div class="swiper-slide"><div id="Gallery" class="imMenuR " onclick="">'
//		+ '<a href="../themes/hbbank/images/a.jpg">'
//		+ '<img class="imMenuI" src="../../themes/hbbank/images/a.jpg" alt="产品A" /></a></div></div>';
//	swiper.appendSlide(picDiv1,'swiper-slide','div');
//	var picDiv2='<div class="swiper-slide"><div id="Gallery" class="imMenuR " onclick="">'
//		+ '<a href="../themes/hbbank/images/b.jpg">'
//		+ '<img class="imMenuI" src="../../themes/hbbank/images/b.jpg" alt="产品B" /></a></div></div>';
//	swiper.appendSlide(picDiv2,'swiper-slide','div');
//	var picDiv3='<div class="swiper-slide"><div id="Gallery" class="imMenuR " onclick="">'
//		+ '<a href="../themes/hbbank/images/c.jpg">'
//		+ '<img class="imMenuI" src="../../themes/hbbank/images/c.jpg" alt="产品C" /></a></div></div>';
//	swiper.appendSlide(picDiv3,'swiper-slide','div');
//	var picDiv4='<div class="swiper-slide"><div id="Gallery" class="imMenuR " onclick="">'
//		+ '<a href="../themes/hbbank/images/c.jpg">'
//		+ '<img class="imMenuI" src="../../themes/hbbank/images/d.jpg" alt="产品D" /></a></div></div>';
//	swiper.appendSlide(picDiv4,'swiper-slide','div');
//	var picDiv5='<div class="swiper-slide"><div id="Gallery" class="imMenuR " onclick="">'
//		+ '<a href="../themes/hbbank/images/c.jpg">'
//		+ '<img class="imMenuI" src="../../themes/hbbank/images/e.jpg" alt="产品E" /></a></div></div>';
//	swiper.appendSlide(picDiv5,'swiper-slide','div');
//	var picDiv6='<div class="swiper-slide"><div id="Gallery" class="imMenuR " onclick="">'
//		+ '<a href="../themes/hbbank/images/c.jpg">'
//		+ '<img class="imMenuI" src="../../themes/hbbank/images/f.jpg" alt="产品F" /></a></div></div>';
//	swiper.appendSlide(picDiv6,'swiper-slide','div');
}


