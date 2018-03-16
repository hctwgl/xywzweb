package com.xywztech.bcrm.sales.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.sales.model.OcrmFMkMktActivity;
import com.xywztech.bcrm.sales.service.MarketActivityService;
import com.xywztech.bob.common.CommonAction;
import com.xywztech.bob.core.LookupManager;
import com.xywztech.bob.vo.AuthUser;

/**
 * 营销活动管理-查询、维护、新增
 * @author sujm
 * @since 2013-02-20 
 */
@SuppressWarnings("serial")
@Action("/market-activity")
public class MarketActivityAction  extends CommonAction {
	
    @Autowired
	private MarketActivityService marketActivityService;
    
    @Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
    AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    @Autowired
	public void init(){
	  	model = new OcrmFMkMktActivity(); 
		setCommonService(marketActivityService);
		//新增修改删除记录是否记录日志,默认为false，不记录日志
		//needLog=true;
	}
    
   /**
    * 查询机构树节点信息
    */
    @Override
	public void prepare() {
        StringBuilder sb = new StringBuilder("SELECT A.*,K.CHECK_USER,K.ACTI_CHECK_ID,K.APP_REASON,UU.USERNAME FROM OCRM_F_MK_MKT_ACTIVITY A left join OCRM_F_MK_ACTI_CHECK K ON K.MKT_ACTI_ID=A.MKT_ACTI_ID LEFT JOIN SYS_USERS UU  ON uu.userid =A.CREATE_USER WHERE 1>0 ");
        // START 营销活动审批-查询专用
        String appSign = request.getParameter("appSign");
        if(null!=appSign&&appSign.length()>0&&"appSign".equals(appSign)){
        	sb.append(" and K.CHECK_USER = '"+auth.getUserId()+"' and (k.CHECK_STATUS = '2'or k.CHECK_STATUS = '1')");//查询审批状态为2 ：待审批的记录
        }
        //END
        
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("MKT_ACTI_NAME"))
                	sb.append(" and a."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("PSTART_DATE_S"))
                    sb.append(" and a.PSTART_DATE >= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
                else if(key.equals("PSTART_DATE_E"))
                	 sb.append(" and a.PSTART_DATE <= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
                else if(key.equals("PEND_DATE_S"))
                    sb.append(" and a.PEND_DATE >= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
                else if(key.equals("PEND_DATE_E"))
                	 sb.append(" and a.PEND_DATE <= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");
                else{
                	sb.append(" and a."+key+" like '%"+this.getJson().get(key)+"%'");
                }
            }
        }
        
        addOracleLookup("ACTI_STATUS", "MACTI_STATUS");
        addOracleLookup("MKT_ACTI_STAT", "MACTI_STATUS");
        addOracleLookup("APPROVE_STAT", "MACTI_APPROVE_STAT");
        addOracleLookup("MKT_ACTI_TYPE", "ACTI_TYPE");
        setPrimaryKey("a.MKT_ACTI_ID desc ");
        
        SQL=sb.toString();
        datasource = ds;
	}  
    
	@Override
	public String batchDestroy() {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx
				.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		marketActivityService.batchRemove(idStr);
		//删除关联产品信息
		String jql1="DELETE FROM OcrmFMkActiProduct C WHERE C.mktActiId IN ("+idStr+")";
		Map<String,Object> values1=new HashMap<String,Object>();
		marketActivityService.batchUpdateByName(jql1, values1);
		//删除关联客户信息
		String jql2="DELETE FROM OcrmFMkActiCustomer C WHERE C.mktActiId IN ("+idStr+")";
		Map<String,Object> values2=new HashMap<String,Object>();
		marketActivityService.batchUpdateByName(jql2, values2);
		//删除渠道信息
		String jql3="DELETE FROM OcrmFMkActiChannel C WHERE C.mktActiId IN ("+idStr+")";
		Map<String,Object> values3=new HashMap<String,Object>();
		marketActivityService.batchUpdateByName(jql3, values3);
		
		addActionMessage(" lookupMapping removed successfully");
		return "success";
	}
	
    //执行营销活动
    public String activityExecute() throws SQLException
    {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		String idStr = request.getParameter("idStr");
		String sign = request.getParameter("sign");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date= new Date();
		System.out.println(sdf.format(date));
		marketActivityService.saveActivity(idStr,sign);
		if("execute".equals(sign)){
			DataSource dataSource;
			dataSource = (DataSource) LookupManager.getInstance().getApplicationContext().getBean("dsOracle");		
			Connection conn=null;
			Statement stat=null;
			ResultSet rs = null;
				 conn = dataSource.getConnection();
				 stat = conn.createStatement();
				 String tempName = "的营销活动";
				 String sequences = "ID_SEQUENCE.NEXTVAL";
				 //执行营销活动，为每个客户的主办客户经理生成我的营销活动，S_ASSIGN置为1，没有主办客户经理的客户IS_ASSIGN置为0，由支行主管手工选取辖内的客户经理作为执行人。
				 String kindSql = " insert into OCRM_F_MK_MKT_MY_ACTI "+
				 " select "+sequences+", "+
				 " t.mkt_acti_id, "+
				 " t.cust_id,"+
				 " t.cust_name,"+
				 "'关于客户:'||trim(t.cust_name)||'"+tempName+"', "+
				 " cus.mgr_id, "+
				 " cus.mgr_name,"+
				 " t.progress_step, "+
//				 " (case when cus.mgr_id is null then '2' else '0' end) as ddd ,"+
				 "'0',"+
				 " t.create_user, "+//修正，创建人更正为主营销活动创建人
				 " TO_DATE('"+sdf.format(date)+"','YY-MM-DD'), "+
				 " '',"+
				 " '', "+
				 " (case when cus.mgr_id is null then '0' else '1' end) as eee, "+
				 " (select acc.org_id from admin_auth_account acc where acc.account_name =t.create_user) "+//修正，创建人更正为主营销活动创建人
				 " from ocrm_f_mk_acti_customer t "+
				 " left join ocrm_f_ci_belong_custmgr cus "+
				 " on cus.cust_id = t.cust_id "+
				 " and cus.main_type = '1' where t.Mkt_Acti_Id = '"+idStr+"' ";
				 int tt = stat.executeUpdate(kindSql);
				 if(conn!=null){
						conn.close();
					}if(stat!=null){
						stat.close();
					}if(rs!=null){
						rs.close();
					}	
		}
		addActionMessage(" lookupMapping removed successfully");
		return "success";
    }
}