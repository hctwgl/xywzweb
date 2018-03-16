package com.xywz.logi.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.xywz.logi.model.XywzLogiDelvMerchd;
import com.xywz.logi.service.XywzLogiDelvMerchdService;
import com.xywztech.bob.common.CommonAction;


/*
 * 银行管理Action
 * @author 
 * @since 
 */

@SuppressWarnings("serial")
@Action("/XywzLogiDelvMerchdAction")
public class XywzLogiDelvMerchdAction extends CommonAction {
	
	@Autowired
	private XywzLogiDelvMerchdService service;//定义XywzParaBank属性
	//private XywzWareInvtyOut outService;
	

	
	@Autowired
	public void init() {
		model = new XywzLogiDelvMerchd();
		setCommonService(service);
	}
	
	public void modifyZhiCnt(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String id = request.getParameter("id");
        String totalZhi = request.getParameter("totalZhi");
        String zhiCnt=request.getParameter("zhiCnt");
		Double totalZhi1= Double.valueOf(totalZhi);  //总支数
		Double zhiCnt1=Double.valueOf(zhiCnt);       //支/件
		Double jianCnt = Math.floor(totalZhi1/zhiCnt1);
		Double remCnt = totalZhi1%zhiCnt1;
		System.out.print("jianCnt::"+jianCnt+"remCnt::"+remCnt);
		service.insertDelvMerchd( id,jianCnt, remCnt, zhiCnt1 );
//		String jql="update XywzLogiDelvMerchd C set C.qty="+jianCnt+",C.remZhiCnt="+remCnt+",C.zhiCnt="+zhiCnt1+
//   		" WHERE C.id ="+Long.parseLong(id); 
//		Map<String,Object> values=new HashMap<String,Object>();
//		service.batchUpdateByName(jql, values);
//		addActionMessage("batch update successfully");
	}

    @Override
	public String batchDestroy(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String outId = request.getParameter("outId");
		String jianCnt=request.getParameter("jianCnt");
		String remZhi=request.getParameter("remZhi");
		String weight1=request.getParameter("weight1");
		String totalZhi=request.getParameter("totalZhi");
		//Double jianCnt=
		service.insertDelMer(idStr);
		System.out.print("weight1:1111222222222222:::::::::"+weight1);
		String jql="DELETE FROM XywzLogiDelvMerchd C WHERE C.id IN ("+idStr+")";
		Map<String,Object> values=new HashMap<String,Object>();
		service.batchUpdateByName(jql, values);
		addActionMessage("batch removed successfully");		
		service.addWare(outId,jianCnt,remZhi,weight1,totalZhi);
		
        return "success";
    }
    public String distriWare(){
	   	ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String sendSheetAdvsId = request.getParameter("sendSheetAdvsNum");
		String gdsSrc = request.getParameter("gdsSrc");
		String jianCnt= request.getParameter("jianCnt");
		System.out.print("jianCnt:::::::::::::::::::::::::::"+jianCnt);
		String tmpRemZhiCnt=request.getParameter("tmpRemZhiCnt");
		System.out.print("tmpRemZhiCnt:::::::::::::::::::::::::::"+tmpRemZhiCnt);
		String tempWeight=request.getParameter("tempWeight");
		String totalZhi=request.getParameter("tmptotalZhi");
		System.out.print("totalZhi:::::::::::::::::::::::::::"+totalZhi);
		String zhiCnt = request.getParameter("zhiCnt");
		String prdId = request.getParameter("prdId");
		String materials=request.getParameter("materials");
		System.out.print("materials:::"+materials);
		System.out.print("tempWeight11111111111:::"+tempWeight);
		String[] ids =idStr.split("@");
		String[] gds = gdsSrc.split("@");
		String[] cnt = jianCnt.split("@");
		String[] zhiCnt1=tmpRemZhiCnt.split("@");
		String[] weight=tempWeight.split("@");
		String[] prd = prdId.split("@");
		String[] mater = materials.split("@");
		String[] totalZhiCnt = totalZhi.split("@");
	   // String[] zhi = zhiCnt.split(",");
		System.out.print("tempWeight::::::::::::"+tempWeight);
		System.out.println("ids.length="+ids.length);
		System.out.println("gds.length="+gds.length);
		System.out.println("cnt.length="+cnt.length);
		System.out.println("zhiCnt1.length="+zhiCnt1.length);
		System.out.println("weight.length="+weight.length);
		System.out.println("prd.length="+prd.length);
		System.out.println("mater.length="+mater.length);
		System.out.println("totalZhiCnt.length="+totalZhiCnt.length);
		
		for(int i=0;i<ids.length;i++){
//			System.out.println("mater[i]="+mater[i]);
//			if (gdsSrc==null){
//				gdsSrc="";
//				//service.distriWare(ids[i],sendSheetAdvsId,gdsSrc,cnt[i],zhi[i]);
//				service.distriWare(ids[i],sendSheetAdvsId,gdsSrc,cnt[i],zhiCnt1[i],weight[i],prd[i],mater[i],totalZhiCnt[i]);
//			}
//			if (gdsSrc!=null ){
//				if (gds[i]==null){
//					gds[i]="";
//				}	
			String materTmp="OTHER";
			if (mater.length>0 && mater[i] != null){
				materTmp=mater[i];
			}
			String cntTmp="0";
			if (cnt[i] != null){
				cntTmp = cnt[i];
			}
			String zhiCnt1Tmp="0";
			if (zhiCnt1[i] != null){
				zhiCnt1Tmp = zhiCnt1[i];
			}
			String weightTmp="0";
			if (weight[i] != null){
				weightTmp = weight[i];
			}
			String prdTmp ="OTHER";
			if (prd[i] != null){
				prdTmp = prd[i];
			}
			String totalZhiCntTmp="0";
			if (totalZhiCnt[i] != null){
				totalZhiCntTmp = totalZhiCnt[i];
			}
		    service.distriWare(ids[i],sendSheetAdvsId,gds[i],cntTmp,zhiCnt1Tmp,weightTmp,prdTmp,materTmp,totalZhiCntTmp);
				//service.distriWare(ids[i],sendSheetAdvsId,"1");
//			}
			
		}   	
        return "success";
    }
}



