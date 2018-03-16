package com.xywztech.bob.action;

import java.util.Map;

import javax.sql.DataSource;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.xywztech.bob.core.QueryHelper;

@ParentPackage("json-default")
@Action(value="/querycustomerbasenumber", results={
    @Result(name="success", type="json")
})
public class QueryCustomerBaseNumberAction extends BaseAction{
    
	@Autowired
	@Qualifier("dsOracle")
	private DataSource ds;
	public String index() throws Exception {
        	 StringBuffer s = new StringBuffer("select t1.id,t1.id+1 as customerBaseNumber from OCRM_F_CI_BASE t1  where rownum = 1 order by t1.id desc");
        	   QueryHelper qh = new QueryHelper(s.toString(), ds.getConnection());
        	   //qh.setPrimaryKey("t1.id");
        	   Map<String, Object> j=qh.getJSON();
        	   //StringBuffer x=new StringBuffer(j.get("data").toString());
        	   String x1=j.get("data").toString();
        	   String a[]=x1.split("=");
        	   
        	   if(a.length>1){
        	      String b[]=a[1].split(",");
        	      if(b[0].length()==5){
        		     String str=new String("C01"+b[0]);
        		     return str;
        	   //j.put("data",str);
        	      }
        	      else if(b[0].length()==6){
        		      String str=new String("C01"+b[0]);
        		      return str;
        		   //j.put("data",str);
        	      }
        	      else {
        		      String str=new String("C01"+b[0]);
        		      return str;
        	   //j.put("data",str);
        		      }
        	      }
        	   else{
        		   String str=new String("C0110000");
        		   return str;
        		   //j.put("data",str);
        	   }
        	   
        	/*   String str2 = new String();
			str2=str;*/
        	   //
		//setJson(j);
        	   //index2(str);
     
    }
/*	public String index2( String str) throws Exception {
		return
	}
	*/
	  @Override
	public Map<String, Object> getJson() {
	        return super.getJson();
	    }
}
