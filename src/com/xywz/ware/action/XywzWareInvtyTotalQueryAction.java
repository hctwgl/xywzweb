package com.xywz.ware.action;

import java.io.PrintWriter;
import java.sql.SQLException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.ContextLoaderListener;
import com.opensymphony.xwork2.ActionContext;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;
/*
 * 仓库汇总
 */

@ParentPackage("json-default")
@Action(value="/XywzWareInvtyTotalQueryAction", results={
    @Result(name="success", type="json")
})
public class XywzWareInvtyTotalQueryAction extends BaseQueryAction {
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds; 
	private HttpServletRequest request;
	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
    	request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
    	
    	AuthUser auth = (AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	try {
			loadBaseDate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	StringBuilder sb=new StringBuilder(
//    			"SELECT "
//    			+"TT.PRD_NAME,TT.SPC_MODEL,TT.MATERIALS,TT.NGTV_POOR,TT.LL_WEIGHT,TT.LEN,TT.ZHI_CNT,"
//    			+"CASE WHEN MER.CONFIRM_SEND = '0' THEN TT.TOTOAL_ZHI+MER.TOTAL_ZHI else TT.TOTOAL_ZHI end AS REM_TOTAL_ZHI,"
//    			+"TRUNCATE((CASE WHEN MER.CONFIRM_SEND = '0' THEN TT.TOTOAL_ZHI+MER.TOTAL_ZHI ELSE TT.TOTOAL_ZHI END)/NULLIF(TT.ZHI_CNT,0),0) AS REM_JIAN_CNT,"
//    			+"(CASE WHEN MER.CONFIRM_SEND = '0' THEN TT.TOTOAL_ZHI+MER.TOTAL_ZHI ELSE TT.TOTOAL_ZHI END)% NULLIF(TT.ZHI_CNT,0) AS REM_REM_ZHI_CNT,"
//    			+"CASE WHEN MER.CONFIRM_SEND = '0' THEN TT.WEIGHT+MER.WEIGHT ELSE TT.WEIGHT END AS REM_WEIGHT "
//    			+"FROM ( "
//    			+"SELECT "
//    			+"T.PRD_NAME,T.SPC_MODEL,PRD.MATERIALS,T.NGTV_POOR,PRD.WEIGHT AS LL_WEIGHT,T.LEN,T.ZHI_CNT, "
//    			+"SUM(CASE WHEN T.JIAN_CNT IS NULL THEN 0 ELSE T.JIAN_CNT END) AS JIAN_CNT, "
//    			+"SUM(CASE WHEN T.REM_ZHI_CNT IS NULL THEN 0 ELSE T.REM_ZHI_CNT END) AS REM_ZHI_CNT, "
//    			+"SUM(CASE WHEN T.WEIGHT IS NULL THEN 0 ELSE T.WEIGHT END) AS WEIGHT, "
//    			+"SUM(CASE WHEN T.JIAN_CNT IS NULL THEN 0 ELSE T.JIAN_CNT END * CASE WHEN T.ZHI_CNT IS NULL THEN 0 ELSE T.ZHI_CNT END + CASE WHEN T.REM_ZHI_CNT IS NULL THEN 0 ELSE T.REM_ZHI_CNT END) AS TOTOAL_ZHI "
//    			+"FROM XYWZ_WARE_INVTY_OUT T  "
//    			+"LEFT OUTER JOIN XYWZ_SYSM_PRODUCT_DETAIL PRD "
//    			+"ON ( T.PRD_NAME = PRD.HS_CODE AND T.SPC_MODEL=CONCAT(PRD.SIZE,'X',truncate(PRD.WAIST_DEPTH,2),'MM','X',truncate(PRD.WEIGHT,2),'KG','/M') ) "
//    			+"GROUP BY T.PRD_NAME,T.SPC_MODEL,PRD.MATERIALS,T.NGTV_POOR,PRD.WEIGHT,T.LEN,T.ZHI_CNT "
//    			+"UNION ALL "
//    			+"SELECT  "
//    			+"T1.PRD_NAME,T1.SPC_MODEL,PRD.MATERIALS,T1.NGTV_POOR,PRD.WEIGHT AS LL_WEIGHT,T1.LEN,T1.ZHI_CNT, "
//    			+"SUM(CASE WHEN T1.JIAN_CNT IS NULL THEN 0 ELSE T1.JIAN_CNT END) AS JIAN_CNT, "
//    			+"SUM(CASE WHEN T1.REM_ZHI_CNT IS NULL THEN 0 ELSE T1.REM_ZHI_CNT END) AS REM_ZHI_CNT, "
//    			+"SUM(CASE WHEN T1.WEIGHT IS NULL THEN 0 ELSE T1.WEIGHT END ) AS WEIGHT, "
//    			+"SUM(CASE WHEN T1.JIAN_CNT IS NULL THEN 0 ELSE T1.JIAN_CNT END * CASE WHEN T1.ZHI_CNT IS NULL THEN 0 ELSE T1.ZHI_CNT END + CASE WHEN T1.REM_ZHI_CNT IS NULL THEN 0 ELSE T1.REM_ZHI_CNT END) AS TOTOAL_ZHI "
//    			+"FROM XYWZ_WARE_INVTY_INFO T1 "
//    			+"LEFT OUTER JOIN XYWZ_SYSM_PRODUCT_DETAIL PRD "
//    			+"ON ( T1.PRD_NAME = PRD.HS_CODE AND T1.SPC_MODEL=CONCAT(PRD.SIZE,'X',truncate(PRD.WAIST_DEPTH,2),'MM','X',truncate(PRD.WEIGHT,2),'KG','/M') ) "
//    			+"WHERE T1.JIAN_CNT>0 OR T1.REM_ZHI_CNT>0 "
//    			+"GROUP BY T1.PRD_NAME,T1.SPC_MODEL,PRD.MATERIALS,T1.NGTV_POOR,PRD.WEIGHT,T1.LEN,T1.ZHI_CNT "
//    			+") TT "
//    			+"LEFT OUTER JOIN ( "
//    			+"SELECT  "
//    			+"T0.HS_CODE,T0.MATERIALS,T0.SPC_MODEL,T0.NGTV_POOR,T0.LEN,T0.ZHI_CNT,PRD.WEIGHT AS LL_WEIGHT,CASE WHEN SE.CONFIRM_SEND IS NULL THEN '0' ELSE SE.CONFIRM_SEND  END AS CONFIRM_SEND , "
//    			+"SUM(CASE WHEN T0.QTY IS NULL THEN 0 ELSE T0.QTY END) AS JIAN_CNT, "
//    			+"SUM(CASE WHEN T0.REM_ZHI_CNT IS NULL THEN 0 ELSE T0.REM_ZHI_CNT END ) AS REM_ZHI_CNT, "
//    			+"SUM(CASE WHEN T0.WEIGHT IS NULL THEN 0 ELSE T0.WEIGHT END ) AS WEIGHT, "
//    			+"SUM(CASE WHEN T0.QTY IS NULL THEN 0 ELSE T0.QTY END * T0.ZHI_CNT + CASE WHEN T0.REM_ZHI_CNT IS NULL THEN 0 ELSE T0.REM_ZHI_CNT END )AS TOTAL_ZHI "
//    			+"FROM XYWZ_LOGI_DELV_MERCHD T0 "
//    			+"INNER JOIN XYWZ_LOGI_SEND_NOTICE SE "
//    			+"ON ( T0.SEND_SHEET_ADVS_NUM = SE.SEND_SHEET_ADVS_NUM  )  "
//    			+"LEFT OUTER JOIN XYWZ_SYSM_PRODUCT_DETAIL PRD "
//    			+"ON ( T0.HS_CODE = PRD.HS_CODE AND T0.SPC_MODEL=CONCAT(PRD.SIZE,'X',truncate(PRD.WAIST_DEPTH,2),'MM','X',truncate(PRD.WEIGHT,2),'KG','/M') ) "
//    			+"GROUP BY T0.HS_CODE,T0.MATERIALS,T0.SPC_MODEL,T0.NGTV_POOR,T0.LEN,T0.ZHI_CNT,PRD.WEIGHT,SE.CONFIRM_SEND "
//    			+")MER "
//    			+"ON ( TT.PRD_NAME = MER.HS_CODE AND TT.SPC_MODEL = MER.SPC_MODEL AND TT.LEN = MER.LEN AND TT.MATERIALS= MER.MATERIALS AND TT.NGTV_POOR = MER.NGTV_POOR) " 
//    			+"where 1=1 "
//    			+"AND CASE WHEN MER.CONFIRM_SEND = '0' THEN TT.WEIGHT+MER.WEIGHT ELSE TT.WEIGHT END > 0"
    			
    			"SELECT * FROM XYWZ_WARE_INVTY_TOTAL TT WHERE 1=1 "
    			
    	);
    	
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SPC_MODEL")){
                    sb.append(" and TT.SPC_MODEL = '"+this.getJson().get(key)+"'");
                }else if(key.equals("weightBegin")){
                	sb.append(" and TT.WEIGHT> "+this.getJson().get(key));
                }else if(key.equals("weightEnd")){
                    	sb.append(" and TT.WEIGHT < "+this.getJson().get(key));
                } 
            }
        }
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
		sql = "{call PROC_XYWZ_WARE_INVTY_TOTAL(?)}";//存储过程()
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
