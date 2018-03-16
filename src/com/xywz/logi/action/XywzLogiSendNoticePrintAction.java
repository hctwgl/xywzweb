/**
 * 
 */
package com.xywz.logi.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.opensymphony.xwork2.ActionContext;
import com.xywz.logi.model.XywzLogiSendNotice;
import com.xywz.logi.service.XywzLogiSendNoticeService;
import com.xywztech.bob.common.CommonAction;



@ParentPackage("json-default")
@Action(value="XywzLogiSendNoticePrintAction",results={@Result(name="success",type="json")})

public class XywzLogiSendNoticePrintAction  extends CommonAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Map<String ,Object> invMap = new HashMap<String, Object>();
	private List<XywzLogiSendNotice> invInfo;

	@Autowired
	private XywzLogiSendNoticeService xywzLogiSendNoticeService;

 
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;
	@Override
	public void prepare(){
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String sheetId = request.getParameter("sheetId");
		invInfo =  xywzLogiSendNoticeService.findAllXywzLogiNoticeInfo(Long.parseLong(sheetId));
		StringBuffer sql = new StringBuffer("SELECT * FROM XYWZ_LOGI_SEND_NOTICE WHERE T.SEND_SHEET_ADVS_ID = "+sheetId);
		SQL = sql.toString();
		datasource = dsOracle;
		invMap.put("invInfo", invInfo);
	}
	public String getInvInfo() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);

		String sheetId = request.getParameter("sheetId");
		StringBuffer sb = new StringBuffer();
		sb.append(" SELECT ORDR_NUM,SHIP_NAME,T1.PORT_NAME_CN AS LOAD_PORT,T2.PORT_NAME_CN AS UNLOAD_PORT,EXPCT_TO_PORT_DAY,T3.CORP_NM AS SHIP_AGENT," +
				"SHIP_AGENT_CONTCR,GDS_AGENT,GDS_AGENT_CONTCR,MAK_DOC_PERS_NM,LAST_GDS_SITU,QTY_POOR,WEIGHT_NGTV_POOR,SEND_GOODS_NOTICE, " +
				"IPE_DESC,UPN_DESC,DELV_ADDR,DELV_PERS,DELV_PERS_TEL,MK_TAB_PERS_NM,MK_TAB_DT,T.CONTR_NUM,T.CUST_ID "+
				"FROM XYWZ_LOGI_SEND_NOTICE T " +
				"INNER JOIN xywz_logi_port_info_mgmt T1 "+
				"ON ( T.LOAD_PORT = T1.PORT_ID ) "+
				"INNER JOIN xywz_logi_port_info_mgmt T2 "+
				"ON ( T.UNLOAD_PORT = T2.PORT_ID ) "+
				"LEFT OUTER JOIN XYWZ_LOGI_SHIP_CORP_MGMT T3 "+
				"ON ( T.SHIP_AGENT = T3.SHIP_CORP_ID )"+
				"WHERE T.SEND_SHEET_ADVS_ID = "+sheetId);
		StringBuffer sb1 = new StringBuffer();
		sb1.append("SELECT LABEL_ID, SHIPPINGMARKS, SIZE, QUALITY, HEAT_NUMBER, THICKNESS, MILLS_NAME, " +
				"BACK_NOTE, BUNDLE_NUMBER, PCS_BUNDLE, COLOUR, MEMO,HS_CODE,QTY FROM xywz_sale_label_mgmt "+
				" where SEND_ID  in ( select t.id from xywz_logi_delv_merchd t inner join xywz_logi_send_notice t1 " +
				"on t.send_sheet_advs_num=t1.send_sheet_advs_num and t1.SEND_SHEET_ADVS_ID="+sheetId+") ");
		StringBuffer sb2 = new StringBuffer();
		sb2.append(" select t.GDS_SRC,t.HS_CODE,t.MATERIALS,t.SPC_MODEL,t.QTY," +
				"(T.GDS_LENGTH*T.ZHI_CNT*T.QTY*T2.WEIGHT+T.REM_ZHI_CNT*T.GDS_LENGTH*T2.WEIGHT)/1000 AS WEIGHT, " +
				"CASE WHEN T.REM_ZHI_CNT > 0 THEN CONCAT(floor(T.ZHI_CNT),'PX',floor(T.QTY),'B','+',floor(T.REM_ZHI_CNT),'PX1B' ) ELSE CONCAT(floor(T.ZHI_CNT),'PX',floor(T.QTY),'B') END AS PKG " +				
				" from xywz_logi_delv_merchd t " +
				"INNER JOIN xywz_sysm_product_detail T2 "+
    			"ON ( T.SPC_MODEL = CONCAT(T2.SIZE,'X',truncate(T2.WAIST_DEPTH,2),'MM','X',truncate(T2.WEIGHT,2),'KG','/M') ) " +
				"inner join xywz_logi_send_notice t1 " +
				"on t.send_sheet_advs_num=t1.send_sheet_advs_num and t1.SEND_SHEET_ADVS_ID="+sheetId);
		       

		this.json= this.xywzLogiSendNoticeService.findLogiNoticeInfo(sb.toString(),sb1.toString(),sb2.toString(),sheetId);

		return "success";
	}
	
	public Map<String, Object> getInvMap() {
		return invMap;
	}
	public void setInvMap(Map<String, Object> invMap) {
		this.invMap = invMap;
	}
	
}
