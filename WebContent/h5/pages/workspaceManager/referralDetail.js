/***
 * 功能描述：优惠活动
 *  作者 ：lan
 *  时间 ：2015-03-03
 *  版本 ：v1.0.0
 */
var start = 1,limit = 9,
	generatedCount = 0;

function loadData(id) {
//loadStart('数据正在初始化...','b',false);
	$.ajax({
		type : "GET",
		url :  basePath+'onsaleQueryAction.json?id='+id,
		cache: false, 
		dataType: 'json',
		async: false, 
		success : function(response){
			var aResult = response.json.data[0];
	
			var sql = "select PRODUCT_NAME,PIC_ADDR from OCRM_F_PD_PICLIB_MAINTENANCE where ISSUCSYNC=1 and STATUS=1 and TYPE=2 and PRODUCT_ID ='"+id+"' ";
			query(crmApp,sql,function(res){

				var data = res.rows;			
				var li1  = '<div class="cpxqPic"><img src="'+data.item(0).PIC_ADDR+'"/></div>'
							;
				   $("#referraNmae").append($(li1));
				
		});
			
			var li  = '<div class="fmList"><span>优惠活动名称：</span>'+aResult.ONSALE_NAME+'</div>'
					+'<div class="fmList"><span>优惠活动类型：</span>'+aResult.ONSALE_TYPE+'</div>'
					+'<div class="fmList"><span>优惠活动开始日期：</span>'+aResult.ONSALE_BEGIN_DT+'</div>'
					+'<div class="fmList"><span>优惠活动结束日期：</span>'+aResult.ONSALE_END_DT+'</div>'
					+'<div class="fmList"><span>活动详情：</span>'+aResult.ONSALE_CONTENT+'</div>'
					;
		   $("#goldPrdDtlList").append($(li));
		   
		  
		   
		   
		   
		},
		error:function(){
			//loadStop();
			//alert('数据初始化失败!!!!');
		}
	});

}

