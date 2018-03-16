package com.xywz.plan.action;

import java.io.PrintWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.ContextLoaderListener;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;
/*
 * 外贸订单管理
 */

@ParentPackage("json-default")
@Action(value="/XywzPlanPrdStatusQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzPlanPrdStatusQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    	StringBuilder sb=new StringBuilder(" SELECT"+
    			" T.CONTR_NUM,"+
    			" CST.CUST_SHT_NM,"+
    			" T.PRD_NAME,"+
    			" T.SPC_MODEL,"+
    			" T.MATERIALS,"+
    			" T.LEN,"+
    			" T.ZHI_CNT,"+
    			" T.JIAN_CNT,"+
    			" T.WEIGHT,"+
    			" T3.WEIGHT AS CHECK_WEIGHT,"+
    			" T.WORKSHOP,"+
    			" T.SCHEDU_DATE,"+
    			" T.SCHEDU_NUM,"+
    			" T3.CHECK_DT,"+
    			" T3.CHECK_STATUS"+
    			" FROM XYWZ_PLAN_PRDC_PLAN_ADVS_SNGL T"+
    			" INNER JOIN XYWZ_SALE_FRGN_ORDR_CONTR T1"+
    			" ON (T.CONTR_NUM=T1.CONTR_NUM)"+
    			" INNER JOIN XYWZ_CUST_CUSTINFO CST"+
    			" ON (T1.CUST_ID=CST.CUST_ID)"+
    			" LEFT OUTER JOIN XYWZ_WARE_QUALITY_CHECK T3"+
    			" ON ( T.CONTR_NUM = T3.CONTR_NUM AND T.SPC_MODEL = T3.SPC_MODEL AND T.PRD_NAME = T3.PRD_NAME )"+
    			" where 1=1 and T.SCHEDU_STATUS IN ('1','2','3') ");
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("scheduDate")){
                    sb.append(" and t.SCHEDU_DATE = '"+this.getJson().get(key)+"'");
                }else if(key.equals("scheduNum")){
                	sb.append(" and t.SCHEDU_NUM like '%"+this.getJson().get(key)+"%'");
                }else if(key.equals("workShop")){
                	sb.append(" and t.WORKSHOP like '%"+this.getJson().get(key)+"%'");
                }   
            }
        }

    	setPrimaryKey("T.CONTR_NUM desc ");
    	addOracleLookup("CHECK_STATUS", "XYWZ_CHECK_STATUS");
    	addOracleLookup("WORKSHOP", "XYWZ_WORKSHOP");
    	SQL=sb.toString();  	
    	datasource = ds;
    }
	
	//加载基础数据，调用存储过程
	@SuppressWarnings("unused")
	public void loadBaseDate() throws SQLException {
		ActionContext ctx = ActionContext.getContext();
		request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
		PrintWriter writer = null;
		Connection conn = null;
		ApplicationContext ac  = ContextLoader.getCurrentWebApplicationContext();
		DataSource ds = (DataSource)ac.getBean("dsOracle");
		CallableStatement cst = null;
		int result = 100;//默认值
		String sql = "";
		sql = "{call PROC_XYWZ_PROD_SITUATION(?)}";//存储过程()
		try{
			conn = ds.getConnection();//创建调用存储过程连接
			cst = conn.prepareCall(sql);//创建调用存储过程连接的预处理
			cst.registerOutParameter(1, Types.INTEGER);//注册输出参数
//			cst.setString(1, dt);//设置in参数的值
//			cst.setString(2, plan_id);//设置in参数的值
//			cst.setString(3, type_flag);//设置in参数的值
			cst.execute();
			result = cst.getInt(1);
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if (writer != null) {
				writer.close();
			}
		}
	
	}
}
