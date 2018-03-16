package com.xywztech.bcrm.action;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;

import com.opensymphony.xwork2.ActionContext;
import com.xywztech.bcrm.service.NoteManageService;
import com.xywztech.bob.action.BaseQueryAction;
import com.xywztech.bob.vo.AuthUser;


@ParentPackage("json-default")
@Action(value="/NoteManagerQuery", results={@Result(name="success", type="json"),})
public class NoteManagerQueryAction extends BaseQueryAction{
	@Autowired
	@Qualifier("dsOracle")	
	private DataSource dsOracle;  
	@Autowired
	NoteManageService  manageService ;
 	@Override
	public void prepare() {
 		ActionContext ctx = ActionContext.getContext();
 		HttpServletRequest request = (HttpServletRequest)ctx.get(StrutsStatics.HTTP_REQUEST);
        String sendType = request.getParameter("sendType");
        
        StringBuilder sb = new StringBuilder("select t.* from OCRM_F_WK_MESSAGE_SEND t where 1>0 and STATE = 0 " //for db2 9.7
//       StringBuilder sb = new StringBuilder("select t.* from OCRM_F_WK_MESSAGE_SEND t where 1>0 and STATE = '0' " //for db2 9.5
        		+ " and SEND_TYPE = " + sendType);
        for(String key:this.getJson().keySet()){
            if(null!=this.getJson().get(key)&&!this.getJson().get(key).equals("")){
                if(key.equals("SEND_USER_NAME"))
                    sb.append(" and t."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("RECEIVE_USER_NAME"))
                    sb.append(" and t."+key+" like '%"+this.getJson().get(key)+"%'");
                else if(key.equals("IS_READ_FLAG"))
                    sb.append(" and t."+key+" like '%"+this.getJson().get(key)+"%'");
                
                else if(key.equals("sendTimeS"))
                    sb.append(" and t.SEND_TIME >= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");//for db2 9.7
//                	sb.append(" and t.SEND_TIME >=  '" +this.getJson().get(key)+ "'");//for db2 9.5
                else if(key.equals("sendTimeE"))
                    sb.append(" and t.SEND_TIME <= to_date('" +this.getJson().get(key)+ "','yyyy-MM-dd')");//for db2 9.7
//                	sb.append(" and t.SEND_TIME <=  '" +this.getJson().get(key)+ "'");//for db2 9.5
                
                else if(key.equals("BOX")){
             		AuthUser auth=(AuthUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                    String currenUserId = auth.getUserId();
                	   if("0".equals(this.getJson().get(key))){//收件箱
                		   sb.append(" and t.RECEIVE_USER_ID like '%"+currenUserId+"%'");
                		   sb.append(" and t.TIMER <= sysdate" );
                	   }else if("1".equals(this.getJson().get(key))){//发件箱
                		   sb.append(" and t.SEND_USER_ID like '%"+currenUserId+"%'");
                	   }
                }else{
                	sb.append(" and t."+key+" = "+this.getJson().get(key));
                }
            }
        }
        this.setPrimaryKey("t.MESSAGE_ID");
        SQL = sb.toString();
		datasource = dsOracle;
	}
}
