package com.xywztech.bcrm.customer.action;

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
import com.xywztech.bcrm.customer.service.ClientDepAndLonService;
import com.xywztech.bob.action.BaseQueryAction;

@ParentPackage("json-default")
@Action(value = "/blocMemberShowList", results = { @Result(name = "success", type = "json") })
public class BlocMemberShowListQueryAction extends BaseQueryAction {

    private HttpServletRequest request;

//    @Autowired
//    @Qualifier("dsOracle")
//    private DataSource ds;
//    
//    public String index() throws SQLException {
//        ActionContext ctx = ActionContext.getContext();
//        request = (HttpServletRequest) ctx.get(ServletActionContext.HTTP_REQUEST);
//        
//        // 集团客户编号
//        String groupNo = request.getParameter("groupNo");
//        
//        StringBuilder sqlBuilder = new StringBuilder("select a.id, "+
//													 "a.cust_id, "+
//													 "		 a.cust_zh_name,   "+ 
//													 "	     a.cust_zzdm,  "+
//													 "	     a.parent_id,  "+ 
//													 "		 c.cust_zh_name as parent_cust_zh_name,  "+
//													 "	     a.is_normal_cust,  "+
//													 "	     a.hy_class,  "+
//													 "		 a.cust_scope,  "+
//													 "		 a.crm_scope,  "+
//													 "		 a.tax_card,  "+
//													 "		 a.wk_lincese_no  "+
//													 "from ( "+
//													 "		select  t1.id, "+
//													 "t1.cust_id, "+
//													 "				t2.CUST_ZH_NAME,  "+
//													 "			    t2.CUST_ZZDM,  "+
//													 "			    t1.parent_id,  "+
//													 "			    t2.HY_CLASS,  "+
//													 "				t2.CUST_SCOPE,  "+
//													 "				t2.CRM_SCOPE,  "+
//													 "				t2.tax_card,   "+
//													 "				t2.wk_lincese_no,   "+
//													 "				case "+ 
//													 "					 when t1.member_type = '0' "+
//													 "					 then '是' "+
//													 "					 else '否' "+
//													 "				end  is_normal_cust  "+      
//													 "		from OCRM_F_CI_GROUP_MEMBER t1, V_ACRM_F_CI_CUST_INFO t2 "+
//													 "		where t1.cust_id = t2.cust_id "+
//													 "		  and t1.group_no = '"+ groupNo + "' "+
//													 "		  and t1.member_type is not null "+
//													 "		  and t1.parent_id <> '0' "+
//													 "	    ) a "+
//													 "join OCRM_F_CI_GROUP_MEMBER b "+
//													 "on a.parent_id = b.id "+
//													 "left join V_ACRM_F_CI_CUST_INFO c "+
//													 "		  on b.cust_id = c.cust_id "+
//													 "where 1 > 0 ");
//		for (String key : this.getJson().keySet()) {
//			if (null != this.getJson().get(key) && !this.getJson().get(key).equals("")) {
//				if (key.equals("CUST_ZH_NAME")) {
//					sqlBuilder.append("and a."+ key + "like '%"+ this.getJson().get(key) + "%' ");
//				} else if(key.equals("CUST_ZZDM")) {
//					sqlBuilder.append("and a."+ key + "= '"+ this.getJson().get(key) + "' ");
//				} else if(key.equals("IS_NORMAL_CUST")) {
//					sqlBuilder.append("and a."+ key + "= '"+ this.getJson().get(key) + "' ");
//				}
//			}
//		}
//
//        int currentPage = this.getStart() / this.getLimit() + 1;
//        PagingInfo pi = new PagingInfo(this.getLimit(), currentPage);
//        QueryHelper qh = new QueryHelper(sqlBuilder.toString(), ds.getConnection(), pi);
//        
//        qh.setPrimaryKey("a.id");
//        qh.addGreenplumLookup("HY_CLASS", "HYFL");
//        qh.addGreenplumLookup("CUST_SCOPE", "QYGM");
//        qh.addGreenplumLookup("CRM_SCOPE", "KHQYGM");
//        
//        setJson(qh.getJSON());
//        
//        return "success";
//    }
    
    @Autowired
    @Qualifier("dsOracle")
    private DataSource ds;

	@Override
	public void prepare() {
		ActionContext ctx = ActionContext.getContext();
        request = (HttpServletRequest) ctx.get(StrutsStatics.HTTP_REQUEST);
        
        // 集团客户编号
        String groupNo = request.getParameter("groupNo");
        
        StringBuilder sqlBuilder = new StringBuilder("select a.id,"+
        		 "a.cust_id,"+
        		 "a.cust_zh_name,"+ 
        		"a.cust_zzdm,"+
        		"a.parent_id,"+ 
        		"c.cust_zh_name as parent_cust_zh_name,"+
        		"a.is_normal_cust,"+
        		"a.hy_class,"+
        		"a.cust_scope,"+
        		"a.crm_scope,"+
        		"a.tax_card,"+
        		"a.wk_lincese_no  "+
        		"from ( "+
        		"select  t1.id,"+
        		"t1.cust_id,"+
        		"t2.CUST_ZH_NAME,"+
        		"t2.CUST_ZZDM,"+
        		"t1.parent_id,"+
        		"t2.HY_CLASS,"+
        		"t2.CUST_SCOPE,"+
        		"t2.CRM_SCOPE,"+
        		"t2.tax_card,"+
        		"t2.wk_lincese_no,"+
        		"case "+ 
        		"when t1.member_type = '1' "+
        		"then '是' "+
        		"else '否' "+
        		"end  is_normal_cust  "+      
        		"from OCRM_F_CI_GROUP_MEMBER t1,V_ACRM_F_CI_CUST_INFO t2 "+
        		"where t1.cust_id = t2.cust_id "+
        		"and t1.group_no = '"+ groupNo + "' "+
        		"and t1.member_type is not null "+
        		"and t1.parent_id <> '0' "+
        		") a "+
        		"join OCRM_F_CI_GROUP_MEMBER b "+
        		"on a.parent_id = b.id "+
        		"left join V_ACRM_F_CI_CUST_INFO c "+
        		"on b.cust_id = c.cust_id "+
        		"where 1 > 0 ");
		for (String key : this.getJson().keySet()) {
			if (null != this.getJson().get(key) && !this.getJson().get(key).equals("")) {
				if (key.equals("CUST_ZH_NAME")) {
					sqlBuilder.append("and a."+ key + "like '%"+ this.getJson().get(key) + "%' ");
				} else if(key.equals("CUST_ZZDM")) {
					sqlBuilder.append("and a."+ key + "= '"+ this.getJson().get(key) + "' ");
				} else if(key.equals("IS_NORMAL_CUST")) {
					sqlBuilder.append("and a."+ key + "= '"+ this.getJson().get(key) + "' ");
				}
			}
		}
		
        SQL=sqlBuilder.toString();
        datasource = ds;
        setPrimaryKey("a.id");
	}
    
    public static StringBuilder getSql(String groupNo) {
    	StringBuilder sqlBuilder = new StringBuilder(  "select a.id,a.cust_id,a.parent_id,a.relation_id as relation_name,a.member_type,'1' as is_potential,b.cust_zh_name"
    			+" from ocrm_f_ci_group_member a left join ocrm_f_ci_cust_desc b on a.cust_id=b.cust_id where group_no='"
    			+groupNo+"'");
    	return sqlBuilder;
    }
    
    @SuppressWarnings("unchecked")
	public static List getList(String groupNo) {
    	StringBuilder sqlBuilder = getSql(groupNo);
    	ClientDepAndLonService clientDepAndLonService = new ClientDepAndLonService();
    	Map map = clientDepAndLonService.clientDepAndLonList(sqlBuilder.toString());
    	List list = (List)map.get("data");
    	return list;
    }
}

























